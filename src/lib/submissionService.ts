import { ApplicationRecord } from '../types/application';
import { checkEmailAlreadySubmitted, recordLocalSubmission } from './storage';
import { sendApplicationNotificationEmail } from './emailService';

export interface SubmissionResponse {
  success: boolean;
  referenceId: string;
  error?: string;
  isDuplicate?: boolean;
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
 * Direct email-based application submission (No database required).
 * Dispatches application dossier directly to Club Staff email and saves local record.
 */
export async function submitApplication(
  formData: Omit<ApplicationRecord, 'referenceId' | 'status' | 'submittedAt'>
): Promise<SubmissionResponse> {
  const normalizedEmail = formData.email.trim().toLowerCase();

  // 1. Enforce single-submission constraint per email
  const localCheck = checkEmailAlreadySubmitted(normalizedEmail);
  if (localCheck.submitted) {
    const existingRef = localCheck.existingRecord?.referenceId || 'previous submission';
    return {
      success: false,
      isDuplicate: true,
      referenceId: existingRef,
      error: `An application with this email (${normalizedEmail}) has already been submitted (${existingRef}). Each applicant is permitted only one submission.`,
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
    campus: 'YouCode Safi',
    email: normalizedEmail,
    referenceId,
    status: 'pending',
    submittedAt,
  };

  // 2. Persist locally in browser for duplicate protection & Word doc generation
  recordLocalSubmission(fullRecord);

  // 3. Dispatch directly to email
  try {
    await sendApplicationNotificationEmail(fullRecord);
  } catch (err) {
    console.warn('Email notification warning:', err);
  }

  return {
    success: true,
    referenceId,
  };
}
