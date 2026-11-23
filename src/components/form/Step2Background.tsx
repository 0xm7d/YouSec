import React from 'react';
import { ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { 
  ApplicationFormData, 
  FormValidationErrors, 
  ExperienceLevel, 
  TECHNICAL_DOMAINS 
} from '../../types/application';
import { FIELD_LIMITS } from '../../lib/validation';

interface Step2BackgroundProps {
  data: ApplicationFormData;
  onChange: (fields: Partial<ApplicationFormData>) => void;
  errors: FormValidationErrors;
  onNext: () => void;
  onPrev: () => void;
}

const EXPERIENCE_LEVELS: { level: ExperienceLevel; subtitle: string }[] = [
  { level: 'Complete Beginner', subtitle: 'Curious to explore cybersecurity from scratch. No prior experience needed.' },
  { level: 'Beginner', subtitle: 'Basic Linux/network knowledge or tried simple OverTheWire/Bandit challenges.' },
  { level: 'Intermediate', subtitle: 'Familiar with TryHackMe, OWASP concepts, scripting, or basic CTFs.' },
  { level: 'Advanced', subtitle: 'Experienced with binary exploitation, reverse engineering, or deeper CTFs.' },
];

export const Step2Background: React.FC<Step2BackgroundProps> = ({
  data,
  onChange,
  errors,
  onNext,
  onPrev,
}) => {
  const toggleInterest = (label: string) => {
    const current = [...data.areasOfInterest];
    const exists = current.includes(label);
    const updated = exists ? current.filter((item) => item !== label) : [...current, label];
    onChange({ areasOfInterest: updated });
  };

  return (
    <div className="space-y-8 step-fade-enter">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1">
          Cybersecurity Background
        </h3>
        <p className="text-xs text-yousec-muted">
          We welcome all experience levels. Your answers help us calibrate workshops and study groups.
        </p>
      </div>

      {/* Q1: Experience Level */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text">
          1. How would you describe your current cybersecurity experience? <span className="text-yousec-accent">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERIENCE_LEVELS.map((item) => {
            const isSelected = data.experienceLevel === item.level;
            return (
              <button
                key={item.level}
                type="button"
                onClick={() => onChange({ experienceLevel: item.level })}
                className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                  isSelected
                    ? 'bg-yousec-accent/10 border-yousec-accent shadow-glow-subtle'
                    : 'bg-yousec-bg border-yousec-border hover:border-yousec-borderHover'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-yousec-accent bg-yousec-accent' : 'border-yousec-dimmed bg-transparent'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-yousec-text'}`}>
                    {item.level}
                  </div>
                  <div className="text-[11px] text-yousec-muted mt-1 leading-snug">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.experienceLevel && (
          <p className="text-xs text-yousec-accent font-mono">{errors.experienceLevel}</p>
        )}
      </div>

      {/* Q2: Areas of Interest */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text">
            2. Which cybersecurity fields interest you? <span className="text-yousec-accent">*</span>
          </label>
          <span className="text-[11px] font-mono text-yousec-dimmed">
            {data.areasOfInterest.length} selected
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {TECHNICAL_DOMAINS.map((domain) => {
            const isSelected = data.areasOfInterest.includes(domain.label);
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => toggleInterest(domain.label)}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all duration-150 ${
                  isSelected
                    ? 'bg-yousec-card border-yousec-accent/70 shadow-sm'
                    : 'bg-yousec-bg border-yousec-border hover:border-yousec-borderHover'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-yousec-accent">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 fill-yousec-accent/20" />
                  ) : (
                    <Square className="w-4 h-4 text-yousec-dimmed" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-yousec-text'}`}>
                    {domain.label}
                  </div>
                  <div className="text-[10px] text-yousec-dimmed leading-tight mt-0.5">
                    {domain.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.areasOfInterest && (
          <p className="text-xs text-yousec-accent font-mono">{errors.areasOfInterest}</p>
        )}
      </div>

      {/* Q3: Previous Experience */}
      <div className="space-y-4 pt-2 border-t border-yousec-borderSubtle">
        <label className="block text-xs font-mono uppercase tracking-wider text-yousec-text">
          3. Have you previously participated in cybersecurity labs, platforms, or competitions? <span className="text-yousec-accent">*</span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onChange({ hasPreviousExperience: 'yes' })}
            className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold font-mono transition-all ${
              data.hasPreviousExperience === 'yes'
                ? 'bg-yousec-accent/15 border-yousec-accent text-white shadow-glow-subtle'
                : 'bg-yousec-bg border-yousec-border text-yousec-muted hover:border-yousec-borderHover'
            }`}
          >
            Yes, I have
          </button>
          <button
            type="button"
            onClick={() => onChange({ hasPreviousExperience: 'no', previousExperienceDetails: '' })}
            className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold font-mono transition-all ${
              data.hasPreviousExperience === 'no'
                ? 'bg-yousec-accent/15 border-yousec-accent text-white shadow-glow-subtle'
                : 'bg-yousec-bg border-yousec-border text-yousec-muted hover:border-yousec-borderHover'
            }`}
          >
            No, not yet
          </button>
        </div>
        {errors.hasPreviousExperience && (
          <p className="text-xs text-yousec-accent font-mono">{errors.hasPreviousExperience}</p>
        )}

        {/* Conditional details textarea */}
        {data.hasPreviousExperience === 'yes' && (
          <div className="mt-4 p-4 rounded-xl bg-yousec-bg border border-yousec-border animate-fade-in space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono text-yousec-text">
                Briefly mention platforms or labs (e.g., TryHackMe, PicoCTF, Root-Me, Bandit):
              </label>
              <span className="text-[11px] font-mono text-yousec-dimmed">
                {data.previousExperienceDetails.length}/{FIELD_LIMITS.previousExperienceDetails}
              </span>
            </div>
            <textarea
              rows={3}
              value={data.previousExperienceDetails}
              onChange={(e) => onChange({ previousExperienceDetails: e.target.value })}
              placeholder="e.g. Completed OverTheWire Bandit up to level 20, completed Junior Penetration Tester path on TryHackMe..."
              maxLength={FIELD_LIMITS.previousExperienceDetails}
              className="w-full p-3 bg-yousec-surface border border-yousec-border rounded-lg text-xs text-white placeholder-yousec-dimmed focus:outline-none focus:border-yousec-accent/80 transition-colors"
            />
            {errors.previousExperienceDetails && (
              <p className="text-xs text-yousec-accent font-mono">{errors.previousExperienceDetails}</p>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="pt-6 border-t border-yousec-borderSubtle flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-yousec-border bg-yousec-surface text-yousec-muted hover:text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yousec-accent hover:bg-yousec-accentHover text-white text-xs font-semibold tracking-wide transition-all shadow-glow-subtle hover:shadow-glow-crimson"
        >
          <span>Next: Motivation & Mindset</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
