import { ApplicationRecord } from '../types/application';

/**
 * Google Sheets submission service.
 * Sends application data to a Google Apps Script Web App
 * which writes it directly into a Google Sheet.
 */

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

interface SheetSendResult {
  success: boolean;
  message: string;
}

export async function sendApplicationNotificationEmail(record: ApplicationRecord): Promise<SheetSendResult> {
  if (!GOOGLE_SHEET_URL || !GOOGLE_SHEET_URL.startsWith('http')) {
    console.warn('Google Sheet URL not configured. Submission saved locally only.');
    return {
      success: true,
      message: 'Application recorded locally. Google Sheet URL not configured.',
    };
  }

  const payload = {
    referenceId: record.referenceId,
    submittedAt: record.submittedAt,
    fullName: record.fullName,
    email: record.email,
    campus: record.campus || 'YouCode Safi',
    academicYear: record.academicYear,
    discordUsername: record.discordUsername || 'N/A',
    experienceLevel: record.experienceLevel,
    areasOfInterest: record.areasOfInterest.join(', '),
    hasPreviousExperience: record.hasPreviousExperience === 'yes' ? 'Yes' : 'No',
    previousExperienceDetails: record.previousExperienceDetails || 'N/A',
    motivation: record.motivation || 'N/A',
    problemSolvingApproach: record.problemSolvingApproach || 'N/A',
    learningGoals: record.learningGoals || 'N/A',
    contribution: record.contribution || 'N/A',
    status: record.status,
  };

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors from browser
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // With no-cors, response is opaque — we assume success if no network error
    // Google Apps Script always responds 200 for valid deployments
    void response;

    return {
      success: true,
      message: 'Application submitted successfully to YouSec staff sheet.',
    };
  } catch (err) {
    console.error('Google Sheet submission failed:', err);
    return {
      success: false,
      message: 'Failed to send data to Google Sheet. Please check your connection and try again.',
    };
  }
}
