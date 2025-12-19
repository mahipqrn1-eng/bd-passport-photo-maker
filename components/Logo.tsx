
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  return (
    <div className={`relative flex items-center justify-center transition-transform hover:scale-105 ${sizes[size]} ${className}`}>
      {/* Premium Squircle Base (iOS-style continuity) */}
      <div className="absolute inset-0 bg-[#006a4e] shadow-lg shadow-green-900/20" 
           style={{ borderRadius: '24%' }}>
      </div>

      {/* Glossy Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
           style={{ borderRadius: '24%' }}>
      </div>

      {/* Capture Frame (Viewfinder Corners) */}
      <div className="absolute inset-[15%] pointer-events-none">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40 rounded-tl-sm"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/40 rounded-tr-sm"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/40 rounded-bl-sm"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40 rounded-br-sm"></div>
      </div>

      {/* Central Aperture / Red Sun Symbolism */}
      <div className="relative w-1/2 h-1/2 bg-[#f42a41] rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-white/10">
        {/* Shutter Blades (Subtle Aperture Effect) */}
        <svg viewBox="0 0 24 24" className="w-full h-full text-black/10 absolute rotate-12">
          <path fill="currentColor" d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z" className="opacity-0" />
          <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.5" />
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Passport Silhouette Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-3/5 h-3/5 text-white z-10 drop-shadow-md" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
          <path d="M5 10h14" />
          <path d="M9 14h6" />
          <path d="M9 17h4" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Outer Inner Ring for "Precision" look */}
      <div className="absolute inset-[10%] rounded-full border border-white/10 scale-105 pointer-events-none"></div>
    </div>
  );
};

export default Logo;
