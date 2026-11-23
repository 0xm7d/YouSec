import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="ambient pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle coordinate grid */}
      <div className="ambient-grid absolute inset-0" />

      {/* Top crimson orb */}
      <div 
        className="orb-glow-crimson -top-[250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(153, 27, 27, 0.04) 45%, transparent 70%)' }}
      />

      {/* Bottom right subtle crimson glow */}
      <div 
        className="orb-glow-crimson -bottom-[300px] -right-[150px] w-[650px] h-[650px]"
        style={{ background: 'radial-gradient(circle, rgba(185, 28, 28, 0.08) 0%, transparent 65%)' }}
      />

      {/* Crosshair markers */}
      <div className="crosshair top-24 left-10 hidden lg:block">+</div>
      <div className="crosshair top-48 right-16 hidden lg:block">+</div>
      <div className="crosshair top-[720px] left-1/4 hidden lg:block">+</div>
      <div className="crosshair top-[1100px] right-24 hidden lg:block">+</div>
      <div className="crosshair top-[1600px] left-20 hidden lg:block">+</div>
    </div>
  );
};
