import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TRANSLATIONS, PASSPORT_WIDTH_MM, PASSPORT_HEIGHT_MM, ASPECT_RATIO } from './constants.ts';
import { Language, PhotoResult, BlogPost } from './types.ts';
import { autoProcessPhotoAI } from './services/geminiService.ts';
import PhotoEditor from './components/PhotoEditor.tsx';
import AdSlot from './components/AdSlot.tsx';
import Logo from './components/Logo.tsx';

type View = 'tool' | 'privacy' | 'terms' | 'about' | 'contact' | 'blog';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('bn');
  const [view, setView] = useState<View>('tool');
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];
  
  const [step, setStep] = useState<'upload' | 'edit' | 'review' | 'export' | 'camera'>('upload');
  const [photo, setPhoto] = useState<PhotoResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoCount, setPhotoCount] = useState<number>(8);
  const [isStickyAdVisible, setIsStickyAdVisible] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShowCookieConsent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view !== 'blog') setSelectedPostIndex(null);
  }, [view, step]);

  const handleCookieAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookieConsent(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const originalUrl = event.target?.result as string;
        setPhoto({ originalUrl, processedUrl: null, aspectRatio: 1 });
        setStep('edit');
        setIsProcessing(false);
        setView('tool');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setStep('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert(lang === 'en' ? "Camera access denied." : "ক্যামেরা অ্যাক্সেস পাওয়া যায়নি।");
      setStep('upload');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto({ originalUrl: dataUrl, processedUrl: null, aspectRatio: 1 });
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setStep('edit');
      }
    }
  };

  const onCropSave = async (croppedUrl: string) => {
    setPhoto(prev => prev ? { ...prev, processedUrl: croppedUrl } : null);
    setStep('review');
    setIsProcessing(true);
    try {
      const processedImage = await autoProcessPhotoAI(croppedUrl);
      if (processedImage) {
        setPhoto(prev => prev ? { ...prev, processedUrl: processedImage } : null);
      }
    } catch (err) {
      console.error("Auto processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerDownload = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSingle = () => {
    if (!photo?.processedUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 531; 
      canvas.height = 650; 
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.98);
      triggerDownload(jpegDataUrl, `BD_Passport_Photo_${Date.now()}.jpg`);
    };
    img.src = photo.processedUrl;
  };

  const downloadA4Grid = () => {
    if (!photo?.processedUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2480; 
      canvas.height = 3508; 
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mmToPx = 11.811; 
      const pw = Math.round(PASSPORT_WIDTH_MM * mmToPx); 
      const ph = Math.round(PASSPORT_HEIGHT_MM * mmToPx); 
      
      const cols = 4;
      const gap = 40; 
      const totalWidthOfPhotos = (cols * pw) + ((cols - 1) * gap);
      const startX = (canvas.width - totalWidthOfPhotos) / 2;
      const startY = 150; 

      for (let k = 0; k < photoCount; k++) {
        const i = k % cols;
        const j = Math.floor(k / cols);
        const x = startX + i * (pw + gap);
        const y = startY + j * (ph + gap);
        ctx.drawImage(img, x, y, pw, ph);
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, pw, ph);
      }
      triggerDownload(canvas.toDataURL('image/jpeg', 0.95), `BD_Passport_A4_Sheet_${photoCount}_${Date.now()}.jpg`);
    };
    img.src = photo.processedUrl;
  };

  const renderTool = () => (
    <>
      <div className="flex justify-between mb-8 px-4">
        {['upload', 'edit', 'review', 'export'].map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              (step === s || (step === 'camera' && s === 'upload')) ? 'bg-[#006a4e] text-white shadow-lg' : 
              'bg-slate-200 text-slate-500'
            }`}>
              {i + 1}
            </div>
            <span className={`text-[10px] uppercase font-bold ${(step === s || (step === 'camera' && s === 'upload')) ? 'text-[#006a4e]' : 'text-slate-400'}`}>
              {s === 'upload' ? t.stepUpload : s === 'edit' ? t.stepEdit : s === 'review' ? t.stepReview : t.stepExport}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
        {step === 'upload' && (
          <div className="text-center w-full max-w-md">
            <Logo size="xl" className="mx-auto mb-6 shadow-2xl shadow-green-100" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.subtitle}</h2>
            <p className="text-slate-500 text-sm mb-8">{lang === 'en' ? "Secure AI tool for official passport photos." : "অফিসিয়াল পাসপোর্ট ছবির জন্য সুরক্ষিত এআই টুল।"}</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-[#006a4e] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#005a42] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                {t.uploadBtn}
              </button>
              <button onClick={startCamera} className="w-full py-4 bg-white border-2 border-[#006a4e] text-[#006a4e] rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {t.cameraBtn}
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" hidden />
            </div>
            <div className="mt-8 text-left bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
               <span className="text-xs font-bold text-red-500 block mb-2">{t.requirementsLabel}</span>
               <ul className="text-[10px] space-y-1 text-slate-500 list-disc list-inside">
                 {t.requirements.map((r, i) => <li key={i}>{r}</li>)}
               </ul>
            </div>
          </div>
        )}

        {step === 'camera' && (
          <div className="w-full flex flex-col items-center">
             <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-2xl overflow-hidden border-4 border-slate-200 shadow-2xl">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-white/30 m-8 rounded-[40%]"></div>
             </div>
             <div className="flex gap-4 mt-8">
                <button onClick={() => setStep('upload')} className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold">Cancel</button>
                <button onClick={capturePhoto} className="px-8 py-3 bg-[#006a4e] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg">
                   <div className="w-4 h-4 bg-white rounded-full"></div>
                   Capture
                </button>
             </div>
             <canvas ref={canvasRef} hidden></canvas>
          </div>
        )}

        {step === 'edit' && photo && (
          <div className="w-full">
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">{t.positionCrop}</h2>
            <PhotoEditor imageUrl={photo.originalUrl} onCropSave={onCropSave} lang={lang} />
          </div>
        )}

        {step === 'review' && (
          <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="relative">
              {photo?.processedUrl ? <img src={photo.processedUrl} className="w-48 h-auto rounded-lg shadow-2xl border-4 border-white" /> : <div className="w-48 h-64 bg-slate-100 animate-pulse rounded-lg" />}
              {isProcessing && <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#006a4e] border-t-transparent rounded-full animate-spin"></div></div>}
            </div>
            <div className="text-center md:text-left space-y-6 max-w-xs">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="text-[#006a4e] font-bold mb-1">{t.photoReadyTitle}</h3>
                <p className="text-xs text-slate-600">{t.photoReadyDesc}</p>
              </div>
              <button onClick={() => setStep('export')} disabled={isProcessing} className="w-full py-4 bg-[#006a4e] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 hover:bg-[#005a42] transition-colors">
                {t.exportBtn} <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              <button onClick={() => setStep('edit')} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">{t.recrop}</button>
            </div>
          </div>
        )}

        {step === 'export' && photo?.processedUrl && (
          <div className="text-center space-y-8 w-full max-w-md">
            <img src={photo.processedUrl} className="w-32 h-auto mx-auto rounded shadow-xl border-2 border-white" />
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.selectGridCount}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[1, 2, 4, 8, 12].map(c => (
                  <button key={c} onClick={() => setPhotoCount(c)} className={`px-4 py-2 rounded-xl font-bold transition-all ${photoCount === c ? 'bg-[#006a4e] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={downloadSingle} className="w-full py-4 bg-white border-2 border-[#006a4e] text-[#006a4e] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">{t.downloadSingle}</button>
              <button onClick={downloadA4Grid} className="w-full py-4 bg-[#006a4e] text-white rounded-2xl font-bold shadow-lg flex flex-col items-center hover:bg-[#005a42] transition-colors">
                 <span>{t.downloadA4Sheet}</span>
                 <span className="text-[10px] opacity-70 uppercase">{photoCount} {t.photosReadySuffix}</span>
              </button>
              <button onClick={() => { setStep('upload'); setPhoto(null); }} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">{t.startOver}</button>
            </div>
            <AdSlot type="rectangle" className="mt-8" />
          </div>
        )}
      </div>

      {step === 'upload' && (
        <div className="mt-12 space-y-8">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="w-2 h-8 bg-[#006a4e] rounded-full"></span>{t.faqTitle}</h2>
              <div className="space-y-6">
                 {t.faqItems.map((f, i) => (
                   <div key={i} className="border-b border-slate-50 pb-6 last:border-0">
                      <h4 className="font-bold text-slate-800 mb-2">Q: {f.q}</h4>
                      <p className="text-sm text-slate-500 pl-4">{f.a}</p>
                   </div>
                 ))}
              </div>
           </div>
           
           <AdSlot type="responsive" />

           <div className="bg-[#006a4e] p-10 rounded-3xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">{lang === 'en' ? 'Need Help?' : 'সাহায্য প্রয়োজন?'}</h2>
                <p className="text-sm opacity-90 max-w-sm mb-6">{lang === 'en' ? 'Read our professional guides on how to take the best passport photo at home.' : 'ঘরে বসে সেরা পাসপোর্ট ছবি তোলার প্রফেশনাল গাইডগুলো পড়ুন।'}</p>
                <button onClick={() => setView('blog')} className="px-6 py-3 bg-white text-[#006a4e] font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-colors">View Resources</button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
           </div>
        </div>
      )}
    </>
  );

  const renderBlog = () => {
    if (selectedPostIndex !== null) {
      const post = t.blogPosts[selectedPostIndex];
      return (
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 min-h-[500px]">
          <div className="flex justify-between items-center mb-10 border-b pb-6">
            <button onClick={() => setSelectedPostIndex(null)} className="flex items-center gap-2 text-[#006a4e] font-bold text-sm hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              {lang === 'en' ? 'Back to Blog List' : 'ব্লগ তালিকায় ফিরুন'}
            </button>
            <button onClick={() => setView('tool')} className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-[#006a4e] transition-colors">{t.backToTool}</button>
          </div>
          
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">{post.title}</h1>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              {post.content.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </article>
          
          <div className="mt-16 pt-8 border-t border-slate-100">
             <AdSlot type="responsive" />
             <div className="flex justify-center mt-12">
                <button onClick={() => setView('tool')} className="px-8 py-3 bg-[#006a4e] text-white font-bold rounded-2xl shadow-xl hover:bg-[#005a42] transition-transform active:scale-95">{t.backToTool}</button>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 min-h-[500px]">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
             <span className="w-2 h-10 bg-[#006a4e] rounded-full"></span>
             {t.navResources}
           </h2>
           <button onClick={() => setView('tool')} className="text-[#006a4e] font-bold text-sm hover:underline flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             {t.backToTool}
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {t.blogPosts.map((post, i) => (
             <div 
               key={i} 
               onClick={() => setSelectedPostIndex(i)}
               className="group cursor-pointer bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#006a4e] hover:bg-white transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
             >
               <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-[#006a4e] transition-colors leading-snug">{post.title}</h3>
               <p className="text-slate-500 text-xs mb-6 flex-grow leading-relaxed line-clamp-3">{post.excerpt}</p>
               <div className="flex items-center gap-2 text-[#006a4e] font-bold text-[10px] uppercase tracking-widest mt-auto border-t pt-4">
                 {lang === 'en' ? 'Read Full Article' : 'পুরো আর্টিকেল পড়ুন'}
                 <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </div>
             </div>
           ))}
        </div>
        
        <div className="mt-16">
          <AdSlot type="responsive" />
        </div>
      </div>
    );
  };

  const renderInfoPage = (title: string, content: string[]) => (
    <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 min-h-[500px]">
      <button onClick={() => setView('tool')} className="mb-6 flex items-center gap-2 text-[#006a4e] font-bold text-sm hover:underline">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        {t.backToTool}
      </button>
      <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
        {content.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <AdSlot type="responsive" className="mt-12" />
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${isStickyAdVisible ? 'pb-24 sm:pb-32' : ''}`}>
      <header className="bg-white border-b sticky top-0 z-[60] px-4 py-3 sm:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button onClick={() => { setView('tool'); setStep('upload'); }} className="flex items-center gap-3">
            <Logo size="md" />
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">{t.title}</h1>
          </button>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
               <button onClick={() => setView('about')} className={`hover:text-[#006a4e] transition-colors ${view === 'about' ? 'text-[#006a4e] font-bold' : ''}`}>{t.navAbout}</button>
            </nav>
            <button onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')} className="px-4 py-2 border-2 border-slate-100 rounded-full text-sm font-bold active:bg-slate-50 transition-colors">{t.languageToggle}</button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full p-4 sm:p-8">
        <AdSlot type="responsive" className="mb-8" />
        
        {view === 'tool' ? renderTool() : null}
        {view === 'blog' ? renderBlog() : null}
        {view === 'privacy' && renderInfoPage(t.navPrivacy, t.privacyContent)}
        {view === 'about' && renderInfoPage(t.navAbout, t.aboutContent)}
        {view === 'terms' && renderInfoPage(t.navTerms, t.termsContent)}
        {view === 'contact' && renderInfoPage(t.navContact, t.contactContent)}
        
        <AdSlot type="responsive" className="mt-12" />
      </main>

      <footer className="bg-slate-900 text-slate-500 py-16 px-4 mt-12 text-center text-[10px] uppercase tracking-widest font-bold">
        <div className="max-w-6xl mx-auto space-y-10">
           <div className="flex flex-wrap justify-center gap-8">
              <button onClick={() => setView('blog')} className="hover:text-white transition-colors">{t.navResources}</button>
              <button onClick={() => setView('about')} className="hover:text-white transition-colors">{t.navAbout}</button>
              <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">{t.navPrivacy}</button>
              <button onClick={() => setView('terms')} className="hover:text-white transition-colors">{t.navTerms}</button>
              <button onClick={() => setView('contact')} className="hover:text-white transition-colors">{t.navContact}</button>
           </div>
           <div className="max-w-2xl mx-auto opacity-30 text-[8px] normal-case leading-relaxed">
             {t.footerStandard} • {t.footerDisclaimer}
           </div>
           <p className="opacity-40">{t.footerRights}</p>
        </div>
      </footer>
      
      {isStickyAdVisible && <AdSlot type="sticky-bottom" onClose={() => setIsStickyAdVisible(false)} />}
      
      {showCookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 md:max-w-sm bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-[1000] flex flex-col gap-4 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
               <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" />
               </svg>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">{t.cookieConsent}</p>
          </div>
          <button onClick={handleCookieAccept} className="w-full py-3 bg-green-600 hover:bg-green-500 font-bold rounded-xl text-sm transition-colors">{t.cookieAccept}</button>
        </div>
      )}
    </div>
  );
};

export default App;