import React from 'react';
import { User, Mail, GraduationCap, ArrowRight, MessageSquare } from 'lucide-react';
import { ApplicationFormData, FormValidationErrors, AcademicYear } from '../../types/application';

interface Step1PersonalProps {
  data: ApplicationFormData;
  onChange: (fields: Partial<ApplicationFormData>) => void;
  errors: FormValidationErrors;
  onNext: () => void;
}

const ACADEMIC_YEARS: AcademicYear[] = [
  '1ère Année',
  '2ème Année',
];

export const Step1Personal: React.FC<Step1PersonalProps> = ({
  data,
  onChange,
  errors,
  onNext,
}) => {
  return (
    <div className="space-y-6 step-fade-enter">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1">
          Personal Information
        </h3>
        <p className="text-xs text-yousec-muted">
          Provide your details so the club organizers can identify you and contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text mb-2">
            Full Name <span className="text-yousec-accent">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yousec-dimmed">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. Yassine El Amrani"
              className={`w-full pl-10 pr-4 py-2.5 bg-yousec-bg border rounded-xl text-sm text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
                errors.fullName
                  ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                  : 'border-yousec-border focus:border-yousec-accent/80'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-yousec-accent font-mono">{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text mb-2">
            Email Address <span className="text-yousec-accent">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yousec-dimmed">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="e.g. yassine.elamrani@youcode.ma"
              className={`w-full pl-10 pr-4 py-2.5 bg-yousec-bg border rounded-xl text-sm text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
                errors.email
                  ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                  : 'border-yousec-border focus:border-yousec-accent/80'
              }`}
            />
          </div>
          <p className="mt-1 text-[11px] font-mono text-yousec-dimmed">
            Each applicant is restricted to a single submission per email address.
          </p>
          {errors.email && (
            <p className="mt-1.5 text-xs text-yousec-accent font-mono">{errors.email}</p>
          )}
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text mb-2">
            Academic Track <span className="text-yousec-accent">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yousec-dimmed">
              <GraduationCap className="w-4 h-4" />
            </div>
            <select
              value={data.academicYear}
              onChange={(e) => onChange({ academicYear: e.target.value as AcademicYear })}
              className={`w-full pl-10 pr-4 py-2.5 bg-yousec-bg border rounded-xl text-sm text-white focus:outline-none transition-colors ${
                errors.academicYear
                  ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                  : 'border-yousec-border focus:border-yousec-accent/80'
              }`}
            >
              <option value="" disabled>Select your current year</option>
              {ACADEMIC_YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          {errors.academicYear && (
            <p className="mt-1.5 text-xs text-yousec-accent font-mono">{errors.academicYear}</p>
          )}
        </div>

        {/* Discord Username */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text mb-2">
            Discord Username <span className="text-yousec-accent">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yousec-dimmed">
              <MessageSquare className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.discordUsername}
              onChange={(e) => onChange({ discordUsername: e.target.value })}
              placeholder="e.g. yassine#1337 or yassine_sec"
              className={`w-full pl-10 pr-4 py-2.5 bg-yousec-bg border rounded-xl text-sm text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
                errors.discordUsername
                  ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                  : 'border-yousec-border focus:border-yousec-accent/80'
              }`}
            />
          </div>
          {errors.discordUsername && (
            <p className="mt-1.5 text-xs text-yousec-accent font-mono">{errors.discordUsername}</p>
          )}
        </div>
      </div>

      {/* Action button */}
      <div className="pt-4 border-t border-yousec-borderSubtle flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yousec-accent hover:bg-yousec-accentHover text-white text-xs font-semibold tracking-wide transition-all shadow-glow-subtle hover:shadow-glow-crimson"
        >
          <span>Next: Cybersecurity Background</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
