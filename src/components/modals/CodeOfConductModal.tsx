import React, { useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CodeOfConductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeOfConductModal: React.FC<CodeOfConductModalProps> = ({ isOpen, onClose }) => {
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
        aria-labelledby="conduct-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-yousec-border bg-yousec-card">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-yousec-accent/10 border border-yousec-accent/20 text-yousec-accent">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 id="conduct-title" className="text-base font-display font-bold text-white">
                YouSec Code of Conduct
              </h3>
              <p className="text-xs font-mono text-yousec-dimmed">
                Guidelines for Ethical Cybersecurity & Community Respect
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-yousec-text leading-relaxed">
          <div className="p-3.5 rounded-lg bg-yousec-accent/10 border border-yousec-accent/20 text-yousec-text">
            <p className="font-semibold text-yousec-accent mb-1 font-mono text-[11px] uppercase tracking-wider">
              Core Axiom: Ethics First
            </p>
            YouSec members practice cybersecurity strictly for educational, defensive, and authorized research purposes. Unethical behavior or unlawful actions will result in immediate dismissal.
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yousec-accent" />
                1. Authorization & Legality
              </h4>
              <p className="text-yousec-muted pl-5">
                Never perform security assessments, penetration tests, scans, or exploitation against any system, network, or individual without explicit, verifiable written authorization. Campus infrastructure at YouCode or third-party targets are strictly off-limits outside controlled lab environments.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yousec-accent" />
                2. Responsible Vulnerability Disclosure
              </h4>
              <p className="text-yousec-muted pl-5">
                If an unintentional security issue is discovered during campus activities, members must immediately report it discreetly and privately to the designated faculty or administrators without exploitation, public leaking, or weaponization.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yousec-accent" />
                3. Inclusive Learning & Zero Gatekeeping
              </h4>
              <p className="text-yousec-muted pl-5">
                YouSec thrives on shared knowledge. Experienced members must mentor newcomers with patience and empathy. Gatekeeping, derogatory technical arrogance, or mocking beginners is strictly prohibited.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yousec-accent" />
                4. Mutual Respect & Safety
              </h4>
              <p className="text-yousec-muted pl-5">
                We maintain a zero-tolerance policy towards harassment, discrimination, or abusive conduct based on gender, race, skill level, or background.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-yousec-accent" />
                5. Accountability
              </h4>
              <p className="text-yousec-muted pl-5">
                Each member is solely responsible for their tools, credentials, and actions. Club resources may only be used for learning, training exercises, and legitimate CTF competitions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-yousec-border bg-yousec-card flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-yousec-accent text-white font-medium text-xs hover:bg-yousec-accentHover transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
