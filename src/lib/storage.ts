import { ApplicationFormData, ApplicationRecord } from '../types/application';

const DRAFT_STORAGE_KEY = 'yousec_membership_draft_v1';
const SUBMISSIONS_STORAGE_KEY = 'yousec_submitted_records_v1';

export const INITIAL_FORM_DATA: ApplicationFormData = {
  fullName: '',
  email: '',
  campus: 'YouCode Safi',
  academicYear: '',
  discordUsername: '',
  experienceLevel: '',
  areasOfInterest: [],
  hasPreviousExperience: '',
  previousExperienceDetails: '',
  motivation: '',
  problemSolvingApproach: '',
  learningGoals: '',
  contribution: '',
  agreedCodeOfConduct: false,
  agreedEthics: false,
  agreedPrivacy: false,
};

export function saveDraft(data: ApplicationFormData): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Unable to save draft to localStorage', err);
  }
}

export function loadDraft(): ApplicationFormData | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_FORM_DATA, ...parsed };
  } catch (err) {
    console.warn('Unable to load draft from localStorage', err);
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (err) {
    console.warn('Unable to remove draft from localStorage', err);
  }
}

export function getLocalSubmissions(): ApplicationRecord[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function checkEmailAlreadySubmitted(email: string): { submitted: boolean; existingRecord?: ApplicationRecord } {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return { submitted: false };
  const list = getLocalSubmissions();
  const existing = list.find((rec) => rec.email.trim().toLowerCase() === normalized);
  return {
    submitted: !!existing,
    existingRecord: existing,
  };
}

export function recordLocalSubmission(record: ApplicationRecord): void {
  try {
    const list = getLocalSubmissions();
    const filtered = list.filter((r) => r.email.toLowerCase() !== record.email.toLowerCase());
    filtered.push(record);
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Failed to record submission locally', err);
  }
}

/**
 * Generates and downloads a Word-compatible .doc file of the application dossier
 */
export function downloadApplicationDoc(record: ApplicationRecord): void {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>YouSec Application - ${record.referenceId}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #111; padding: 24px; }
        .header { border-bottom: 3px solid #DC2626; padding-bottom: 12px; margin-bottom: 24px; }
        h1 { color: #DC2626; font-size: 24px; margin: 0 0 6px 0; }
        .subtitle { color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .badge { background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-family: monospace; }
        .section-title { font-size: 15px; font-weight: bold; color: #111; background: #f4f4f5; padding: 6px 10px; margin-top: 20px; border-left: 4px solid #DC2626; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e4e4e7; font-size: 13px; }
        th { width: 220px; color: #52525b; background-color: #fafafa; }
        .text-block { background: #fdfdfd; padding: 10px; border: 1px solid #e4e4e7; border-radius: 4px; white-space: pre-wrap; font-size: 13px; margin-top: 4px; }
        .footer { margin-top: 30px; font-size: 11px; color: #71717a; border-top: 1px solid #e4e4e7; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>YOUSEC — MEMBERSHIP APPLICATION DOSSIER</h1>
        <div class="subtitle">YouCode Safi Cybersecurity Community • Reference: <span class="badge">${record.referenceId}</span></div>
      </div>

      <div class="section-title">01. APPLICANT DETAILS</div>
      <table>
        <tr><th>Full Name:</th><td><strong>${escapeHtml(record.fullName)}</strong></td></tr>
        <tr><th>Email Address:</th><td><a href="mailto:${escapeHtml(record.email)}">${escapeHtml(record.email)}</a></td></tr>
        <tr><th>Campus:</th><td>${escapeHtml(record.campus)}</td></tr>
        <tr><th>Academic Year / Track:</th><td>${escapeHtml(record.academicYear)}</td></tr>
        <tr><th>Discord Username:</th><td>${record.discordUsername ? escapeHtml(record.discordUsername) : '<em>Not specified</em>'}</td></tr>
        <tr><th>Submission Date:</th><td>${record.submittedAt}</td></tr>
        <tr><th>Application Status:</th><td><strong>${record.status.toUpperCase()}</strong></td></tr>
      </table>

      <div class="section-title">02. CYBERSECURITY BACKGROUND</div>
      <table>
        <tr><th>Current Experience Level:</th><td><strong>${escapeHtml(record.experienceLevel)}</strong></td></tr>
        <tr><th>Selected Fields of Interest:</th><td>${record.areasOfInterest.map(escapeHtml).join(', ')}</td></tr>
        <tr><th>Prior Lab / CTF Experience:</th><td>${record.hasPreviousExperience === 'yes' ? 'Yes' : 'No'}</td></tr>
      </table>
      ${
        record.hasPreviousExperience === 'yes' && record.previousExperienceDetails
          ? `<p><strong>Prior Experience Details:</strong></p><div class="text-block">${escapeHtml(record.previousExperienceDetails)}</div>`
          : ''
      }

      <div class="section-title">03. MOTIVATION & PROBLEM SOLVING</div>
      <p><strong>Why do you want to join YouSec?</strong></p>
      <div class="text-block">${escapeHtml(record.motivation)}</div>

      <p><strong>What do you do when stuck on a technical challenge?</strong></p>
      <div class="text-block">${escapeHtml(record.problemSolvingApproach)}</div>

      <p><strong>Learning Objectives & Goals:</strong></p>
      <div class="text-block">${escapeHtml(record.learningGoals)}</div>

      ${
        record.contribution
          ? `<p><strong>Potential Community Contribution:</strong></p><div class="text-block">${escapeHtml(record.contribution)}</div>`
          : ''
      }

      <div class="section-title">04. ETHICAL & CONDUCT COMMITMENTS</div>
      <table>
        <tr><th>Code of Conduct Agreed:</th><td>${record.agreedCodeOfConduct ? '✓ Confirmed' : '✗ Not Confirmed'}</td></tr>
        <tr><th>Strict Ethical Pwning & Legal Security Pledge:</th><td>${record.agreedEthics ? '✓ Confirmed' : '✗ Not Confirmed'}</td></tr>
        <tr><th>Data Processing Consent:</th><td>${record.agreedPrivacy ? '✓ Confirmed' : '✗ Not Confirmed'}</td></tr>
      </table>

      <div class="footer">
        Generated automatically by YouSec Membership Platform • "Learn Freely. Hack Ethically. Respect Everyone." • YouCode Safi
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `YouSec_Application_${record.referenceId}_${record.fullName.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(text?: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
