import React from 'react';
import { BookOpen, Cpu, Users, Trophy } from 'lucide-react';

const PILLARS = [
  {
    number: '01',
    title: 'Learn',
    subtitle: 'Knowledge Foundations',
    description: 'Build your core knowledge in Linux, Networking, Web Security, and foundational cybersecurity disciplines with guided workshops and peer sessions.',
    icon: BookOpen,
    highlights: ['Linux internals & Bash', 'Network packet analysis', 'Security concepts & OWASP'],
  },
  {
    number: '02',
    title: 'Practice',
    subtitle: 'Hands-on Labs',
    description: 'Develop practical capabilities through dedicated vulnerable machines, realistic sandboxes, guided walk-throughs, and technical exercises.',
    icon: Cpu,
    highlights: ['TryHackMe & HackTheBox', 'Internal lab environments', 'Realistic exploit chains'],
  },
  {
    number: '03',
    title: 'Collaborate',
    subtitle: 'Peer Community',
    description: 'Learn alongside other students, exchange research findings, solve technical challenges as a team, and build meaningful cybersecurity tools together.',
    icon: Users,
    highlights: ['Study groups & mentorship', 'Collaborative projects', 'Knowledge sharing talks'],
  },
  {
    number: '04',
    title: 'Compete',
    subtitle: 'CTF Tournaments',
    description: 'Prepare for national and international Capture The Flag competitions. Hone your speed, analytical reasoning, and competitive teamwork.',
    icon: Trophy,
    highlights: ['Jeopardy CTF strategies', 'Attack/Defense simulations', 'Team problem solving'],
  },
];

export const PillarsSection: React.FC = () => {
  return (
    <section id="pillars" className="py-20 md:py-28 relative z-10 border-t border-yousec-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block font-mono text-xs text-yousec-accent uppercase tracking-widest mb-2 font-semibold">
            01 — Core Pillars
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Why Join YouSec?
          </h2>
          <p className="text-sm sm:text-base text-yousec-muted leading-relaxed">
            Cybersecurity is learned through curiosity, experimentation, practical challenges, and continuous improvement. Here is how we grow together.
          </p>
        </div>

        {/* Pillars 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="group relative bg-yousec-surface border border-yousec-border rounded-xl p-6 flex flex-col justify-between card-hover-crimson"
              >
                {/* Number & Icon header */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/40 border border-yousec-border text-yousec-accent">
                      {p.number}
                    </span>
                    <div className="p-2.5 rounded-lg bg-yousec-card border border-yousec-border group-hover:border-yousec-accent/40 group-hover:text-yousec-accent text-yousec-muted transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-1">
                    {p.title}
                  </h3>
                  <div className="text-[11px] font-mono text-yousec-dimmed uppercase tracking-wider mb-3">
                    {p.subtitle}
                  </div>

                  <p className="text-xs text-yousec-muted leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-4 border-t border-yousec-borderSubtle">
                  <ul className="space-y-1.5 text-[11px] font-mono text-yousec-dimmed">
                    {p.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-yousec-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
