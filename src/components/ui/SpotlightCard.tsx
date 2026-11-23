import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(225, 29, 72, 0.12)',
  borderColor = 'rgba(225, 29, 72, 0.6)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-xl border border-yousec-border bg-yousec-surface p-6 transition-all duration-300 hover:border-transparent ${className}`}
      style={
        {
          '--mouse-x': '-500px',
          '--mouse-y': '-500px',
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Dynamic Cyber Border Glow (Follows cursor) */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(320px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 65%)`,
        }}
      />

      {/* Cyber Circuit Grid Background Pattern (Revealed under spotlight) */}
      <div 
        className="pointer-events-none absolute inset-[1px] rounded-[11px] bg-yousec-surface z-0"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(var(--mouse-x) var(--mouse-y) at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Dynamic Spotlight Cone */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
