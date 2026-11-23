import React, { useState, useEffect } from 'react';
import { StepNavigation } from './StepNavigation';
import { Step1Personal } from './Step1Personal';
import { Step2Background } from './Step2Background';
import { Step3Motivation } from './Step3Motivation';
import { Step4Review } from './Step4Review';
import { SuccessScreen } from './SuccessScreen';
import { CodeOfConductModal } from '../modals/CodeOfConductModal';
import { PrivacyNoticeModal } from '../modals/PrivacyNoticeModal';
import { 
  ApplicationFormData, 
  ApplicationRecord, 
  FormStep, 
  FormValidationErrors 
} from '../../types/application';
import { 
  INITIAL_FORM_DATA, 
  saveDraft, 
  loadDraft, 
  clearDraft, 
  checkEmailAlreadySubmitted 
} from '../../lib/storage';
import { 
  validateStep0, 
  validateStep1, 
  validateStep2, 
  validateAll 
} from '../../lib/validation';
import { submitApplication } from '../../lib/submissionService';
import { AlertCircle, Check, Sparkles } from 'lucide-react';

export const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(0);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Modals state
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Completed steps tracker
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setFormData(draft);
      // Determine what was previously completed
      const s0Valid = Object.keys(validateStep0(draft)).length === 0;
      const s1Valid = Object.keys(validateStep1(draft)).length === 0;
      const s2Valid = Object.keys(validateStep2(draft)).length === 0;
      setCompletedSteps([s0Valid, s1Valid, s2Valid, false]);
    }
  }, []);

  // Update form data and auto-save draft
  const handleDataChange = (fields: Partial<ApplicationFormData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);
    saveDraft(updated);

    // Show temporary auto-saved indicator
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2000);

    // Clear specific field errors when user types
    if (Object.keys(errors).length > 0) {
      const fieldKeys = Object.keys(fields);
      const newErrors = { ...errors };
      for (const k of fieldKeys) {
        delete (newErrors as Record<string, string | undefined>)[k];
      }
      setErrors(newErrors);
    }
  };

  // Step 0 -> Step 1
  const handleNextFromStep0 = () => {
    const stepErrors = validateStep0(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    // Check if this email was already used to submit
    const check = checkEmailAlreadySubmitted(formData.email);
    if (check.submitted) {
      setErrors({
        email: `An application with this email (${formData.email}) has already been registered (${check.existingRecord?.referenceId}). Only 1 submission allowed per email.`,
      });
      return;
    }

    setErrors({});
    const newCompleted = [...completedSteps];
    newCompleted[0] = true;
    setCompletedSteps(newCompleted);
    setCurrentStep(1);
    window.scrollTo({ top: document.getElementById('apply')?.offsetTop || 0, behavior: 'smooth' });
  };

  // Step 1 -> Step 2
  const handleNextFromStep1 = () => {
    const stepErrors = validateStep1(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    const newCompleted = [...completedSteps];
    newCompleted[1] = true;
    setCompletedSteps(newCompleted);
    setCurrentStep(2);
    window.scrollTo({ top: document.getElementById('apply')?.offsetTop || 0, behavior: 'smooth' });
  };

  // Step 2 -> Step 3
  const handleNextFromStep2 = () => {
    const stepErrors = validateStep2(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    const newCompleted = [...completedSteps];
    newCompleted[2] = true;
    setCompletedSteps(newCompleted);
    setCurrentStep(3);
    window.scrollTo({ top: document.getElementById('apply')?.offsetTop || 0, behavior: 'smooth' });
  };

  // Final Submission
  const handleSubmit = async () => {
    const allErrors = validateAll(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Jump to first step with error if needed
      if (allErrors.fullName || allErrors.email || allErrors.academicYear) {
        setCurrentStep(0);
      } else if (allErrors.experienceLevel || allErrors.areasOfInterest || allErrors.hasPreviousExperience) {
        setCurrentStep(1);
      } else if (allErrors.motivation || allErrors.problemSolvingApproach || allErrors.learningGoals) {
        setCurrentStep(2);
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await submitApplication(formData);

      if (!response.success) {
        setSubmissionError(response.error || 'Failed to submit application. Please retry.');
        setIsSubmitting(false);
        return;
      }

      // Success! Clear draft and show confirmation
      clearDraft();
      setSubmittedRecord({
        ...formData,
        referenceId: response.referenceId,
        status: 'pending',
        submittedAt: new Date().toLocaleString('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Africa/Casablanca',
        }) + ' (Casablanca)',
      });
      setIsSubmitting(false);
    } catch (err: unknown) {
      console.error('Submission exception:', err);
      setSubmissionError('Network error while transmitting application. Your inputs are safe. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    clearDraft();
    setFormData(INITIAL_FORM_DATA);
    setSubmittedRecord(null);
    setErrors({});
    setCurrentStep(0);
    setCompletedSteps([false, false, false, false]);
  };

  return (
    <section id="apply" className="py-20 md:py-28 relative z-10 border-t border-yousec-borderSubtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!submittedRecord && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yousec-surface border border-yousec-border text-xs font-mono text-yousec-accent uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Membership Application</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3">
              Join the YouSec Community
            </h2>
            <p className="text-xs sm:text-sm text-yousec-muted leading-relaxed">
              Complete the 4 steps below. We welcome all YouCode students regardless of initial cybersecurity knowledge.
            </p>

            {/* Draft status indicator */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] font-mono text-yousec-dimmed">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-yousec-accent" />
                {draftSavedToast ? 'Draft saved locally' : 'Autosaved in your browser'}
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-white underline transition-colors"
              >
                Reset form
              </button>
            </div>
          </div>
        )}

        {/* Form Container Card */}
        <div className="bg-yousec-card/90 border border-yousec-border rounded-2xl p-6 sm:p-10 shadow-card relative">
          {submittedRecord ? (
            <SuccessScreen record={submittedRecord} onReset={handleReset} />
          ) : (
            <>
              {/* Step Navigation Bar */}
              <StepNavigation
                currentStep={currentStep}
                onStepClick={(step) => {
                  setErrors({});
                  setCurrentStep(step);
                }}
                completedSteps={completedSteps}
              />

              {/* Error banner if submission failed */}
              {submissionError && (
                <div className="mb-6 p-4 rounded-xl bg-yousec-accent/15 border border-yousec-accent flex items-start gap-3 text-xs text-white">
                  <AlertCircle className="w-5 h-5 text-yousec-accent shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-yousec-accent">Submission Notice</p>
                    <p className="text-yousec-muted mt-0.5">{submissionError}</p>
                  </div>
                </div>
              )}

              {/* Step Forms */}
              {currentStep === 0 && (
                <Step1Personal
                  data={formData}
                  onChange={handleDataChange}
                  errors={errors}
                  onNext={handleNextFromStep0}
                />
              )}

              {currentStep === 1 && (
                <Step2Background
                  data={formData}
                  onChange={handleDataChange}
                  errors={errors}
                  onNext={handleNextFromStep1}
                  onPrev={() => setCurrentStep(0)}
                />
              )}

              {currentStep === 2 && (
                <Step3Motivation
                  data={formData}
                  onChange={handleDataChange}
                  errors={errors}
                  onNext={handleNextFromStep2}
                  onPrev={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <Step4Review
                  data={formData}
                  onChange={handleDataChange}
                  errors={errors}
                  onJumpToStep={(s) => setCurrentStep(s)}
                  onSubmit={handleSubmit}
                  onPrev={() => setCurrentStep(2)}
                  isSubmitting={isSubmitting}
                  onOpenCodeOfConduct={() => setCodeModalOpen(true)}
                  onOpenPrivacyNotice={() => setPrivacyModalOpen(true)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CodeOfConductModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />
      <PrivacyNoticeModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </section>
  );
};
