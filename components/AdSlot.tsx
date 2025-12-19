
import React, { useEffect } from 'react';

interface AdSlotProps {
  className?: string;
  type?: 'banner' | 'rectangle' | 'sticky-bottom' | 'responsive' | 'in-feed';
  adSlot?: string; // Specific AdSense Slot ID
  onClose?: () => void;
}

/**
 * AdSlot Component - Google AdSense Ready
 * Implements the standard <ins> tag structure required for AdSense.
 */
const AdSlot: React.FC<AdSlotProps> = ({ className = '', type = 'responsive', adSlot, onClose }) => {
  
  useEffect(() => {
    // Attempt to push ads once the component is mounted
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  const getSizingClasses = () => {
    switch (type) {
      case 'sticky-bottom':
        return 'w-full h-[60px] sm:h-[90px] fixed bottom-0 left-0 z-[100] bg-white border-t border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.08)]';
      case 'rectangle':
        return 'w-[300px] h-[250px] mx-auto';
      case 'in-feed':
        return 'w-full min-h-[100px] max-w-4xl mx-auto';
      case 'responsive':
      default:
        return 'w-full min-h-[90px] max-w-[970px] mx-auto';
    }
  };

  const adStyles: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
  };

  if (type === 'sticky-bottom') {
    return (
      <div className={getSizingClasses()}>
        <div className="max-w-4xl mx-auto h-full relative">
          <div className="absolute -top-6 left-2 bg-slate-800 text-white px-2 py-0.5 rounded-t-md text-[8px] uppercase tracking-widest font-bold">
            Sponsored
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute -top-10 right-2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-2xl hover:bg-black transition-all z-[110] border-2 border-white"
              aria-label="Close Ad"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {/* Real AdSense Tag */}
          <ins className="adsbygoogle"
               style={{ ...adStyles, width: '100%', height: '100%' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with real Pub ID
               data-ad-slot={adSlot || "XXXXXXXXXX"}
               data-ad-format="horizontal"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center overflow-hidden my-8 px-4 ${className}`}>
      <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em] mb-2 font-semibold">Advertisement</span>
      <div className={`${getSizingClasses()} bg-slate-50/50 border border-slate-100 rounded-2xl relative flex items-center justify-center min-h-[100px]`}>
        {/* AdSense Placeholder/Tag */}
        <ins className="adsbygoogle"
             style={adStyles}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={adSlot || "XXXXXXXXXX"}
             data-ad-format={type === 'rectangle' ? 'rectangle' : 'auto'}
             data-full-width-responsive="true"></ins>
        
        {/* Placeholder UI for when ads haven't loaded */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10">
           <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <span className="text-[10px] font-bold uppercase tracking-widest">{type} unit</span>
        </div>
      </div>
    </div>
  );
};

export default AdSlot;
