import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Compass, Target, HeartHandshake } from 'lucide-react';
import { ApplicationFormData, FormValidationErrors } from '../../types/application';
import { FIELD_LIMITS } from '../../lib/validation';

interface Step3MotivationProps {
  data: ApplicationFormData;
  onChange: (fields: Partial<ApplicationFormData>) => void;
  errors: FormValidationErrors;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Motivation: React.FC<Step3MotivationProps> = ({
  data,
  onChange,
  errors,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-6 step-fade-enter">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1">
          Motivation & Mindset
        </h3>
        <p className="text-xs text-yousec-muted">
          We want to understand your mindset, curiosity, and approach to problem solving. Write honestly in your own words.
        </p>
      </div>

      <div className="space-y-5">
        {/* Q1: Why YouSec? */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-yousec-text flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-yousec-accent" />
              1. Why do you want to join YouSec? <span className="text-yousec-accent">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                data.motivation.length < FIELD_LIMITS.motivationMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.motivation.length} / {FIELD_LIMITS.motivationMax} (min {FIELD_LIMITS.motivationMin})
            </span>
          </div>
          <textarea
            rows={3}
            value={data.motivation}
            onChange={(e) => onChange({ motivation: e.target.value })}
            placeholder="Tell us what draws you to cybersecurity and our community at YouCode Safi..."
            maxLength={FIELD_LIMITS.motivationMax}
            className={`w-full p-3 bg-yousec-bg border rounded-xl text-xs text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
              errors.motivation
                ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                : 'border-yousec-border focus:border-yousec-accent/80'
            }`}
          />
          {errors.motivation && (
            <p className="mt-1 text-xs text-yousec-accent font-mono">{errors.motivation}</p>
          )}
        </div>

        {/* Q2: Handling blockers */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-yousec-text flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-yousec-accent" />
              2. What do you usually do when you cannot solve a technical challenge? <span className="text-yousec-accent">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                data.problemSolvingApproach.length < FIELD_LIMITS.problemSolvingMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.problemSolvingApproach.length} / {FIELD_LIMITS.problemSolvingMax} (min {FIELD_LIMITS.problemSolvingMin})
            </span>
          </div>
          <textarea
            rows={3}
            value={data.problemSolvingApproach}
            onChange={(e) => onChange({ problemSolvingApproach: e.target.value })}
            placeholder="e.g. Reading official docs, inspecting source code, debugging step-by-step, taking notes, asking peers..."
            maxLength={FIELD_LIMITS.problemSolvingMax}
            className={`w-full p-3 bg-yousec-bg border rounded-xl text-xs text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
              errors.problemSolvingApproach
                ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                : 'border-yousec-border focus:border-yousec-accent/80'
            }`}
          />
          {errors.problemSolvingApproach && (
            <p className="mt-1 text-xs text-yousec-accent font-mono">{errors.problemSolvingApproach}</p>
          )}
        </div>

        {/* Q3: Learning Goals */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-yousec-text flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-yousec-accent" />
              3. What would you like to learn or achieve through YouSec? <span className="text-yousec-accent">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                data.learningGoals.length < FIELD_LIMITS.learningGoalsMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.learningGoals.length} / {FIELD_LIMITS.learningGoalsMax} (min {FIELD_LIMITS.learningGoalsMin})
            </span>
          </div>
          <textarea
            rows={3}
            value={data.learningGoals}
            onChange={(e) => onChange({ learningGoals: e.target.value })}
            placeholder="e.g. Master network packet analysis, participate in my first CTF team, build a security project..."
            maxLength={FIELD_LIMITS.learningGoalsMax}
            className={`w-full p-3 bg-yousec-bg border rounded-xl text-xs text-white placeholder-yousec-dimmed focus:outline-none transition-colors ${
              errors.learningGoals
                ? 'border-yousec-accent focus:ring-1 focus:ring-yousec-accent'
                : 'border-yousec-border focus:border-yousec-accent/80'
            }`}
          />
          {errors.learningGoals && (
            <p className="mt-1 text-xs text-yousec-accent font-mono">{errors.learningGoals}</p>
          )}
        </div>

        {/* Q4: Community Contribution (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-yousec-text flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-yousec-muted" />
              4. How would you like to contribute to the community? <span className="text-yousec-dimmed font-normal lowercase">(optional)</span>
            </label>
            <span className="text-[11px] font-mono text-yousec-dimmed">
              {data.contribution.length} / {FIELD_LIMITS.contributionMax}
            </span>
          </div>
          <textarea
            rows={2}
            value={data.contribution}
            onChange={(e) => onChange({ contribution: e.target.value })}
            placeholder="e.g. Writing challenge writeups, sharing resources, organizing study labs, helping beginners..."
            maxLength={FIELD_LIMITS.contributionMax}
            className="w-full p-3 bg-yousec-bg border border-yousec-border rounded-xl text-xs text-white placeholder-yousec-dimmed focus:outline-none focus:border-yousec-accent/80 transition-colors"
          />
          {errors.contribution && (
            <p className="mt-1 text-xs text-yousec-accent font-mono">{errors.contribution}</p>
          )}
        </div>
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
          <span>Next: Review & Submit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
