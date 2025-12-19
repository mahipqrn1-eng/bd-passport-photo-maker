
import { Translations } from './types';

export const PASSPORT_WIDTH_MM = 45;
export const PASSPORT_HEIGHT_MM = 55;
export const ASPECT_RATIO = PASSPORT_WIDTH_MM / PASSPORT_HEIGHT_MM;

export const TRANSLATIONS: Record<'en' | 'bn', Translations> = {
  en: {
    title: "BD Passport Photo Maker",
    subtitle: "Create official 45mm x 55mm passport photos instantly",
    uploadBtn: "Upload Photo",
    cameraBtn: "Take Photo",
    exportBtn: "Proceed to Export",
    languageToggle: "বাংলা",
    requirementsLabel: "Required Specifications:",
    requirements: [
      "White or off-white background",
      "Neutral expression (no smile)",
      "Eyes open and visible",
      "No glasses or headwear",
      "Face centered (70-80% of photo)",
      "Arms at sides (not crossed)",
      "Head-and-shoulders only (no half-body)",
      "Solid color clothing preferred"
    ],
    processing: "AI Auto-Enhancing...",
    aiFixBackground: "AI Background Fix",
    downloadSingle: "Download Single (JPG)",
    downloadA4: "Download A4 Grid",
    stepUpload: "Upload",
    stepEdit: "Edit",
    stepReview: "Review",
    stepExport: "Export",
    positionCrop: "Position and Crop",
    confirmSelection: "Confirm Selection",
    recrop: "Re-crop",
    whiteBg: "White BG",
    autoAdjust: "Auto Adjust Lighting",
    selectGridCount: "Select Grid Count",
    downloadA4Sheet: "Download A4 Sheet",
    photosReadySuffix: "Photos Ready to Print",
    startOver: "Start Over",
    privacyFirst: "Privacy First",
    privacyDesc: "Photos are processed securely and never stored permanently on our servers.",
    aiPowered: "AI Powered",
    aiPoweredDesc: "Deep learning models ensure your photo meets exact DIP requirements.",
    printReady: "Print Ready",
    printReadyDesc: "Export in high-resolution A4 grid format suitable for immediate printing.",
    footerStandard: "Bangladesh Department of Immigration & Passports (DIP) Official Standard Tool",
    footerRights: "© 2024 BD Passport Photo Maker. Not an official government app.",
    footerDisclaimer: "Disclaimer: Final acceptance depends on relevant immigration authorities.",
    navAbout: "About Us",
    navPrivacy: "Privacy Policy",
    navTerms: "Terms",
    navContact: "Contact",
    navResources: "Blog & Resources",
    backToTool: "Back to Tool",
    photoReadyTitle: "Photo Ready!",
    photoReadyDesc: "AI has successfully enhanced your portrait. You can now proceed to export.",
    alignFaceHint: "Align face within guides (Head at top, Chin at bottom marker)",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      { q: "What is the official size for BD Passport photo?", a: "The official size is 45mm width by 55mm height." },
      { q: "Can I wear glasses in the photo?", a: "No, glasses must be removed for Bangladeshi passport photos as per DIP guidelines." },
      { q: "Is this tool free to use?", a: "Yes, our AI-powered passport photo maker is 100% free for everyone." }
    ],
    cookieConsent: "We use cookies to improve your experience and show personalized ads via Google AdSense.",
    cookieAccept: "Got it!",
    aboutContent: [
      "Welcome to BD Passport Photo Maker, the premier online utility designed specifically for Bangladeshi citizens. Our mission is to simplify the process of creating document-ready photographs using cutting-edge Artificial Intelligence.",
      "We understand that visiting a professional studio can be time-consuming. That's why we built this tool—to empower you to capture a high-quality portrait at home and transform it into an official 45x55mm passport photo in seconds.",
      "Our technology uses Google Gemini AI for advanced background segmentation and image enhancement, ensuring your photo meets the strict requirements set by the Department of Immigration & Passports (DIP) of Bangladesh.",
      "As a community-driven project, we provide this service 100% free of charge. We are committed to maintaining the highest standards of digital privacy and utility for all our users."
    ],
    privacyContent: [
      "At BD Passport Photo Maker, we take your privacy seriously. This policy outlines how we handle your data when you use our service.",
      "1. Image Processing: All photos uploaded to our platform are processed ephemerally. This means your image is analyzed by our AI in temporary memory and is never saved to a permanent database. Once you close your browser tab, the data is gone.",
      "2. No Data Collection: We do not collect names, addresses, or any personally identifiable information (PII) other than the temporary image required for the tool to function.",
      "3. Google AdSense & Cookies: We use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt-out of personalized advertising by visiting Google's Ad Settings.",
      "4. Third-Party Links: Our site may contain links to government portals (like DIP). We are not responsible for the privacy practices of external sites."
    ],
    termsContent: [
      "By accessing or using BD Passport Photo Maker, you agree to comply with and be bound by the following terms and conditions.",
      "1. Use of Service: This tool is intended for personal, non-commercial use. You may use it to generate passport-sized photos for your own applications.",
      "2. Compliance: While we strive to meet all official DIP guidelines (45x55mm, white background), the final acceptance of the photo rests solely with the immigration authorities. We do not guarantee acceptance.",
      "3. Disclaimer of Liability: We are not responsible for any delays, rejections, or costs incurred due to the use of photos generated by this tool.",
      "4. Prohibited Acts: You may not use this tool for fraudulent purposes, nor may you attempt to disrupt our servers or reverse-engineer our software."
    ],
    contactContent: [
      "We value your feedback and questions. If you encounter any issues with the tool or have suggestions for improvement, please reach out to us.",
      "Email: support@bdpassportphoto.ai",
      "Mailing Address: Dhaka, Bangladesh (Digital Service Hub)",
      "Our team typically responds within 48-72 business hours. For immediate help regarding passport applications, please visit the official DIP website at passport.gov.bd."
    ],
    blogPosts: [
      {
        title: "How to Take a Perfect Passport Photo at Home",
        excerpt: "A complete guide on lighting, camera positioning, and clothing for home photography.",
        content: [
          "Taking a passport photo at home can save you money and time. To get started, you need a room with good natural light, preferably facing a window.",
          "Position yourself about 3 feet away from a plain wall. Use a tripod or have someone take the photo at eye level.",
          "Ensure your face is evenly lit with no harsh shadows on one side. Wear dark, solid-colored clothing to create a good contrast with the white background.",
          "Our tool will handle the background removal and sizing automatically once you upload your portrait."
        ]
      },
      {
        title: "Top 5 Reasons for Passport Photo Rejection",
        excerpt: "Common mistakes to avoid when submitting photos to the Bangladesh Passport Office.",
        content: [
          "1. Incorrect Background: The background must be pure white. Shadows or textures will lead to rejection.",
          "2. Glasses and Headwear: These are strictly prohibited unless for medical or religious reasons (with clear visibility).",
          "3. Poor Lighting: Overexposed or dark photos make facial features hard to distinguish.",
          "4. Head Size: The face should occupy 70-80% of the frame. Manual cropping often fails this requirement.",
          "5. Expressions: A neutral face is required. Smiling or showing teeth is not allowed."
        ]
      },
      {
        title: "The Ultimate Background and Lighting Guide",
        excerpt: "Understand why pure white background and even lighting are critical for success.",
        content: [
          "The Bangladesh e-Passport system uses automated facial recognition technology. This tech works best when the contrast between the subject and the background is sharp.",
          "Avoid using flash directly on the face as it creates 'hot spots'. Instead, use two lights at 45-degree angles or stand near a window with sheer curtains.",
          "If your wall isn't pure white, don't worry—our AI is designed to replace your background with a standard studio-grade #FFFFFF white accurately.",
          "Remember: Shadows behind the head are a common cause of rejection. Stand a bit away from the wall to minimize them."
        ]
      },
      {
        title: "Clothing and Appearance Rules for BD Passport",
        excerpt: "What to wear and how to style your hair to ensure your photo is accepted.",
        content: [
          "Clothing Choice: Avoid white or light-colored shirts as they blend into the background. Dark blue, black, or deep green work best.",
          "Hair and Hijab: Your face must be clearly visible from the forehead to the chin. If you wear a hijab, ensure it doesn't cast shadows on your face and your hairline (or forehead) is visible.",
          "Jewelry: Keep it minimal. Large earrings or shiny necklaces can cause light reflections that interfere with AI scanning.",
          "Make-up: Natural make-up is fine, but avoid heavy contouring that changes your facial structure or shiny lip gloss."
        ]
      },
      {
        title: "Digital vs. Printed: Requirements for e-Passport",
        excerpt: "Detailed breakdown of the digital file specifications needed for online application.",
        content: [
          "When applying online at passport.gov.bd, you need a digital file. The resolution must be high enough to show clear details (300 DPI recommended).",
          "The file size should usually be under 450KB for most government portals, but the quality must remain high.",
          "Our 'Download Single' option provides a perfectly sized JPG with the correct aspect ratio (3:4 converted to 45x55mm) for online uploads.",
          "For physical submission, use our 'A4 Sheet' download, which arranges your photos for standard 4R or A4 photo paper printing."
        ]
      }
    ]
  },
  bn: {
    title: "বাংলাদেশ পাসপোর্ট ছবি মেকার",
    subtitle: "তাত্ক্ষণিকভাবে অফিসিয়াল ৪৫ মিমি x ৫৫ মিমি পাসপোর্ট ছবি তৈরি করুন",
    uploadBtn: "ছবি আপলোড করুন",
    cameraBtn: "ছবি তুলুন",
    exportBtn: "এক্সপোর্টে যান",
    languageToggle: "English",
    requirementsLabel: "প্রয়োজনীয় বিশেষ উল্লেখ:",
    requirements: [
      "সাদা বা অফ-হোয়াইট ব্যাকগ্রাউন্ড",
      "নিরপেক্ষ অভিব্যক্তি (হাসি নেই)",
      "চোখ খোলা এবং দৃশ্যমান",
      "চশমা বা টুপি নেই",
      "মুখের অবস্থান কেন্দ্রে (ছবির ৭০-৮০%)",
      "হাত শরীরের দুই পাশে থাকতে হবে (ক্রস করা যাবে না)",
      "শুধুমাত্র মাথা ও কাঁধের অংশ (অর্ধেক শরীর নয়)",
      "এক রঙের পোশাক পরিধান করা ভালো"
    ],
    processing: "এআই অটো-এনহ্যান্সিং হচ্ছে...",
    aiFixBackground: "এআই ব্যাকগ্রাউন্ড ঠিক করুন",
    downloadSingle: "একটি ছবি ডাউনলোড (JPG)",
    downloadA4: "A4 গ্রিড ডাউনলোড",
    stepUpload: "আপলোড",
    stepEdit: "এডিট",
    stepReview: "রিভিউ",
    stepExport: "এক্সপোর্ট",
    positionCrop: "অবস্থান এবং ক্রপ",
    confirmSelection: "সিলেকশন নিশ্চিত করুন",
    recrop: "আবার ক্রপ করুন",
    whiteBg: "সাদা ব্যাকগ্রাউন্ড",
    autoAdjust: "অটো লাইটিং অ্যাডজাস্ট",
    selectGridCount: "ছবির সংখ্যা নির্বাচন করুন",
    downloadA4Sheet: "A4 শিট ডাউনলোড করুন",
    photosReadySuffix: "টি ছবি প্রিন্টের জন্য প্রস্তুত",
    startOver: "আবার শুরু করুন",
    privacyFirst: "গোপনীয়তা রক্ষা",
    privacyDesc: "ছবিগুলো সুরক্ষিতভাবে প্রসেস করা হয় এবং কখনোই আমাদের সার্ভারে স্থায়ীভাবে সংরক্ষণ করা হয় না।",
    aiPowered: "এআই চালিত",
    aiPoweredDesc: "ডিপ লার্নিং মডেল নিশ্চিত করে যে আপনার ছবি সঠিক ডিআইপি প্রয়োজনীয়তা পূরণ করে।",
    printReady: "প্রিন্টের জন্য প্রস্তুত",
    printReadyDesc: "তাত্ক্ষণিক প্রিন্টিংয়ের জন্য উপযুক্ত উচ্চ-রেজোলিউশন A4 গ্রিড ফরম্যাটে এক্সপোর্ট করুন।",
    footerStandard: "বাংলাদেশ ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর (DIP) অফিসিয়াল স্ট্যান্ডার্ড টুল",
    footerRights: "© ২০২৪ বিডি পাসপোর্ট ফটো মেকার। এটি কোনো অফিসিয়াল সরকারি অ্যাপ নয়।",
    footerDisclaimer: "সতর্কবার্তা: ছবির চূড়ান্ত গ্রহণযোগ্যতা সংশ্লিষ্ট ইমিগ্রেশন কর্তৃপক্ষের ওপর নির্ভর করে।",
    navAbout: "আমাদের সম্পর্কে",
    navPrivacy: "গোপনীয়তা নীতি",
    navTerms: "ব্যবহারের শর্তাবলী",
    navContact: "যোগাযোগ",
    navResources: "ব্লগ ও রিসোর্স",
    backToTool: "টুল এ ফিরে যান",
    photoReadyTitle: "ছবি প্রস্তুত!",
    photoReadyDesc: "AI আপনার ছবিটিকে সফলভাবে উন্নত করেছে। আপনি এখন এক্সপোর্ট করতে পারেন।",
    alignFaceHint: "গাইডের মধ্যে মুখ সেট করুন (মাথা ওপরের এবং চিবুক নিচের দাগে মেলান)",
    faqTitle: "সচরাচর জিজ্ঞাস্য প্রশ্নাবলী",
    faqItems: [
      { q: "বাংলাদেশি পাসপোর্টের ছবির সঠিক সাইজ কত?", a: "অফিসিয়াল সাইজ হলো ৪৫ মিমি প্রস্থ এবং ৫৫ মিমি উচ্চতা।" },
      { q: "আমি কি চশমা পরে ছবি তুলতে পারি?", a: "না, ডিআইপি গাইডলাইন অনুযায়ী চশমা পরে ছবি তোলা অনুমোদিত নয়।" },
      { q: "এই টুলটি কি ব্যবহারের জন্য টাকা লাগবে?", a: "না, এটি সম্পূর্ণ ফ্রি এবং এআই চালিত একটি সার্ভিস।" }
    ],
    cookieConsent: "আমরা আপনার অভিজ্ঞতা উন্নত করতে এবং গুগল অ্যাডসেন্সের মাধ্যমে বিজ্ঞাপন দেখাতে কুকিজ ব্যবহার করি।",
    cookieAccept: "ঠিক আছে!",
    aboutContent: [
      "বিডি পাসপোর্ট ফটো মেকার-এ আপনাকে স্বাগতম। এটি বাংলাদেশি নাগরিকদের জন্য বিশেষভাবে তৈরি একটি অনলাইন টুল। আমাদের লক্ষ্য হলো কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহার করে পাসপোর্ট সাইজ ছবি তৈরির প্রক্রিয়াকে সহজ করা।",
      "আমরা জানি যে স্টুডিওতে যাওয়া সময়ের ব্যাপার। তাই আমরা এই টুলটি তৈরি করেছি যাতে আপনি ঘরে বসেই আপনার ছবি তুলে সেটিকে ৪৫x৫৫ মিমি অফিশিয়াল সাইজে রূপান্তর করতে পারেন।",
      "আমাদের টুলটি গুগলের জেমিনি এআই ব্যবহার করে ব্যাকগ্রাউন্ড রিমুভ এবং ছবির মান উন্নত করে, যা বাংলাদেশ পাসপোর্ট অধিদপ্তরের (DIP) নিয়মাবলী মেনে তৈরি করা হয়।"
    ],
    privacyContent: [
      "বিডি পাসপোর্ট ফটো মেকার আপনার গোপনীয়তাকে সম্মান করে। আমরা কিভাবে আপনার তথ্য পরিচালনা করি তা নিচে দেওয়া হলো:",
      "১. ইমেজ প্রসেসিং: আমাদের প্ল্যাটফর্মে আপলোড করা ছবিগুলো সাময়িকভাবে প্রসেস করা হয়। আপনার ছবি কোনো স্থায়ী সার্ভারে জমা রাখা হয় না। ব্রাউজার ট্যাব বন্ধ করার সাথে সাথে ডেটা মুছে যায়।",
      "২. তথ্য সংগ্রহ: টুলটি চালানোর জন্য প্রয়োজনীয় সাময়িক ছবি ছাড়া আমরা নাম, ঠিকানা বা অন্য কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না।"
    ],
    termsContent: [
      "বিডি পাসপোর্ট ফটো মেকার ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে নিতে সম্মত হচ্ছেন:",
      "১. সেবার ব্যবহার: এই টুলটি শুধুমাত্র ব্যক্তিগত কাজের জন্য ব্যবহারযোগ্য। কোনো বাণিজ্যিক কাজে এটি ব্যবহার করা যাবে না।",
      "২. গ্রহণযোগ্যতা: আমরা ডিআইপি গাইডলাইন (৪৫x৫৫ মিমি, সাদা ব্যাকগ্রাউন্ড) মেনে ছবি তৈরির চেষ্টা করি, তবে ছবির চূড়ান্ত গ্রহণযোগ্যতা পাসপোর্ট অফিসের ওপর নির্ভর করে।"
    ],
    contactContent: [
      "আপনার কোনো প্রশ্ন বা মতামত থাকলে আমাদের সাথে যোগাযোগ করুন।",
      "ইমেইল: support@bdpassportphoto.ai",
      "ঠিকানা: ঢাকা, বাংলাদেশ (ডিজিটাল সার্ভিস হাব)"
    ],
    blogPosts: [
      {
        title: "কিভাবে ঘরে বসেই পারফেক্ট পাসপোর্ট ছবি তুলবেন?",
        excerpt: "আলোর ব্যবস্থা, ক্যামেরার অবস্থান এবং পোশাক নির্বাচনের একটি পূর্ণাঙ্গ গাইড।",
        content: [
          "ঘরে পাসপোর্ট ছবি তোলা আপনার সময় এবং টাকা দুই-ই বাঁচাতে পারে। এর জন্য প্রথমেই এমন একটি ঘর বেছে নিন যেখানে পর্যাপ্ত প্রাকৃতিক আলো রয়েছে।",
          "দেয়াল থেকে অন্তত ৩ ফুট দূরত্বে দাঁড়ান। ট্রাইপড ব্যবহার করুন অথবা অন্য কাউকে দিয়ে চোখের লেভেলে ছবি তুলুন।",
          "নিশ্চিত করুন যে আপনার মুখে কোনো ছায়া পড়ছে না। সাদা ব্যাকগ্রাউন্ডের সাথে কন্ট্রাস্ট তৈরির জন্য গাঢ় এক রঙের পোশাক পরুন।"
        ]
      },
      {
        title: "পাসপোর্ট ছবি বাতিলের প্রধান ৫টি কারণ",
        excerpt: "বাংলাদেশ পাসপোর্ট অফিসে ছবি জমা দেওয়ার সময় যে ভুলগুলো এড়িয়ে চলবেন।",
        content: [
          "১. ভুল ব্যাকগ্রাউন্ড: ব্যাকগ্রাউন্ড অবশ্যই একদম সাদা হতে হবে। কোনো ছায়া বা ডিজাইন থাকলে ছবি বাতিল হবে।",
          "২. চশমা এবং টুপি: ছবি তোলার সময় চশমা বা টুপি ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।",
          "৩. অপর্যাপ্ত আলো: অনেক বেশি উজ্জ্বল বা অন্ধকার ছবি গ্রহণ করা হয় না।",
          "৪. মুখমন্ডলের অবস্থান: ছবিতে মুখ অবশ্যই কেন্দ্রের ৭০-৮০% অংশ জুড়ে থাকতে হবে।",
          "৫. অভিব্যক্তি: ছবিতে হাসি বা দাঁত দেখা গেলে সেই ছবি পাসপোর্ট অফিস গ্রহণ করবে না।"
        ]
      },
      {
        title: "ব্যাকগ্রাউন্ড এবং লাইটিং গাইড",
        excerpt: "কেন ছবির ব্যাকগ্রাউন্ড এবং আলো সঠিক হওয়া জরুরি তা জানুন।",
        content: [
          "বাংলাদেশ ই-পাসপোর্ট সিস্টেমে অটোমেটেড ফেস রিকগনিশন প্রযুক্তি ব্যবহার করা হয়। এই প্রযুক্তি তখনই ভালো কাজ করে যখন ছবি এবং ব্যাকগ্রাউন্ডের মধ্যে স্পষ্ট পার্থক্য থাকে।",
          "সরাসরি মুখের ওপর ফ্ল্যাশ ব্যবহার করবেন না, এতে মুখে সাদা দাগ তৈরি হতে পারে। জানালার পাশে দাঁড়িয়ে প্রাকৃতিক আলোতে ছবি তোলা সবচেয়ে ভালো।",
          "আপনার দেয়াল যদি পুরোপুরি সাদা নাও হয়, চিন্তা নেই—আমাদের এআই টুল আপনার ব্যাকগ্রাউন্ডকে নিখুঁত স্টুডিও গ্রেড সাদা রঙে পরিবর্তন করে দেবে।"
        ]
      },
      {
        title: "পাসপোর্ট ছবির জন্য পোশাক এবং সাজসজ্জা",
        excerpt: "পাসপোর্ট ছবি তোলার সময় কি ধরণের পোশাক এবং লুক রাখবেন তার টিপস।",
        content: [
          "পোশাক নির্বাচন: সাদা বা হালকা রঙের পোশাক এড়িয়ে চলুন কারণ এটি ব্যাকগ্রাউন্ডের সাথে মিশে যেতে পারে। নেভি ব্লু, কালো বা গাঢ় সবুজ রঙের পোশাক সবচেয়ে ভালো।",
          "চুল এবং হিজাব: কপাল থেকে চিবুক পর্যন্ত পুরো মুখমন্ডল পরিষ্কার দেখা যেতে হবে। হিজাব পরলে নিশ্চিত করুন যে এটি কপালে বা মুখে কোনো ছায়া ফেলছে না।",
          "অলংকার: বড় দুল বা চকচকে হার এড়িয়ে চলুন। এগুলো আলোর প্রতিফলন ঘটিয়ে ছবির মানে সমস্যা করতে পারে।"
        ]
      },
      {
        title: "ডিজিটাল বনাম প্রিন্টেড: ই-পাসপোর্টের নিয়মাবলী",
        excerpt: "অনলাইন আবেদনের জন্য ডিজিটাল ফাইল এবং প্রিন্ট করার সঠিক নিয়ম জানুন।",
        content: [
          "অনলাইনে আবেদনের জন্য একটি ডিজিটাল ফাইলের প্রয়োজন হয়। ছবির রেজোলিউশন অবশ্যই হাই (৩০০ ডিপিআই) হতে হবে।",
          "আমাদের 'Download Single' অপশনটি আপনাকে সঠিক সাইজের (৪৫x৫৫ মিমি) জেপিজি ফাইল দেবে যা অনলাইন আপলোডের জন্য উপযুক্ত।",
          "ছবি প্রিন্ট করার জন্য আমাদের 'A4 Sheet' অপশনটি ব্যবহার করুন, যা একটি এ৪ কাগজে আপনার অনেকগুলো ছবি সুন্দরভাবে সাজিয়ে দেবে।"
        ]
      }
    ]
  }
};
