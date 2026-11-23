import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Copy, 
  Check, 
  RotateCcw,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ApplicationRecord } from '../../types/application';
import { HackerBadge } from '../ui/HackerBadge';

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

  return (
    <div className="py-6 space-y-8 step-fade-enter text-center max-w-xl mx-auto">
      {/* 3D Hacker Operative Badge */}
      <div className="flex justify-center mb-6">
        <HackerBadge
          data={record}
          referenceId={record.referenceId}
          isSubmitted={true}
        />
      </div>

      {/* Main headings */}
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
          STATUS: APPLICATION LOGGED & QUEUED
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          APPLICATION TRANSMITTED.
        </h3>
        <p className="text-xs sm:text-sm text-yousec-muted leading-relaxed max-w-md mx-auto">
          Welcome to the recruitment queue, <span className="text-white font-medium">{record.fullName}</span>. Your dossier has been securely logged with the YouSec committee.
        </p>
      </div>

      {/* Reference Card */}
      <div className="p-4 rounded-xl bg-yousec-surface border border-yousec-border space-y-3 text-left shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-yousec-dimmed">
            Application Reference Code:
          </span>
          <button
            type="button"
            onClick={copyReference}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-yousec-border text-[11px] font-mono text-yousec-muted hover:text-white hover:border-yousec-accent transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3.5 rounded-lg bg-black/60 border border-yousec-border flex items-center justify-between">
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
