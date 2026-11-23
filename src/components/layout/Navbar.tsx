import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-yousec-bg/90 backdrop-blur-md border-b border-yousec-border py-3 shadow-card'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand & Institutional identification */}
          <div className="flex items-center gap-3.5">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-yousec-accent/60 bg-white flex items-center justify-center p-0.5 group-hover:border-yousec-accent transition-all duration-300 shadow-glow-subtle group-hover:scale-105">
                <img
                  src="/yousec-logo.png"
                  alt="YouSec Club Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg tracking-wider text-yousec-text group-hover:text-white transition-colors">
                    YOUSEC
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-yousec-surface border border-yousec-border text-yousec-muted">
                    Club
                  </span>
                </div>
                <p className="text-[11px] font-mono tracking-tight text-yousec-dimmed">
                  YOUCODE SAFI • MOROCCO
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollTo('pillars')}
              className="text-xs uppercase tracking-widest font-mono text-yousec-muted hover:text-yousec-text transition-colors"
            >
              Why YouSec
            </button>
            <button
              onClick={() => scrollTo('domains')}
              className="text-xs uppercase tracking-widest font-mono text-yousec-muted hover:text-yousec-text transition-colors"
            >
              Fields
            </button>
            <button
              onClick={() => scrollTo('values')}
              className="text-xs uppercase tracking-widest font-mono text-yousec-muted hover:text-yousec-text transition-colors"
            >
              Values
            </button>
          </nav>

          {/* Right Action & Status Badge */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-yousec-surface border border-yousec-border text-[11px] font-mono text-yousec-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yousec-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yousec-accent"></span>
              </span>
              <span>APPLICATIONS OPEN</span>
            </div>

            <button
              onClick={() => scrollTo('apply')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yousec-accent hover:bg-yousec-accentHover text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-glow-subtle hover:shadow-glow-crimson"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => scrollTo('apply')}
              className="px-3 py-1.5 rounded bg-yousec-accent text-white text-xs font-semibold"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-yousec-muted hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-yousec-border bg-yousec-surface/95 rounded-xl p-4 space-y-3">
            <button
              onClick={() => scrollTo('pillars')}
              className="block w-full text-left text-xs uppercase font-mono tracking-wider py-2 text-yousec-muted hover:text-white"
            >
              Why YouSec
            </button>
            <button
              onClick={() => scrollTo('domains')}
              className="block w-full text-left text-xs uppercase font-mono tracking-wider py-2 text-yousec-muted hover:text-white"
            >
              Technical Fields
            </button>
            <button
              onClick={() => scrollTo('values')}
              className="block w-full text-left text-xs uppercase font-mono tracking-wider py-2 text-yousec-muted hover:text-white"
            >
              Ethics & Values
            </button>
            <div className="pt-2 border-t border-yousec-border flex items-center justify-between text-[11px] font-mono text-yousec-dimmed">
              <span>STATUS</span>
              <span className="text-yousec-accent">APPLICATIONS OPEN</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
