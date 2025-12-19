
export type Language = 'en' | 'bn';

export interface PhotoResult {
  originalUrl: string;
  processedUrl: string | null;
  aspectRatio: number;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  content: string[];
}

export interface Translations {
  title: string;
  subtitle: string;
  uploadBtn: string;
  cameraBtn: string;
  exportBtn: string;
  languageToggle: string;
  requirementsLabel: string;
  requirements: string[];
  processing: string;
  aiFixBackground: string;
  downloadSingle: string;
  downloadA4: string;
  stepUpload: string;
  stepEdit: string;
  stepReview: string;
  stepExport: string;
  positionCrop: string;
  confirmSelection: string;
  recrop: string;
  whiteBg: string;
  autoAdjust: string;
  selectGridCount: string;
  downloadA4Sheet: string;
  photosReadySuffix: string;
  startOver: string;
  privacyFirst: string;
  privacyDesc: string;
  aiPowered: string;
  aiPoweredDesc: string;
  printReady: string;
  printReadyDesc: string;
  footerStandard: string;
  footerRights: string;
  footerDisclaimer: string;
  navAbout: string;
  navPrivacy: string;
  navTerms: string;
  navContact: string;
  navResources: string;
  backToTool: string;
  photoReadyTitle: string;
  photoReadyDesc: string;
  alignFaceHint: string;
  faqTitle: string;
  faqItems: { q: string, a: string }[];
  cookieConsent: string;
  cookieAccept: string;
  blogPosts: BlogPost[];
  // New legal page contents
  aboutContent: string[];
  privacyContent: string[];
  termsContent: string[];
  contactContent: string[];
}
