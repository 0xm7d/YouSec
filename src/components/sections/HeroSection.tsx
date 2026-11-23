import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Terminal, Award } from 'lucide-react';
import { ScrambleText } from '../ui/ScrambleText';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Institutional Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yousec-surface/90 border border-yousec-border text-xs font-mono tracking-wider text-yousec-muted mb-6 shadow-sm hover:border-yousec-accent/50 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-yousec-accent animate-pulse" />
            <ScrambleText text="YOUCODE SAFI • CYBERSECURITY COMMUNITY" autoStart delay={100} triggerOnHover />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            YOUR JOURNEY INTO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yousec-text via-white to-yousec-accent">
              <ScrambleText text="CYBERSECURITY" autoStart delay={400} triggerOnHover />
            </span>{' '}
            STARTS HERE.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-yousec-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            Join <span className="text-white font-medium">YouSec</span>, the cybersecurity community at YouCode Safi. Learn, experiment, collaborate, and develop your skills alongside students who share your curiosity for security.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => scrollTo('apply')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-yousec-accent hover:bg-yousec-accentHover text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-glow-subtle hover:shadow-glow-crimson group"
            >
              <span>Apply to Join</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('pillars')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yousec-surface hover:bg-yousec-card border border-yousec-border hover:border-yousec-borderHover text-yousec-text font-medium text-sm transition-all duration-200"
            >
              <Compass className="w-4 h-4 text-yousec-muted" />
              <span>Discover YouSec</span>
            </button>
          </div>

          {/* Quick Metrics / Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-6 border-t border-yousec-borderSubtle">
            <div className="p-3 rounded-lg bg-yousec-surface/50 border border-yousec-border text-left">
              <div className="flex items-center gap-2 text-yousec-accent mb-1 font-mono text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold text-white">Ethics First</span>
              </div>
              <p className="text-[11px] text-yousec-muted leading-tight">
                100% legal, authorized & defensive security focus.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-yousec-surface/50 border border-yousec-border text-left">
              <div className="flex items-center gap-2 text-yousec-accent mb-1 font-mono text-xs">
                <Terminal className="w-4 h-4" />
                <span className="font-semibold text-white">All Skill Levels</span>
              </div>
              <p className="text-[11px] text-yousec-muted leading-tight">
                From complete beginner curiosity to advanced CTFers.
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-yousec-surface/50 border border-yousec-border text-left">
              <div className="flex items-center gap-2 text-yousec-accent mb-1 font-mono text-xs">
                <Award className="w-4 h-4" />
                <span className="font-semibold text-white">8 Technical Tracks</span>
              </div>
              <p className="text-[11px] text-yousec-muted leading-tight">
                Linux, Web, Crypto, Forensics, Reverse, Pwn & CTFs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
