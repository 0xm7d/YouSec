import React from 'react';
import { Check, Lock } from 'lucide-react';
import { FormStep, StepMeta } from '../../types/application';

interface StepNavigationProps {
  currentStep: FormStep;
  onStepClick: (step: FormStep) => void;
  completedSteps: boolean[];
}

const STEPS: StepMeta[] = [
  { index: 0, number: '01', title: 'PERSONAL', subtitle: 'Personal Details' },
  { index: 1, number: '02', title: 'BACKGROUND', subtitle: 'Experience & Fields' },
  { index: 2, number: '03', title: 'MINDSET', subtitle: 'Motivation & Goals' },
  { index: 3, number: '04', title: 'REVIEW', subtitle: 'Verify & Submit' },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  return (
    <nav className="w-full mb-8 sm:mb-10" aria-label="Application Progress">
      <ol className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        {STEPS.map((s) => {
          const isCurrent = currentStep === s.index;
          const isCompleted = completedSteps[s.index];
          const isAccessible = s.index <= currentStep || completedSteps[s.index - 1];

          return (
            <li key={s.index} className="relative">
              <button
                type="button"
                onClick={() => {
                  if (isAccessible) onStepClick(s.index);
                }}
                disabled={!isAccessible}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                  isCurrent
                    ? 'bg-yousec-accent/10 border-yousec-accent shadow-glow-subtle'
                    : isCompleted
                    ? 'bg-yousec-surface border-yousec-border hover:border-yousec-accent/50 cursor-pointer'
                    : 'bg-yousec-surface/50 border-yousec-borderSubtle opacity-60 cursor-not-allowed'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Step indicator circle */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-yousec-accent text-white'
                      : isCompleted
                      ? 'bg-white/10 text-yousec-accent border border-yousec-accent/30'
                      : 'bg-black/40 text-yousec-dimmed border border-yousec-border'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-4 h-4 text-yousec-accent" />
                  ) : !isAccessible ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    s.number
                  )}
                </div>

                {/* Step Labels */}
                <div className="min-w-0">
                  <div
                    className={`font-mono text-[10px] tracking-wider uppercase font-bold truncate ${
                      isCurrent ? 'text-white' : isCompleted ? 'text-yousec-text' : 'text-yousec-dimmed'
                    }`}
                  >
                    {s.title}
                  </div>
                  <div className="text-[11px] text-yousec-muted truncate">
                    {s.subtitle}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-yousec-dimmed px-1">
        <span>Step {currentStep + 1} of 4</span>
        <span className="hidden sm:inline">Complete each step to unlock the next.</span>
      </div>
    </nav>
  );
};
