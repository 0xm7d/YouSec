import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw,
  Clock,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { ApplicationRecord } from '../../types/application';
import { downloadApplicationDoc } from '../../lib/storage';

interface SuccessScreenProps {
  record: ApplicationRecord;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ record, onReset }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire confetti burst upon entering success screen
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#F5F5F5', '#991B1B', '#38BDF8'],
      });
    } catch (e) {
      // Ignore in non-browser or test environments
    }
  }, []);

  const copyReference = () => {
    navigator.clipboard.writeText(record.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDoc = () => {
    downloadApplicationDoc(record);
  };

  return (
    <div className="py-6 space-y-8 step-fade-enter text-center max-w-xl mx-auto">
      {/* Icon badge */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-yousec-accent/15 border border-yousec-accent/30 flex items-center justify-center text-yousec-accent shadow-glow-subtle">
          <CheckCircle2 className="w-8 h-8" />
        </div>
      </div>

      {/* Main headings */}
      <div className="space-y-2">
        <div className="inline-block px-2.5 py-1 rounded bg-black/60 border border-yousec-border text-[11px] font-mono text-yousec-dimmed">
          STATUS: PENDING REVIEW
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          APPLICATION RECEIVED.
        </h3>
        <p className="text-xs sm:text-sm text-yousec-muted leading-relaxed max-w-md mx-auto">
          Thank you for applying to <span className="text-white font-medium">YouSec</span>. Your application has been logged and queued for review by the committee.
        </p>
      </div>

      {/* Reference Card */}
      <div className="p-4 rounded-xl bg-yousec-surface border border-yousec-border space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-yousec-dimmed">
            Application Reference Code:
          </span>
          <button
            onClick={copyReference}
            className="flex items-center gap-1 text-[11px] font-mono text-yousec-muted hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="p-3 rounded-lg bg-black/60 border border-yousec-border flex items-center justify-between">
          <span className="font-mono text-base sm:text-lg font-bold text-yousec-accent tracking-widest">
            {record.referenceId}
          </span>
          <span className="text-[11px] font-mono text-yousec-dimmed">
            {record.submittedAt}
          </span>
        </div>

        <div className="text-[11px] text-yousec-muted flex items-start gap-2 pt-1">
          <ShieldCheck className="w-4 h-4 text-yousec-accent shrink-0 mt-0.5" />
          <span>
            Notification dispatched to <strong className="text-white">YouSec Club Staff</strong>. Single-submission registered for <span className="text-white">{record.email}</span>.
          </span>
        </div>
      </div>

      {/* Word / Document Download Action */}
      <div className="p-4 rounded-xl bg-yousec-card/70 border border-yousec-border text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-yousec-bg border border-yousec-border text-yousec-accent shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Download Application Dossier</div>
            <div className="text-[11px] text-yousec-muted">
              Save a Word-compatible (.doc) copy of your submitted answers.
            </div>
          </div>
        </div>
        <button
          onClick={handleDownloadDoc}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yousec-surface hover:bg-yousec-bg border border-yousec-border text-xs font-semibold text-white transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export .DOC</span>
        </button>
      </div>

      {/* Next Steps Timeline */}
      <div className="p-5 rounded-xl bg-yousec-bg border border-yousec-border text-left space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-yousec-accent" />
          Next Steps & Review Process
        </h4>
        <div className="space-y-3 text-xs text-yousec-muted">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-yousec-surface border border-yousec-border font-mono text-[10px] flex items-center justify-center text-yousec-accent shrink-0">
              1
            </span>
            <p>
              <strong className="text-white">Committee Review:</strong> Club administrators review motivation, curiosity, and track alignment.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-yousec-surface border border-yousec-border font-mono text-[10px] flex items-center justify-center text-yousec-accent shrink-0">
              2
            </span>
            <p>
              <strong className="text-white">Email Communication:</strong> We will reach out via <code className="text-yousec-text font-mono">{record.email}</code> regarding decision and induction timeline.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-yousec-surface border border-yousec-border font-mono text-[10px] flex items-center justify-center text-yousec-accent shrink-0">
              3
            </span>
            <p>
              <strong className="text-white">Onboarding & Discord:</strong> Accepted members will receive onboarding instructions and Discord community invitations.
            </p>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-mono text-yousec-dimmed hover:text-yousec-text transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start a new application draft</span>
        </button>
      </div>
    </div>
  );
};
