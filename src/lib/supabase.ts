import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ApplicationRecord } from '../types/application';
import { checkEmailAlreadySubmitted, recordLocalSubmission } from './storage';
import { sendApplicationNotificationEmail } from './emailService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-supabase') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface SubmissionResponse {
  success: boolean;
  referenceId: string;
  error?: string;
  isDuplicate?: boolean;
  emailDispatched?: boolean;
  emailMessage?: string;
}

export function generateReferenceId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `YSC-2026-${rand}`;
}

/**
 * Checks whether an applicant with this email has already submitted an application
 */
export async function checkEmailSubmissionStatus(email: string): Promise<{
  isSubmitted: boolean;
  existingRecord?: ApplicationRecord;
}> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check local submissions first
  const localCheck = checkEmailAlreadySubmitted(normalizedEmail);
  if (localCheck.submitted) {
    return { isSubmitted: true, existingRecord: localCheck.existingRecord };
  }

  // 2. If Supabase configured, check remote database
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('reference_id, email, full_name, submitted_at, status')
        .ilike('email', normalizedEmail)
        .maybeSingle();

      if (!error && data) {
        return {
          isSubmitted: true,
          existingRecord: {
            referenceId: data.reference_id,
            email: data.email,
            fullName: data.full_name,
            submittedAt: data.submitted_at,
            status: data.status,
          } as ApplicationRecord,
        };
      }
    } catch (err) {
      console.warn('Error querying Supabase for existing email:', err);
    }
  }

  return { isSubmitted: false };
}

/**
 * Submits an application dossier:
 * 1. Verifies unique email constraint
 * 2. Saves to Supabase (if configured) or local storage
 * 3. Triggers email notification to designated club staff
 */
export async function submitApplication(
  formData: Omit<ApplicationRecord, 'referenceId' | 'status' | 'submittedAt'>
): Promise<SubmissionResponse> {
  const normalizedEmail = formData.email.trim().toLowerCase();

  // Check single-submission rule per email
  const existingStatus = await checkEmailSubmissionStatus(normalizedEmail);
  if (existingStatus.isSubmitted) {
    const existingRef = existingStatus.existingRecord?.referenceId || 'previous submission';
    return {
      success: false,
      isDuplicate: true,
      referenceId: existingRef,
      error: `An application with this email (${normalizedEmail}) has already been registered (${existingRef}). Each applicant is permitted only one submission.`,
    };
  }

  const referenceId = generateReferenceId();
  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Casablanca',
  }) + ' (Casablanca)';

  const fullRecord: ApplicationRecord = {
    ...formData,
    email: normalizedEmail,
    referenceId,
    status: 'pending',
    submittedAt,
  };

  // If Supabase is active, persist to PostgreSQL
  if (supabase) {
    try {
      const dbRow = {
        reference_id: referenceId,
        full_name: fullRecord.fullName,
        email: fullRecord.email,
        campus: fullRecord.campus || 'YouCode Safi',
        academic_year: fullRecord.academicYear,
        discord_username: fullRecord.discordUsername || null,
        experience_level: fullRecord.experienceLevel,
        areas_of_interest: fullRecord.areasOfInterest,
        has_previous_experience: fullRecord.hasPreviousExperience,
        previous_experience_details: fullRecord.previousExperienceDetails || null,
        motivation: fullRecord.motivation,
        problem_solving_approach: fullRecord.problemSolvingApproach,
        learning_goals: fullRecord.learningGoals,
        contribution: fullRecord.contribution || null,
        agreed_code_of_conduct: fullRecord.agreedCodeOfConduct,
        agreed_ethics: fullRecord.agreedEthics,
        agreed_privacy: fullRecord.agreedPrivacy,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('applications').insert([dbRow]);
      if (error) {
        // Unique violation code in Postgres is 23505
        if (error.code === '23505') {
          return {
            success: false,
            isDuplicate: true,
            referenceId,
            error: 'An application with this email address has already been submitted.',
          };
        }
        console.error('Supabase insert failed:', error);
        throw new Error(error.message || 'Database insert failed.');
      }
    } catch (err: unknown) {
      console.warn('Falling back to local persistence due to Supabase error:', err);
      recordLocalSubmission(fullRecord);
    }
  } else {
    // Record locally when no remote database connection is provided
    recordLocalSubmission(fullRecord);
  }

  // Also save locally so applicant can review or download later
  recordLocalSubmission(fullRecord);

  // Dispatch email notification to club staff
  const emailRes = await sendApplicationNotificationEmail(fullRecord);

  return {
    success: true,
    referenceId,
    emailDispatched: emailRes.success,
    emailMessage: emailRes.message,
  };
}
