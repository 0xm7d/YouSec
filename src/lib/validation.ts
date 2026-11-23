import { ApplicationFormData, FormValidationErrors } from '../types/application';

export const FIELD_LIMITS = {
  fullName: 100,
  email: 254,
  discordUsername: 50,
  previousExperienceDetails: 600,
  motivationMin: 20,
  motivationMax: 1000,
  problemSolvingMin: 20,
  problemSolvingMax: 1000,
  learningGoalsMin: 20,
  learningGoalsMax: 1000,
  contributionMax: 1000,
};

export function cleanString(str?: string, maxLen = 1000): string {
  return String(str ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

export function validateStep0(data: ApplicationFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};
  const name = cleanString(data.fullName, FIELD_LIMITS.fullName);
  const email = cleanString(data.email, FIELD_LIMITS.email).toLowerCase();

  if (!name || name.length < 3) {
    errors.fullName = 'Please enter your full name (at least 3 characters).';
  } else if (!/\S+\s+\S+/.test(name)) {
    errors.fullName = 'Please provide both your first and last name.';
  }

  const emailRegex = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address (e.g. name@youcode.ma).';
  }

  if (!data.academicYear) {
    errors.academicYear = 'Please select your current academic year or track.';
  }

  if (data.discordUsername && data.discordUsername.length > FIELD_LIMITS.discordUsername) {
    errors.discordUsername = `Discord username must be under ${FIELD_LIMITS.discordUsername} characters.`;
  }

  return errors;
}

export function validateStep1(data: ApplicationFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};

  if (!data.experienceLevel) {
    errors.experienceLevel = 'Please select your current cybersecurity experience level.';
  }

  if (!data.areasOfInterest || data.areasOfInterest.length === 0) {
    errors.areasOfInterest = 'Please select at least one cybersecurity domain of interest.';
  }

  if (!data.hasPreviousExperience) {
    errors.hasPreviousExperience = 'Please indicate whether you have prior practical experience.';
  }

  if (data.previousExperienceDetails && data.previousExperienceDetails.length > FIELD_LIMITS.previousExperienceDetails) {
    errors.previousExperienceDetails = `Please keep experience details under ${FIELD_LIMITS.previousExperienceDetails} characters.`;
  }

  return errors;
}

export function isMotivationRequired(level?: string): boolean {
  return level === 'Intermediate' || level === 'Advanced';
}

export function validateStep2(data: ApplicationFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};
  const mot = cleanString(data.motivation, FIELD_LIMITS.motivationMax);
  const prob = cleanString(data.problemSolvingApproach, FIELD_LIMITS.problemSolvingMax);
  const goals = cleanString(data.learningGoals, FIELD_LIMITS.learningGoalsMax);
  const required = isMotivationRequired(data.experienceLevel);

  if (required) {
    if (mot.length < FIELD_LIMITS.motivationMin) {
      errors.motivation = `Please tell us why you want to join (minimum ${FIELD_LIMITS.motivationMin} characters for ${data.experienceLevel}).`;
    }

    if (prob.length < FIELD_LIMITS.problemSolvingMin) {
      errors.problemSolvingApproach = `Please describe what you do when encountering a blocker (minimum ${FIELD_LIMITS.problemSolvingMin} characters for ${data.experienceLevel}).`;
    }

    if (goals.length < FIELD_LIMITS.learningGoalsMin) {
      errors.learningGoals = `Please describe what you hope to learn or achieve (minimum ${FIELD_LIMITS.learningGoalsMin} characters for ${data.experienceLevel}).`;
    }
  }

  if (data.contribution && data.contribution.length > FIELD_LIMITS.contributionMax) {
    errors.contribution = `Contribution notes must be under ${FIELD_LIMITS.contributionMax} characters.`;
  }

  return errors;
}

export function validateStep3(data: ApplicationFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};

  if (!data.agreedCodeOfConduct) {
    errors.agreedCodeOfConduct = 'You must agree to adhere to the YouSec Code of Conduct.';
  }

  if (!data.agreedEthics) {
    errors.agreedEthics = 'You must acknowledge that all security activities are strictly ethical, legal, and authorized.';
  }

  if (!data.agreedPrivacy) {
    errors.agreedPrivacy = 'You must consent to the processing of your application data for membership review.';
  }

  return errors;
}

export function validateAll(data: ApplicationFormData): FormValidationErrors {
  return {
    ...validateStep0(data),
    ...validateStep1(data),
    ...validateStep2(data),
    ...validateStep3(data),
  };
}
