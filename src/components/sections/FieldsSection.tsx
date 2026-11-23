import React from 'react';
import { 
  Network, 
  Globe, 
  KeyRound, 
  Search, 
  Binary, 
  Bug, 
  Flag, 
  ShieldAlert 
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { ScrambleText } from '../ui/ScrambleText';

const FIELDS = [
  {
    title: 'Linux & Networking',
    desc: 'Core architecture of Linux systems, bash automation, TCP/IP stack, routing protocols, and low-level traffic inspection with Wireshark.',
    icon: Network,
    tag: 'Core Infra',
  },
  {
    title: 'Web Security',
    desc: 'Understanding modern application flaws: OWASP Top 10 vulnerabilities, authentication bypasses, SQL injection, XSS, CSRF, and API auditing.',
    icon: Globe,
    tag: 'AppSec',
  },
  {
    title: 'Cryptography',
    desc: 'From classical ciphers to modern public-key cryptography (RSA, ECC), AES block ciphers, hashing algorithms, and cryptographic protocol analysis.',
    icon: KeyRound,
    tag: 'Math & Ciphers',
  },
  {
    title: 'Digital Forensics',
    desc: 'Investigating security incidents, memory dump extraction with Volatility, disk imaging analysis, file carving, and timeline reconstruction.',
    icon: Search,
    tag: 'DFIR',
  },
  {
    title: 'Reverse Engineering',
    desc: 'Decompiling and disassembling software using Ghidra, IDA, and Radare2 to understand compiled binary behaviors and malware logic.',
    icon: Binary,
    tag: 'Low-Level',
  },
  {
    title: 'Binary Exploitation / Pwn',
    desc: 'Understanding memory corruption, stack overflows, return-oriented programming (ROP chains), heap mechanics, and defensive mitigations.',
    icon: Bug,
    tag: 'Exploitation',
  },
  {
    title: 'Capture The Flag (CTF)',
    desc: 'Fast-paced, team-based security puzzles and jeopardy style challenges that test diverse problem-solving skills under time constraints.',
    icon: Flag,
    tag: 'Competitive',
  },
  {
    title: 'Defensive Security',
    desc: 'Hardening Linux and web servers, configuring intrusion detection (IDS/IPS), monitoring logs, and building resilient security architectures.',
    icon: ShieldAlert,
    tag: 'Blue Team',
  },
];

export const FieldsSection: React.FC = () => {
  return (
    <section id="domains" className="py-20 md:py-28 relative z-10 border-t border-yousec-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block font-mono text-xs text-yousec-accent uppercase tracking-widest mb-2 font-semibold">
            02 — Technical Domains
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            <ScrambleText text="Fields We Explore & Master" triggerOnHover autoStart delay={200} />
          </h2>
          <p className="text-sm sm:text-base text-yousec-muted leading-relaxed">
            Whether your curiosity lies in deep low-level code, web protocols, forensics, or competitive CTF solving, our community covers the key spectrum of security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FIELDS.map((f, i) => {
            const Icon = f.icon;
            return (
              <SpotlightCard
                key={i}
                className="p-5 flex flex-col justify-between"
                spotlightColor="rgba(225, 29, 72, 0.15)"
                borderColor="rgba(225, 29, 72, 0.7)"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-black/50 border border-yousec-border text-yousec-accent group-hover:border-yousec-accent/50 group-hover:shadow-glow-subtle transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-yousec-bg border border-yousec-border text-yousec-dimmed group-hover:text-yousec-text group-hover:border-yousec-accent/30 transition-colors">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-yousec-accent transition-colors">
                    <ScrambleText text={f.title} triggerOnHover autoStart={false} />
                  </h3>

                  <p className="text-xs text-yousec-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-yousec-borderSubtle flex items-center justify-between text-[10px] font-mono text-yousec-dimmed">
                  <span>Track {i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  <span className="text-yousec-muted group-hover:text-yousec-accent transition-colors">
                    Open to all
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
