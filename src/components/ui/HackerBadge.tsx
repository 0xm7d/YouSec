import React, { useRef, useState } from 'react';
import { Terminal, Shield, Binary } from 'lucide-react';
import { ApplicationFormData } from '../../types/application';

interface HackerBadgeProps {
  data: Partial<ApplicationFormData>;
  referenceId?: string;
  isSubmitted?: boolean;
}

export const HackerBadge: React.FC<HackerBadgeProps> = ({
  data,
  referenceId = 'YSC-0x7F4A',
  isSubmitted = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const getRank = () => {
    const level = data.experienceLevel?.toLowerCase() || '';
    if (level.includes('advanced')) return { code: '0x03', label: 'ELITE SPECIALIST', color: 'text-rose-400' };
    if (level.includes('intermediate')) return { code: '0x02', label: 'TACTICAL RECON', color: 'text-amber-400' };
    return { code: '0x01', label: 'CYBER CADET', color: 'text-emerald-400' };
  };

  const rank = getRank();
  const operativeName = data.fullName?.trim() ? data.fullName.toUpperCase() : 'ANONYMOUS OPERATOR';
  const discordHandle = data.discordUsername?.trim()
    ? data.discordUsername.trim().startsWith('@')
      ? data.discordUsername.trim()
      : `@${data.discordUsername.trim()}`
    : '@handle_unassigned';
  const academicTrack = data.academicYear || '1ère Année';

  return (
    <div className="flex flex-col items-center select-none perspective-[1200px]">
      {/* 3D PCB Cyber Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
          transition: isHovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative w-full max-w-[330px] rounded-2xl overflow-hidden border border-rose-900/60 bg-[#060913] p-5 shadow-[0_0_35px_rgba(225,29,72,0.18)]"
      >
        {/* Holographic Laser Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200"
          style={{
            opacity: isHovered ? 0.35 : 0.08,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(225,29,72,0.45) 0%, rgba(56,189,248,0.2) 45%, transparent 75%)`,
          }}
        />

        {/* Laser Sweep Scanline Animation */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-25">
          <div className="w-full h-24 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent animate-[scan_4s_linear_infinite]" />
        </div>

        {/* PCB Copper Traces Background */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          {/* Subtle PCB track circuits */}
          <svg className="w-full h-full text-rose-500/40" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pcb-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 10 20 L 30 20 M 20 30 L 20 15 L 0 15" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="10" cy="20" r="1.5" fill="currentColor" />
              <circle cx="20" cy="15" r="1.5" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pcb-grid)" />
          </svg>
        </div>

        {/* Top Header: YouSec Club */}
        <div className="relative z-10 flex items-center gap-3 border-b border-rose-950/80 pb-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-black border border-rose-600/60 p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(225,29,72,0.3)]">
            <img
              src="/yousec-logo.png"
              alt="YouSec Logo"
              className="w-full h-full object-contain rounded-md scale-110"
            />
          </div>
          <span className="font-display font-extrabold text-sm tracking-wider text-white">
            YouSec Club
          </span>
        </div>

        {/* Middle HUD: Classified Dossier Photo & Candidate Details */}
        <div className="relative z-10 bg-black/75 border border-zinc-800/90 rounded-xl p-3.5 mb-3.5 space-y-3">
          <div className="flex items-center gap-3.5">
            {/* Classified Dossier Photo Box (Fixed Passport Size) */}
            <div className="relative w-[76px] h-[92px] min-w-[76px] max-w-[76px] rounded-lg bg-black border border-rose-500/60 overflow-hidden shrink-0 shadow-[0_0_12px_rgba(225,29,72,0.2)]">
              <img
                src="/hacker-avatar.jpg"
                alt="Operative Photo"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Corner Bracket Reticles */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-rose-500" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-rose-500" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-rose-500" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-rose-500" />
              <div className="absolute bottom-1 inset-x-0 text-center font-mono text-[7px] text-rose-400 bg-black/75 py-0.5 tracking-tighter">
                CLASSIFIED
              </div>
            </div>

            {/* Operative Info (Only what user entered) */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-zinc-500 tracking-wider">CALLSIGN</span>
                <span className={`text-[8px] font-mono font-bold ${rank.color}`}>
                  [{rank.code}]
                </span>
              </div>
              <div className="font-mono font-black text-sm text-white truncate tracking-wide">
                {operativeName}
              </div>
              
              <div className="text-[10px] font-mono text-rose-400 truncate flex items-center gap-1">
                <Terminal className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                <span className="truncate">{discordHandle}</span>
              </div>

              <div className="text-[9px] font-mono text-zinc-400 pt-0.5">
                <span className="text-zinc-600">RANK: </span>
                <span className={rank.color}>{rank.label}</span>
              </div>
            </div>
          </div>

          {/* Academic Track & Status Row */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900 text-[9px] font-mono">
            <div className="bg-zinc-950/90 p-2 rounded border border-zinc-900">
              <span className="text-zinc-600 block text-[7px]">AFFILIATION</span>
              <span className="text-zinc-300 font-semibold">{academicTrack}</span>
            </div>
            <div className="bg-zinc-950/90 p-2 rounded border border-zinc-900">
              <span className="text-zinc-600 block text-[7px]">STATUS</span>
              <span className={isSubmitted ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isSubmitted ? 'VERIFIED' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Selected Focus Tracks Pills */}
          {data.areasOfInterest && data.areasOfInterest.length > 0 && (
            <div className="pt-1">
              <div className="flex flex-wrap gap-1">
                {data.areasOfInterest.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded bg-zinc-900 border border-rose-950 text-[8px] font-mono text-zinc-300"
                  >
                    #{area.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hardware Chip & Cryptographic Fingerprint */}
        <div className="relative z-10 flex items-center justify-between bg-black/40 border border-zinc-900 rounded-lg p-2 mb-3 text-[8px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Binary className="w-3.5 h-3.5 text-rose-500" />
            <span>CIPHER // SHA-256</span>
          </div>
          <div className="text-zinc-600 tracking-wider">
            AUTH_HASH: 0x{referenceId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}
          </div>
        </div>

        {/* Raw Hex Dump Footer & Barcode */}
        <div className="relative z-10 pt-2 border-t border-rose-950/70">
          <div className="flex items-center justify-between font-mono text-[8px] text-zinc-500 mb-1">
            <span className="text-rose-400 font-bold tracking-widest">{referenceId}</span>
            <span className="flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-rose-500" />
              <span>ETHICAL_DEFENSE</span>
            </span>
          </div>

          {/* Raw Hacker Matrix Hex Stream */}
          <div className="font-mono text-[7px] text-zinc-600 tracking-widest truncate bg-black/60 p-1 rounded border border-zinc-900">
            48 61 63 6b 20 54 68 65 20 50 6c 61 6e 65 74 20 2d 20 59 6f 75 53 65 63
          </div>
        </div>
      </div>
    </div>
  );
};
