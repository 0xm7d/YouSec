import React, { useEffect } from 'react';
import { X, Lock } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-yousec-surface border border-yousec-border rounded-xl shadow-card overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-yousec-border bg-yousec-card">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-yousec-accent/10 border border-yousec-accent/20 text-yousec-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 id="privacy-title" className="text-base font-display font-bold text-white">
                YouSec Privacy & Data Processing Notice
              </h3>
              <p className="text-xs font-mono text-yousec-dimmed">
                Transparent Handling of Membership Applications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-yousec-muted hover:text-white hover:bg-yousec-surface transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-yousec-text leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">1. Purpose of Data Collection</h4>
            <p className="text-yousec-muted">
              We collect your name, campus email, academic year, cybersecurity interests, and motivation statements strictly to assess your club membership application and contact you regarding onboarding, workshops, and CTF sessions.
            </p>

            <h4 className="font-semibold text-white text-sm">2. Confidentiality & Row Level Security</h4>
            <p className="text-yousec-muted">
              Your application data is stored with database-level Row Level Security (RLS). Applicants cannot view, inspect, or query applications submitted by other students. Only designated club administrators have access for application evaluation.
            </p>

            <h4 className="font-semibold text-white text-sm">3. Single-Submission Policy</h4>
            <p className="text-yousec-muted">
              To ensure fairness and prevent duplicate registrations, each student email address is restricted to a single active submission per recruitment cycle.
            </p>

            <h4 className="font-semibold text-white text-sm">4. No Commercial Use</h4>
            <p className="text-yousec-muted">
              Your data is never shared with, sold to, or used by commercial third parties. It is retained solely within the context of YouCode Safi student club activities.
            </p>

            <h4 className="font-semibold text-white text-sm">5. Contact & Rights</h4>
            <p className="text-yousec-muted">
              You may request modification, rectification, or deletion of your application submission at any time by contacting the <strong className="text-white">YouSec Club Staff</strong> on campus or via official club channels.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-yousec-border bg-yousec-card flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-yousec-accent text-white font-medium text-xs hover:bg-yousec-accentHover transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
