import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Compass, Target, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { ApplicationFormData, FormValidationErrors } from '../../types/application';
import { FIELD_LIMITS, isMotivationRequired } from '../../lib/validation';

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
  const isRequired = isMotivationRequired(data.experienceLevel);

  return (
    <div className="space-y-6 step-fade-enter">
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1">
          Motivation & Mindset
        </h3>
        <p className="text-xs text-yousec-muted">
          We want to understand your mindset, curiosity, and approach to problem solving.
        </p>

        {/* Dynamic Experience-based notice */}
        <div className="mt-3 p-3 rounded-xl bg-yousec-bg border border-yousec-border flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-yousec-accent shrink-0" />
          <p className="text-yousec-muted text-[11px] leading-relaxed">
            {isRequired ? (
              <span>
                Based on your level (<strong className="text-white">{data.experienceLevel}</strong>), please answer the motivation questions below so we understand your technical trajectory.
              </span>
            ) : (
              <span>
                Since you are a <strong className="text-white">{data.experienceLevel || 'Beginner'}</strong>, these questions are <strong className="text-yousec-accent">optional</strong>. You can share your thoughts or skip directly to review!
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Q1: Why YouSec? */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-yousec-text flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-yousec-accent" />
              <span>1. Why do you want to join YouSec?</span>
              {isRequired ? (
                <span className="text-yousec-accent">*</span>
              ) : (
                <span className="text-yousec-dimmed font-normal lowercase">(optional)</span>
              )}
            </label>
            <span
              className={`text-[11px] font-mono ${
                isRequired && data.motivation.length < FIELD_LIMITS.motivationMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.motivation.length} / {FIELD_LIMITS.motivationMax}
              {isRequired && ` (min ${FIELD_LIMITS.motivationMin})`}
            </span>
          </div>
          <textarea
            rows={3}
            value={data.motivation}
            onChange={(e) => onChange({ motivation: e.target.value })}
            placeholder={
              isRequired
                ? "Tell us what draws you to cybersecurity and our community at YouCode Safi..."
                : "Optional: Tell us briefly what you'd like to discover or build..."
            }
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
              <span>2. What do you usually do when you cannot solve a technical challenge?</span>
              {isRequired ? (
                <span className="text-yousec-accent">*</span>
              ) : (
                <span className="text-yousec-dimmed font-normal lowercase">(optional)</span>
              )}
            </label>
            <span
              className={`text-[11px] font-mono ${
                isRequired && data.problemSolvingApproach.length < FIELD_LIMITS.problemSolvingMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.problemSolvingApproach.length} / {FIELD_LIMITS.problemSolvingMax}
              {isRequired && ` (min ${FIELD_LIMITS.problemSolvingMin})`}
            </span>
          </div>
          <textarea
            rows={3}
            value={data.problemSolvingApproach}
            onChange={(e) => onChange({ problemSolvingApproach: e.target.value })}
            placeholder={
              isRequired
                ? "e.g. Reading official docs, inspecting source code, debugging step-by-step, taking notes, asking peers..."
                : "Optional: How do you usually approach unfamiliar errors or bugs?"
            }
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
              <span>3. What would you like to learn or achieve through YouSec?</span>
              {isRequired ? (
                <span className="text-yousec-accent">*</span>
              ) : (
                <span className="text-yousec-dimmed font-normal lowercase">(optional)</span>
              )}
            </label>
            <span
              className={`text-[11px] font-mono ${
                isRequired && data.learningGoals.length < FIELD_LIMITS.learningGoalsMin
                  ? 'text-yousec-dimmed'
                  : 'text-yousec-muted'
              }`}
            >
              {data.learningGoals.length} / {FIELD_LIMITS.learningGoalsMax}
              {isRequired && ` (min ${FIELD_LIMITS.learningGoalsMin})`}
            </span>
          </div>
          <textarea
            rows={3}
            value={data.learningGoals}
            onChange={(e) => onChange({ learningGoals: e.target.value })}
            placeholder={
              isRequired
                ? "e.g. Master network packet analysis, participate in my first CTF team, build a security project..."
                : "Optional: What skills or topics sound exciting to you?"
            }
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
              <span>4. How would you like to contribute to the community?</span>
              <span className="text-yousec-dimmed font-normal lowercase">(optional)</span>
            </label>
            <span className="text-[11px] font-mono text-yousec-dimmed">
              {data.contribution.length} / {FIELD_LIMITS.contributionMax}
            </span>
          </div>
          <textarea
            rows={2}
            value={data.contribution}
            onChange={(e) => onChange({ contribution: e.target.value })}
            placeholder="e.g. Writing challenge writeups, sharing resources, organizing study labs, helping peers..."
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
