import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenCodeOfConduct: () => void;
  onOpenPrivacyNotice: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCodeOfConduct, onOpenPrivacyNotice }) => {
  return (
    <footer className="border-t border-yousec-border bg-yousec-surface/50 relative z-10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-yousec-accent/50 bg-white flex items-center justify-center p-0.5">
                <img
                  src="/yousec-logo.png"
                  alt="YouSec Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-yousec-text">
                YOUSEC
              </span>
            </div>
            <p className="text-xs text-yousec-muted max-w-md leading-relaxed">
              The Cybersecurity & Ethical Hacking Community at YouCode Safi, Morocco.
              Fostering hands-on technical skills, curiosity, ethical research, and collaborative problem-solving.
            </p>
            <div className="inline-block px-3 py-1 rounded bg-black/60 border border-yousec-border font-mono text-[11px] text-yousec-dimmed">
              &quot;Learn Freely. Hack Ethically. Respect Everyone.&quot;
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-yousec-text mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-mono text-yousec-muted">
              <li>
                <a href="#pillars" className="hover:text-yousec-accent transition-colors">
                  01. Why YouSec
                </a>
              </li>
              <li>
                <a href="#domains" className="hover:text-yousec-accent transition-colors">
                  02. Technical Fields
                </a>
              </li>
              <li>
                <a href="#values" className="hover:text-yousec-accent transition-colors">
                  03. Ethics & Motto
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-yousec-accent transition-colors">
                  04. Apply to Join
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-yousec-text mb-3">
              Integrity
            </h4>
            <ul className="space-y-2 text-xs font-mono text-yousec-muted">
              <li>
                <button
                  type="button"
                  onClick={onOpenCodeOfConduct}
                  className="hover:text-yousec-accent transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-yousec-accent" />
                  Code of Conduct
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyNotice}
                  className="hover:text-yousec-accent transition-colors text-left"
                >
                  Privacy Notice
                </button>
              </li>
              <li className="pt-2 text-[11px] text-yousec-dimmed leading-snug">
                YouCode Safi Campus<br />
                Safi, Morocco
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-yousec-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-yousec-dimmed">
          <p>© {new Date().getFullYear()} YouSec — YouCode Cybersecurity Club. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[11px]">
            Built with ethical curiosity for YouCode students
          </p>
        </div>
      </div>
    </footer>
  );
};
