
import React, { useRef, useEffect, useState } from 'react';
import { ASPECT_RATIO, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface PhotoEditorProps {
  imageUrl: string;
  onCropSave: (croppedUrl: string) => void;
  lang: Language;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ imageUrl, onCropSave, lang }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const t = TRANSLATIONS[lang]; 

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;
    image.onload = () => {
      setImg(image);
      let w = image.width;
      let h = image.width / ASPECT_RATIO;
      if (h > image.height) {
        h = image.height;
        w = h * ASPECT_RATIO;
      }
      // Initial sizing: 75% for better framing control
      const initialW = w * 0.75;
      const initialH = h * 0.75;
      
      setCrop({
        x: (image.width - initialW) / 2,
        y: (image.height - initialH) / 2,
        width: initialW,
        height: initialH
      });
    };
  }, [imageUrl]);

  useEffect(() => {
    if (img && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. Draw dimmed background
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;

        // 2. Draw clear cropped area
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        ctx.drawImage(
          img,
          crop.x, crop.y, crop.width, crop.height,
          crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY
        );

        // 3. Draw crop outer border
        ctx.strokeStyle = '#006a4e';
        ctx.lineWidth = 4;
        ctx.strokeRect(crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY);
        
        // 4. Draw Passport Alignment Overlay (Guides)
        const cx_s = crop.x * scaleX;
        const cy_s = crop.y * scaleY;
        const cw_s = crop.width * scaleX;
        const ch_s = crop.height * scaleY;
        const centerX = cx_s + cw_s / 2;

        // Subtle Center Guide
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(centerX, cy_s);
        ctx.lineTo(centerX, cy_s + ch_s);
        ctx.stroke();

        // Face Zone Oval (Ideal head placement)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        // Ellipse centered horizontally, slightly offset vertically
        ctx.ellipse(centerX, cy_s + ch_s * 0.45, cw_s * 0.28, ch_s * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Crown/Top of Head Guide (~10% from top)
        ctx.beginPath();
        ctx.strokeStyle = '#4ade80'; // Bright green for precision
        ctx.lineWidth = 2;
        ctx.moveTo(centerX - cw_s * 0.15, cy_s + ch_s * 0.1);
        ctx.lineTo(centerX + cw_s * 0.15, cy_s + ch_s * 0.1);
        ctx.stroke();
        
        // Chin Guide (~80% from top)
        ctx.beginPath();
        ctx.moveTo(centerX - cw_s * 0.15, cy_s + ch_s * 0.82);
        ctx.lineTo(centerX + cw_s * 0.15, cy_s + ch_s * 0.82);
        ctx.stroke();

        // Eye Level Guide (~45% from top)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.moveTo(cx_s + cw_s * 0.1, cy_s + ch_s * 0.45);
        ctx.lineTo(cx_s + cw_s * 0.9, cy_s + ch_s * 0.45);
        ctx.stroke();
      }
    }
  }, [img, crop]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    setDragStart({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !img || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    const dx = (x - dragStart.x) * (img.width / canvasRef.current.width);
    const dy = (y - dragStart.y) * (img.height / canvasRef.current.height);
    
    setCrop(prev => ({
      ...prev,
      x: Math.max(0, Math.min(img.width - prev.width, prev.x + dx)),
      y: Math.max(0, Math.min(img.height - prev.height, prev.y + dy)),
    }));
    setDragStart({ x, y });
  };

  const adjustZoom = (factor: number) => {
    if (!img) return;
    setCrop(prev => {
      const newWidth = prev.width * factor;
      const newHeight = prev.height * factor;
      
      // Constraints
      if (newWidth > img.width || newHeight > img.height) return prev;
      if (newWidth < 150 || newHeight < (150 / ASPECT_RATIO)) return prev;

      // Center the zoom
      const dx = (prev.width - newWidth) / 2;
      const dy = (prev.height - newHeight) / 2;
      
      let newX = prev.x + dx;
      let newY = prev.y + dy;

      // Keep in bounds
      newX = Math.max(0, Math.min(img.width - newWidth, newX));
      newY = Math.max(0, Math.min(img.height - newHeight, newY));

      return { x: newX, y: newY, width: newWidth, height: newHeight };
    });
  };

  const handleSave = () => {
    if (!img) return;
    const finalCanvas = document.createElement('canvas');
    // High res output
    finalCanvas.width = 1350; // 45mm at 300DPI approx
    finalCanvas.height = 1650; // 55mm at 300DPI approx
    const ctx = finalCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        img,
        crop.x, crop.y, crop.width, crop.height,
        0, 0, finalCanvas.width, finalCanvas.height
      );
      // Increased quality to 1.0 for high resolution
      onCropSave(finalCanvas.toDataURL('image/jpeg', 1.0));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative border-4 border-white shadow-2xl rounded-2xl overflow-hidden cursor-move touch-none bg-slate-900 group">
        <canvas
          ref={canvasRef}
          width={400}
          height={400 * (1 / ASPECT_RATIO)}
          className="max-w-full h-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={() => setIsDragging(false)}
        />
        
        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200 opacity-90 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => adjustZoom(1.1)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            title="Zoom Out"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <div className="w-px h-6 bg-slate-300"></div>
          <button 
            onClick={() => adjustZoom(0.9)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            title="Zoom In"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-1">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <p className="text-sm font-bold text-slate-700 uppercase tracking-tight">{t.positionCrop}</p>
        </div>
        <p className="text-xs text-[#006a4e] font-medium max-w-xs">{t.alignFaceHint}</p>
        <p className="text-[10px] text-slate-400 mt-2 italic">{lang === 'en' ? 'Drag to move • Tap +/- to adjust zoom' : 'সরানোর জন্য ড্র্যাগ করুন • জুম করতে +/- চাপুন'}</p>
      </div>

      <button
        onClick={handleSave}
        className="w-full max-w-xs py-4 bg-[#006a4e] hover:bg-[#005a42] text-white font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        {t.confirmSelection}
      </button>
    </div>
  );
};

export default PhotoEditor;
