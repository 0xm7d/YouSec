import React from 'react';
import { 
  ArrowLeft, 
  Send, 
  Edit3, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';
import { ApplicationFormData, FormStep, FormValidationErrors } from '../../types/application';
import { HackerBadge } from '../ui/HackerBadge';

interface Step4ReviewProps {
  data: ApplicationFormData;
  onChange: (fields: Partial<ApplicationFormData>) => void;
  errors: FormValidationErrors;
  onJumpToStep: (step: FormStep) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  onOpenCodeOfConduct: () => void;
  onOpenPrivacyNotice: () => void;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  data,
  onChange,
  errors,
  onJumpToStep,
  onSubmit,
  onPrev,
  isSubmitting,
  onOpenCodeOfConduct,
  onOpenPrivacyNotice,
}) => {
  const canSubmit = 
    data.agreedCodeOfConduct && 
    data.agreedEthics && 
    data.agreedPrivacy && 
    !isSubmitting;

  return (
    <div className="space-y-8 step-fade-enter">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1">
          Review & Submit Application
        </h3>
        <p className="text-xs text-yousec-muted">
          Your operative dossier has been compiled. Please review your answers before final transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D Hacker Operative Badge */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24">
          <HackerBadge data={data} referenceId="YSC-0x7F4A" />
        </div>

        {/* Right: Summary Information & Consent */}
        <div className="lg:col-span-7 space-y-4">
          {/* 01. Personal Info */}
          <div className="p-4 rounded-xl bg-yousec-bg border border-yousec-border">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-yousec-borderSubtle">
              <span className="font-mono text-xs uppercase tracking-wider text-yousec-accent font-bold">
                01. Personal Information
              </span>
              <button
                type="button"
                onClick={() => onJumpToStep(0)}
                className="flex items-center gap-1.5 text-xs text-yousec-muted hover:text-white transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Full Name:</span>
                <span className="text-white font-medium">{data.fullName || '—'}</span>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Email:</span>
                <span className="text-white font-medium">{data.email || '—'}</span>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Academic Track:</span>
                <span className="text-white font-medium">{data.academicYear || '—'}</span>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Discord:</span>
                <span className="text-white font-medium">{data.discordUsername || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* 02. Background */}
          <div className="p-4 rounded-xl bg-yousec-bg border border-yousec-border">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-yousec-borderSubtle">
              <span className="font-mono text-xs uppercase tracking-wider text-yousec-accent font-bold">
                02. Cybersecurity Background
              </span>
              <button
                type="button"
                onClick={() => onJumpToStep(1)}
                className="flex items-center gap-1.5 text-xs text-yousec-muted hover:text-white transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Experience Level:</span>
                <span className="text-white font-medium">{data.experienceLevel || '—'}</span>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px] mb-1">Areas of Interest:</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.areasOfInterest.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-yousec-surface border border-yousec-border text-[11px] text-yousec-text font-mono"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Prior Labs / CTF Experience:</span>
                <span className="text-white font-medium">
                  {data.hasPreviousExperience === 'yes' ? 'Yes' : 'No'}
                  {data.previousExperienceDetails && ` — ${data.previousExperienceDetails}`}
                </span>
              </div>
            </div>
          </div>

          {/* 03. Motivation */}
          <div className="p-4 rounded-xl bg-yousec-bg border border-yousec-border">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-yousec-borderSubtle">
              <span className="font-mono text-xs uppercase tracking-wider text-yousec-accent font-bold">
                03. Motivation & Mindset
              </span>
              <button
                type="button"
                onClick={() => onJumpToStep(2)}
                className="flex items-center gap-1.5 text-xs text-yousec-muted hover:text-white transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Why YouSec:</span>
                <p className="text-yousec-text whitespace-pre-wrap">{data.motivation || '—'}</p>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Problem Solving Approach:</span>
                <p className="text-yousec-text whitespace-pre-wrap">{data.problemSolvingApproach || '—'}</p>
              </div>
              <div>
                <span className="text-yousec-dimmed block font-mono text-[11px]">Goals:</span>
                <p className="text-yousec-text whitespace-pre-wrap">{data.learningGoals || '—'}</p>
              </div>
              {data.contribution && (
                <div>
                  <span className="text-yousec-dimmed block font-mono text-[11px]">Contribution:</span>
                  <p className="text-yousec-text whitespace-pre-wrap">{data.contribution}</p>
                </div>
              )}
            </div>
          </div>

          {/* Mandatory Consent Checkboxes */}
          <div className="p-5 rounded-xl bg-yousec-surface border border-yousec-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold pb-2 border-b border-yousec-borderSubtle">
              <ShieldCheck className="w-4 h-4 text-yousec-accent" />
              <span>Ethical Commitments & Consent (Mandatory)</span>
            </div>

            {/* Checkbox 1: Code of Conduct */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.agreedCodeOfConduct}
                onChange={(e) => onChange({ agreedCodeOfConduct: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-yousec-border text-yousec-accent focus:ring-yousec-accent bg-black"
              />
              <div className="text-xs text-yousec-text leading-relaxed">
                I agree to follow the YouSec{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenCodeOfConduct();
                  }}
                  className="text-yousec-accent underline hover:text-yousec-accentHover font-semibold"
                >
                  Code of Conduct
                </button>
                , fostering respect, collaboration, and mutual support across the community.
              </div>
            </label>
            {errors.agreedCodeOfConduct && (
              <p className="text-xs text-yousec-accent font-mono pl-7">{errors.agreedCodeOfConduct}</p>
            )}

            {/* Checkbox 2: Ethics & Legal Security */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.agreedEthics}
                onChange={(e) => onChange({ agreedEthics: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-yousec-border text-yousec-accent focus:ring-yousec-accent bg-black"
              />
              <div className="text-xs text-yousec-text leading-relaxed">
                I understand that cybersecurity activities must be strictly <span className="text-white font-semibold">ethical, legal, and authorized</span>. I pledge never to conduct unauthorized attacks against YouCode or external infrastructure.
              </div>
            </label>
            {errors.agreedEthics && (
              <p className="text-xs text-yousec-accent font-mono pl-7">{errors.agreedEthics}</p>
            )}

            {/* Checkbox 3: Privacy Consent */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={data.agreedPrivacy}
                onChange={(e) => onChange({ agreedPrivacy: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-yousec-border text-yousec-accent focus:ring-yousec-accent bg-black"
              />
              <div className="text-xs text-yousec-text leading-relaxed">
                I agree to the processing of my application information for membership review, as described in the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPrivacyNotice();
                  }}
                  className="text-yousec-accent underline hover:text-yousec-accentHover font-semibold"
                >
                  Privacy Notice
                </button>
                .
              </div>
            </label>
            {errors.agreedPrivacy && (
              <p className="text-xs text-yousec-accent font-mono pl-7">{errors.agreedPrivacy}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-3.5 rounded-xl bg-yousec-accent/15 border border-yousec-accent text-xs text-yousec-accent font-mono">
              {errors.general}
            </div>
          )}
        </div>
      </div>

      {/* Nav & Submit Buttons */}
      <div className="pt-6 border-t border-yousec-borderSubtle flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-yousec-border bg-yousec-surface text-yousec-muted hover:text-white text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 ${
            canSubmit
              ? 'bg-yousec-accent hover:bg-yousec-accentHover text-white shadow-glow-subtle hover:shadow-glow-crimson cursor-pointer'
              : 'bg-yousec-border text-yousec-dimmed cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Application...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Application</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
