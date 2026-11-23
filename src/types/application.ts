export type ExperienceLevel = 'Complete Beginner' | 'Beginner' | 'Intermediate' | 'Advanced';

export type AcademicYear = '1ère Année' | '2ème Année';

export interface ApplicationFormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  campus?: string;
  academicYear: AcademicYear | '';
  discordUsername: string;

  // Step 2: Cybersecurity Background
  experienceLevel: ExperienceLevel | '';
  areasOfInterest: string[];
  hasPreviousExperience: 'yes' | 'no' | '';
  previousExperienceDetails: string;

  // Step 3: Motivation & Mindset
  motivation: string;
  problemSolvingApproach: string;
  learningGoals: string;
  contribution: string;

  // Step 4: Consent & Review
  agreedCodeOfConduct: boolean;
  agreedEthics: boolean;
  agreedPrivacy: boolean;
}

export interface ApplicationRecord extends ApplicationFormData {
  id?: string;
  referenceId: string;
  status: 'pending' | 'under_review' | 'accepted' | 'archived';
  submittedAt: string;
}

export type FormStep = 0 | 1 | 2 | 3;

export interface StepMeta {
  index: FormStep;
  number: string;
  title: string;
  subtitle: string;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  academicYear?: string;
  discordUsername?: string;
  experienceLevel?: string;
  areasOfInterest?: string;
  hasPreviousExperience?: string;
  previousExperienceDetails?: string;
  motivation?: string;
  problemSolvingApproach?: string;
  learningGoals?: string;
  contribution?: string;
  agreedCodeOfConduct?: string;
  agreedEthics?: string;
  agreedPrivacy?: string;
  general?: string;
}

export const TECHNICAL_DOMAINS = [
  { id: 'linux-networking', label: 'Linux & Networking', desc: 'OS internals, bash, network protocols & packet analysis' },
  { id: 'web-security', label: 'Web Security', desc: 'OWASP Top 10, XSS, SQLi, CSRF, SSRF & API security' },
  { id: 'cryptography', label: 'Cryptography', desc: 'Ciphers, RSA, AES, hash algorithms & mathematical foundations' },
  { id: 'digital-forensics', label: 'Digital Forensics', desc: 'Memory dumps, disk analysis, artifacts & incident response' },
  { id: 'reverse-engineering', label: 'Reverse Engineering', desc: 'Disassembly, Ghidra, decompilation & binary behavior' },
  { id: 'binary-exploitation', label: 'Binary Exploitation / Pwn', desc: 'Buffer overflows, stack/heap attacks & shellcoding' },
  { id: 'ctf-competitions', label: 'CTF Competitions', desc: 'Jeopardy & Attack/Defense competitive team problem solving' },
  { id: 'defensive-security', label: 'Defensive Security', desc: 'SOC basics, hardening, log monitoring & threat detection' },
  { id: 'still-exploring', label: 'Still Exploring', desc: 'Curious about everything and looking forward to learning the basics' },
] as const;
