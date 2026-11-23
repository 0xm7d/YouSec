import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Lightbulb, Flame, Scale } from 'lucide-react';

const VALUES = [
  {
    title: 'Ethics First',
    desc: 'All security practice is conducted within strictly authorized environments and legal frameworks. Integrity is non-negotiable.',
    icon: ShieldCheck,
  },
  {
    title: 'Continuous Learning',
    desc: 'Cybersecurity evolves rapidly. We embrace relentless curiosity, study fresh techniques, and learn constantly from failures.',
    icon: Flame,
  },
  {
    title: 'Mutual Respect',
    desc: 'No gatekeeping. Experienced members guide beginners with humility, ensuring a safe, supportive space for every question.',
    icon: HeartHandshake,
  },
  {
    title: 'Collaboration',
    desc: 'Security is a team endeavor. We share methodologies, write writeups, and solve complex CTF flags together.',
    icon: Sparkles,
  },
  {
    title: 'Curiosity & Tenacity',
    desc: 'We dig deep into how computers, networks, and protocols actually work beneath the surface.',
    icon: Lightbulb,
  },
  {
    title: 'Accountability',
    desc: 'We take responsibility for the security tools we write and ensure our research positively protects people and systems.',
    icon: Scale,
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section id="values" className="py-20 md:py-28 relative z-10 border-t border-yousec-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Motto Callout Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yousec-surface via-yousec-card to-yousec-surface border border-yousec-border p-8 md:p-12 mb-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yousec-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="font-mono text-xs uppercase tracking-widest text-yousec-accent font-semibold mb-3 block">
            Club Motto
          </span>

          <blockquote className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-4">
            &ldquo;Learn Freely. Hack Ethically. Respect Everyone.&rdquo;
          </blockquote>

          <p className="text-xs sm:text-sm text-yousec-muted max-w-xl mx-auto leading-relaxed">
            YouSec does not gatekeep. We are not an exclusive clique for experts only. We value passion, ethical character, curiosity, and the drive to roll up your sleeves and learn.
          </p>
        </div>

        {/* Values 6-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-yousec-surface border border-yousec-border hover:border-yousec-borderHover transition-colors flex gap-4"
              >
                <div className="p-2.5 rounded-lg bg-black/60 border border-yousec-border text-yousec-accent shrink-0 h-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-1.5 flex items-center gap-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs text-yousec-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
