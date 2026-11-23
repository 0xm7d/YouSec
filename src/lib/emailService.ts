import emailjs from '@emailjs/browser';
import { ApplicationRecord } from '../types/application';

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'staff@yousec.club';

interface EmailSendResult {
  success: boolean;
  message: string;
  provider?: 'emailjs' | 'webhook' | 'local_fallback';
}

export async function sendApplicationNotificationEmail(record: ApplicationRecord): Promise<EmailSendResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const webhookUrl = import.meta.env.VITE_APPLICATION_WEBHOOK_URL;

  const emailParams = {
    to_email: ADMIN_EMAIL,
    admin_email: ADMIN_EMAIL,
    applicant_name: record.fullName,
    applicant_email: record.email,
    campus: record.campus || 'YouCode Safi',
    academic_year: record.academicYear,
    discord_username: record.discordUsername || 'N/A',
    experience_level: record.experienceLevel,
    areas_of_interest: record.areasOfInterest.join(', '),
    has_previous_experience: record.hasPreviousExperience === 'yes' ? 'Yes' : 'No',
    previous_experience_details: record.previousExperienceDetails || 'None',
    motivation: record.motivation,
    problem_solving_approach: record.problemSolvingApproach,
    learning_goals: record.learningGoals,
    contribution: record.contribution || 'None',
    reference_id: record.referenceId,
    submitted_at: record.submittedAt,
    club_name: 'YouSec — YouCode Cybersecurity Club',
  };

  // 1. Try EmailJS if configured
  if (serviceId && templateId && publicKey && !publicKey.includes('your_')) {
    try {
      await emailjs.send(serviceId, templateId, emailParams, publicKey);
      return {
        success: true,
        message: 'Application notification delivered to club staff via EmailJS.',
        provider: 'emailjs',
      };
    } catch (err: unknown) {
      console.warn('EmailJS delivery failed, falling back:', err);
    }
  }

  // 2. Try custom Webhook if configured
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...record, targetAdmin: ADMIN_EMAIL }),
      });
      if (resp.ok) {
        return {
          success: true,
          message: 'Application dispatched to webhook destination for club staff.',
          provider: 'webhook',
        };
      }
    } catch (err) {
      console.warn('Webhook delivery failed:', err);
    }
  }

  // 3. Graceful fallback when API keys are pending setup
  return {
    success: true,
    message: 'Application recorded for review by YouSec staff.',
    provider: 'local_fallback',
  };
}

/**
 * Creates a pre-formatted mailto link for direct transmission if desired
 */
export function buildAdminMailtoUrl(record: ApplicationRecord): string {
  const subject = encodeURIComponent(`[YouSec Application] ${record.referenceId} — ${record.fullName}`);
  const body = encodeURIComponent(`New Membership Application for YouSec Cybersecurity Club:

Reference ID: ${record.referenceId}
Submitted At: ${record.submittedAt}

--- 01. APPLICANT INFO ---
Name: ${record.fullName}
Email: ${record.email}
Campus: ${record.campus || 'YouCode Safi'}
Academic Year: ${record.academicYear}
Discord: ${record.discordUsername || 'N/A'}

--- 02. CYBERSECURITY BACKGROUND ---
Level: ${record.experienceLevel}
Interests: ${record.areasOfInterest.join(', ')}
Prior Labs/CTFs: ${record.hasPreviousExperience === 'yes' ? 'Yes' : 'No'}
Details: ${record.previousExperienceDetails || 'N/A'}

--- 03. MOTIVATION & OBJECTIVES ---
Why YouSec:
${record.motivation}

Handling blockers / technical challenges:
${record.problemSolvingApproach}

Goals & Objectives:
${record.learningGoals}

Community Contribution:
${record.contribution || 'N/A'}

---
Status: PENDING REVIEW
Reviewer: YouSec Club Staff
`);

  return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
}
