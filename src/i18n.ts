import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      header: {
        title: "Doctor Uncle",
        subtitle: "AI Health Assistant",
      },
      index: {
        assessmentReady: "Your Assessment is Ready",
        assessmentBasedOn: "Based on our conversation about \"{{symptom}}\", here's what I found...",
        disclaimer: "💚 Take care of yourself! Remember, Doctor Uncle is here to guide you, but always seek professional medical advice for serious concerns."
      },
      symptomInput: {
        greetingTitle: "Hello! I'm Doctor Uncle",
        greetingDesc: "Tell me what's bothering you today. Describe your symptoms in your own words, and I'll ask some follow-up questions to help you better.",
        placeholder: "Describe your symptoms... (e.g., 'I've had a headache for 2 days')",
        pressEnter: "Press Enter to send",
        startAssessment: "Start Assessment",
        commonSymptoms: "Common symptoms",
        quick: {
          headache: "Headache",
          soreThroat: "Sore throat",
          stomachPain: "Stomach pain",
          fever: "Fever",
          backPain: "Back pain",
          cough: "Cough"
        },
        disclaimer: "⚠️ This is for informational purposes only. Always consult a healthcare professional for medical advice, diagnosis, or treatment."
      },
      triage: {
        possibleCauses: "Possible Causes",
        mildTitle: "Mild Concern",
        mildDesc: "Your symptoms appear manageable with home care",
        moderateTitle: "Moderate Concern",
        moderateDesc: "Consider seeing a doctor if symptoms persist",
        severeTitle: "Urgent Concern",
        severeDesc: "Please seek medical attention promptly"
      },
      nextSteps: {
        title: "Next Steps",
        subtitle: "Follow these steps for the best recovery",
        startNew: "Start New Assessment"
      },
      questionFlow: {
        placeholder: "Type your answer..."
      },
      medicine: {
        title: "OTC Medicines",
        subtitle: "Over-the-counter medications that may help",
        disclaimer: "⚠️ Always read labels and consult a pharmacist if unsure"
      },
      homeRemedies: {
        title: "Home Remedies",
        subtitle: "Natural ways to feel better at home"
      },
      specialist: {
        title: "Specialist Recommendation"
      },
      intake: {
        askName: "👋 Hello! I'm Doctor Uncle. \n\nI'll help you understand your symptoms by asking a few simple questions. \n\nThis assessment is for informational purposes and doesn't replace a licensed doctor. \n\nBefore we begin, what should I call you?",
        placeholderName: "Enter your full name (e.g., Rahul Ahmed)...",
        askAge: "Nice to meet you, {{name}}! How old are you?",
        placeholderAge: "Enter your age in years...",
        ageOptions: ["18-30", "31-45", "46-60", "Over 60"],
        askGender: "What is your gender?",
        genderOptions: ["Male", "Female", "Other", "Prefer not to say"],
        askSymptom: "Thank you, {{name}}. Now please describe what health problem or symptoms you are experiencing in detail.",
        placeholderSymptom: "Describe symptoms in detail... (e.g., 'I've had severe headache and fever for 2 days')",
        niceToMeetYou: "Nice to meet you, {{name}}! 😊\n\nCould you describe what health problem you're experiencing today?",
        askAgeConversational: "Thank you for explaining that. To better understand your condition, I'd like to ask a few quick questions.\n\nHow old are you?",
        emergencyWarning: "⚠️ These symptoms may require immediate medical attention. \n\nPlease contact your nearest emergency service or visit the nearest hospital immediately."
      },
      boolean: {
        yes: "Yes",
        no: "No"
      },
      validation: {
        invalidName: "I'm sorry, that name seems invalid. Could you please share a valid name? (minimum 2 characters, letters only)",
        invalidSymptom: "Could you describe your symptoms in a little more detail? (minimum 10 characters)",
        invalidAge: "Please enter a valid age between 0 and 120.",
        invalidGender: "Please select one of the available options."
      },
      landingPage: {
        badge: "AI TRIAGE FOR FAMILIES",
        title: "Your Trusted 'Doctor Uncle' – Now AI Powered",
        subtitle: "Get early medical triage and guided advice from the comfort of your home, anytime you need it.",
        ctaButton: "Let's Chat With Doctor Uncle",
        traditionTitle: "The Tradition of Care",
        traditionText: "In every Bangladeshi family, there is a 'Doctor Uncle'—that one relative everyone calls first when a child has a fever or an elder feels unwell. We bring that same warmth, patience, and wisdom to your phone.",
        traditionQuote: "\"Uncle, little Rahul has a cough...\" We listen just like family would, but with the precision of advanced AI medical logic.",
        howItWorksTitle: "How it works",
        step1Title: "Tell us how you feel",
        step1Desc: "Describe symptoms in your own words, just like a casual conversation.",
        step2Title: "Answer guided questions",
        step2Desc: "Doctor Uncle will ask specific follow-ups to understand the severity.",
        step3Title: "Get structured advice",
        step3Desc: "Receive clear OTC suggestions, specialist needs, or emergency alerts.",
        bannerTag: "Clinical logic. Family warmth.",
        disclaimerTitle: "MEDICAL DISCLAIMER",
        disclaimerText: "Doctor Uncle AI is a decision support tool for triage. It is not a replacement for a professional medical consultation, diagnosis, or treatment. In case of a life-threatening emergency, please visit the nearest hospital immediately.",
        nav: {
          home: "Home",
          triage: "Check Up",
          history: "History",
          profile: "Profile"
        },
        footer: {
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          disclaimer: "AI Disclaimer",
          contact: "Contact Support"
        }
      },
      aiMessages: {
        greetings: [
          "Hello there! I'm Doctor Uncle, your friendly health assistant. \uD83D\uDC68\u200D\u2695\uFE0F",
          "Don't worry, you're in good hands. Let me ask you a few questions to better understand how you're feeling.",
          "Remember, I'm here to guide you – but always consult a real doctor for serious concerns!"
        ],
        closing: [
          "Based on our conversation, I've prepared a comprehensive assessment for you.",
          "Remember, this is guidance only. If you feel your condition is serious, please seek immediate medical attention.",
          "Take care of yourself! Your health is your greatest wealth. \uD83D\uDC9A"
        ],
        analyzing: "Thank you. I am analyzing your responses with my medical database to generate a detailed assessment...",
        errors: {
          connectionTitle: "Connection Error",
          connectionDesc: "Failed to connect to Doctor Uncle AI Backend. Make sure your local server is running.",
          diagnosisTitle: "Diagnosis Error",
          diagnosisDesc: "Could not retrieve diagnosis from backend."
        }
      },
      chatPage: {
        patientLabel: "Patient",
        yrs: "yrs"
      },
      historyPage: {
        title: "Assessment History",
        backToHistory: "Back to History",
        downloadPdf: "Download PDF",
        delete: "Delete",
        cancel: "Cancel",
        clearAll: "Clear all",
        deleteTitle: "Delete assessment?",
        deleteDesc: "This will permanently remove {{name}}'s assessment from history. This action cannot be undone.",
        deleteDescGeneric: "This will permanently remove this assessment record. This action cannot be undone.",
        clearTitle: "Clear all history?",
        clearDesc: "This will permanently delete all {{count}} assessment records. This cannot be undone.",
        assessmentReport: "Assessment Report",
        chiefComplaint: "Chief complaint",
        yrs: "yrs",
        viewDetails: "View details",
        deleteRecord: "Delete record",
        unknown: "Unknown",
        noRecordsTitle: "No assessments yet",
        noRecordsDesc: "Completed assessments will appear here for future reference.",
        startAssessment: "Start an Assessment"
      }
    }
  },
  bn: {
    translation: {
      header: {
        title: "ডাক্তার আঙ্কেল",
        subtitle: "এআই স্বাস্থ্য সহকারী",
      },
      landingPage: {
        badge: "পরিবারের জন্য এআই ট্রায়াজ",
        title: "আপনার বিশ্বস্ত 'ডাক্তার আঙ্কেল' – এখন এআই চালিত",
        subtitle: "আপনার প্রয়োজন অনুযায়ী যেকোনো সময়, নিজ ঘরের স্বাচ্ছন্দ্যে প্রাথমিক চিকিৎসা ট্রায়াজ এবং নির্দেশিত পরামর্শ পান।",
        ctaButton: "ডাক্তার আঙ্কেলের সাথে চ্যাট করুন",
        traditionTitle: "সেবার ঐতিহ্য",
        traditionText: "প্রতিটি বাংলাদেশি পরিবারেই একজন 'ডাক্তার আঙ্কেল' থাকেন—যে আত্মীয়কে শিশু থেকে বয়স্ক কারোর জ্বর বা অসুস্থতায় সবাই প্রথমে কল দেন। আমরা আপনার ফোনে সেই একই উষ্ণতা, ধৈর্য এবং জ্ঞান নিয়ে এসেছি।",
        traditionQuote: "\"আঙ্কেল, ছোট রাহুলের কাশি হয়েছে...\" পরিবারের মতোই আমরা আপনার কথা শুনি, তবে উন্নত এআই মেডিকেল লজিকের নিখুঁততার সাথে।",
        howItWorksTitle: "এটি যেভাবে কাজ করে",
        step1Title: "আপনি কেমন বোধ করছেন তা বলুন",
        step1Desc: "একটি স্বাভাবিক কথোপকথনের মতোই আপনার নিজের ভাষায় উপসর্গ বর্ণনা করুন।",
        step2Title: "নির্দেশিত প্রশ্নের উত্তর দিন",
        step2Desc: "তীব্রতা ও অবস্থা বুঝতে ডাক্তার আঙ্কেল নির্দিষ্ট ফলো-আপ প্রশ্ন করবেন।",
        step3Title: "কাঠামোগত পরামর্শ পান",
        step3Desc: "স্পষ্ট ওভার-দ্য-কাউন্টার (OTC) ওষুধের পরামর্শ, বিশেষজ্ঞের প্রয়োজনীয়তা বা জরুরি সতর্কতা পান।",
        bannerTag: "মেডিকেল লজিক। পারিবারিক উষ্ণতা।",
        disclaimerTitle: "মেডিকেল ডিসক্লেইমার",
        disclaimerText: "ডাক্তার আঙ্কেল এআই ট্রায়াজের জন্য একটি সিদ্ধান্ত সহায়তা টুল। এটি পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। জীবনঘাতী জরুরি পরিস্থিতিতে অনুগ্রহ করে অবিলম্বে নিকটস্থ হাসপাতালে যোগাযোগ করুন।",
        nav: {
          home: "হোম",
          triage: "স্বাস্থ্য পরীক্ষা",
          history: "ইতিহাস",
          profile: "প্রোফাইল"
        },
        footer: {
          privacy: "গোপনীয়তা নীতি",
          terms: "সেবার শর্তাবলী",
          disclaimer: "এআই ডিসক্লেইমার",
          contact: "সহায়তা"
        }
      },
      index: {
        assessmentReady: "আপনার মূল্যায়ন প্রস্তুত",
        assessmentBasedOn: "আমাদের \"{{symptom}}\" নিয়ে আলোচনার উপর ভিত্তি করে, আমি যা পেয়েছি...",
        disclaimer: "💚 নিজের যত্ন নিন! মনে রাখবেন, ডাক্তার আঙ্কেল আপনাকে গাইড করতে এখানে আছেন, তবে গুরুতর সমস্যার জন্য সর্বদা পেশাদার চিকিৎসা পরামর্শ নেবেন।"
      },
      symptomInput: {
        greetingTitle: "হ্যালো! আমি ডাক্তার আঙ্কেল",
        greetingDesc: "আজ আপনার কী সমস্যা হচ্ছে তা আমাকে বলুন। আপনার নিজের ভাষায় আপনার উপসর্গগুলি বর্ণনা করুন, এবং আমি আপনাকে আরও ভালভাবে সাহায্য করার জন্য কিছু প্রশ্ন জিজ্ঞাসা করব।",
        placeholder: "আপনার উপসর্গগুলি বর্ণনা করুন... (যেমন, 'আমার ২ দিন ধরে মাথব্যথা')",
        pressEnter: "পাঠাতে Enter চাপুন",
        startAssessment: "মূল্যায়ন শুরু করুন",
        commonSymptoms: "সাধারণ উপসর্গ",
        quick: {
          headache: "মাথব্যথা",
          soreThroat: "গলা ব্যথা",
          stomachPain: "পেট ব্যথা",
          fever: "জ্বর",
          backPain: "পিঠ ব্যথা",
          cough: "কাশি"
        },
        disclaimer: "⚠️ এটি শুধুমাত্র তথ্যের উদ্দেশ্যে। চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার জন্য সর্বদা একজন স্বাস্থ্যসেবা পেশাদারের পরামর্শ নিন।"
      },
      triage: {
        possibleCauses: "সম্ভাব্য কারণ",
        mildTitle: "হালকা উদ্বেগ",
        mildDesc: "আপনার উপসর্গগুলি বাড়িতে যত্নের মাধ্যমে নিয়ন্ত্রণযোগ্য মনে হচ্ছে",
        moderateTitle: "মাঝারি উদ্বেগ",
        moderateDesc: "উপসর্গ অব্যাহত থাকলে ডাক্তার দেখানোর কথা বিবেচনা করুন",
        severeTitle: "জরুরি উদ্বেগ",
        severeDesc: "অনুগ্রহ করে অবিলম্বে চিকিৎসা সহায়তা নিন"
      },
      nextSteps: {
        title: "পরবর্তী পদক্ষেপ",
        subtitle: "সবচেয়ে ভালো সুস্থতার জন্য এই পদক্ষেপগুলি অনুসরণ করুন",
        startNew: "নতুন মূল্যায়ন শুরু করুন"
      },
      questionFlow: {
        placeholder: "আপনার উত্তর টাইপ করুন..."
      },
      medicine: {
        title: "সাধারণ ওষুধ",
        subtitle: "প্রেসক্রিপশন ছাড়া ওষুধ যা সাহায্য করতে পারে",
        disclaimer: "⚠️ সর্বদা লেবেল পড়ুন এবং নিশ্চিত না হলে ফার্মাসিস্টের পরামর্শ নিন"
      },
      homeRemedies: {
        title: "ঘরোয়া প্রতিকার",
        subtitle: "বাড়িতে সুস্থ বোধ করার প্রাকৃতিক উপায়"
      },
      specialist: {
        title: "বিশেষজ্ঞের সুপারিশ"
      },
      intake: {
        askName: "👋 হ্যালো! আমি ডাক্তার আঙ্কেল। \n\nআমি আপনাকে কিছু সহজ প্রশ্ন জিজ্ঞাসা করে আপনার উপসর্গগুলি বুঝতে সাহায্য করব। \n\nএই মূল্যায়নটি শুধুমাত্র তথ্যের উদ্দেশ্যে এবং এটি কোনো লাইসেন্সপ্রাপ্ত ডাক্তারের বিকল্প নয়। \n\nশুরু করার আগে, আমি আপনাকে কী নামে ডাকতে পারি?",
        placeholderName: "আপনার পুরো নাম লিখুন (যেমন, রাহুল আহমেদ)...",
        askAge: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো, {{name}}! আপনার বয়স কত?",
        placeholderAge: "আপনার বয়স লিখুন (বছরে)...",
        ageOptions: ["১৮-৩০", "৩১-৪৫", "৪৬-৬০", "৬০ এর বেশি"],
        askGender: "আপনার লিঙ্গ কোনটি?",
        genderOptions: ["পুরুষ", "নারী", "অন্যান্য", "বলতে চাই না"],
        askSymptom: "ধন্যবাদ, {{name}}। এখন অনুগ্রহ করে আপনার স্বাস্থ্য সমস্যা বা উপসর্গগুলি বিস্তারিতভাবে বলুন।",
        placeholderSymptom: "আপনার উপসর্গ বিস্তারিত বর্ণনা করুন... (যেমন, 'আমার ২ দিন ধরে তীব্র মাথাব্যথা এবং জ্বর')",
        niceToMeetYou: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো, {{name}}! 😊\n\nআজ আপনি কী ধরনের শারীরিক সমস্যা অনুভব করছেন তা বলবেন কি?",
        askAgeConversational: "বিস্তারিত বলার জন্য ধন্যবাদ। আপনার শারীরিক অবস্থা আরও ভালোভাবে বোঝার জন্য আমি আপনাকে কয়েকটি দ্রুত প্রশ্ন করতে চাই।\n\nআপনার বয়স কত?",
        emergencyWarning: "⚠️ এই উপসর্গগুলির জন্য অবিলম্বে জরুরি চিকিৎসার প্রয়োজন হতে পারে। \n\nঅনুগ্রহ করে অবিলম্বে আপনার নিকটস্থ জরুরি পরিষেবাতে যোগাযোগ করুন অথবা নিকটস্থ হাসপাতালে যান।"
      },
      boolean: {
        yes: "হ্যাঁ",
        no: "না"
      },
      validation: {
        invalidName: "দুঃখিত, নামটি সঠিক মনে হচ্ছে না। অনুগ্রহ করে একটি সঠিক নাম বলুন (কমপক্ষে ২ টি অক্ষর, শুধুমাত্র বর্ণমালা)।",
        invalidSymptom: "অনুগ্রহ করে আপনার উপসর্গগুলি একটু বিস্তারিতভাবে বর্ণনা করতে পারেন? (কমপক্ষে ১০ টি অক্ষর)",
        invalidAge: "অনুগ্রহ করে ০ থেকে ১২০ এর মধ্যে একটি সঠিক বয়স লিখুন।",
        invalidGender: "অনুগ্রহ করে উপলব্ধ বিকল্পগুলির একটি নির্বাচন করুন।"
      },
      aiMessages: {
        greetings: [
          "হ্যালো! আমি ডাক্তার আঙ্কেল, আপনার বন্ধু সুলভ স্বাস্থ্য সহকারী। 👨‍⚕️",
          "চিন্তা করবেন না, আপনি নিরাপদ হাতে আছেন। আপনি কেমন অনুভব করছেন তা আরও ভালভাবে বুঝতে আমাকে কয়েকটি প্রশ্ন জিজ্ঞাসা করতে দিন।",
          "মনে রাখবেন, আমি আপনাকে গাইড করতে এখানে আছি – তবে গুরুতর উদ্বেগের জন্য সর্বদা একজন প্রকৃত ডাক্তারের সাথে পরামর্শ করুন!"
        ],
        closing: [
          "আমাদের আলোচনার ভিত্তিতে, আমি আপনার জন্য একটি বিস্তৃত মূল্যায়ন প্রস্তুত করেছি।",
          "মনে রাখবেন, এটি শুধুমাত্র নির্দেশিকা। আপনি যদি মনে করেন আপনার অবস্থা গুরুতর, তবে অনুগ্রহ করে অবিলম্বে চিকিৎসা সহায়তা নিন।",
          "নিজের যত্ন নিন! আপনার স্বাস্থ্যই আপনার সবচেয়ে বড় সম্পদ। 💚"
        ],
        analyzing: "ধন্যবাদ। আমি আপনার উত্তরের বিস্তারিত মূল্যায়ণ করতে আমার মেডিকেল ডেটাবেস ব্যবহার করে বিশ্লেষণ করছি...",
        errors: {
          connectionTitle: "সংযোগ ত্রুটি",
          connectionDesc: "ডাক্তার আঙ্কেল এআই ব্যাকএন্ডের সাথে সংযোগ করতে ব্যর্থ হয়েছে। আপনার লোকাল সার্ভার চলছে কিনা তা নিশ্চিত করুন।",
          diagnosisTitle: "নির্ণয় ত্রুটি",
          diagnosisDesc: "ব্যাকএন্ড থেকে রোগ নির্ণয় তথ্য পেতে ব্যর্থ হয়েছে।"
        }
      },
      chatPage: {
        patientLabel: "রোগী",
        yrs: "বছর"
      },
      historyPage: {
        title: "মূল্যায়নের ইতিহাস",
        backToHistory: "ইতিহাসে ফিরুন",
        downloadPdf: "পিডিএফ ডাউনলোড করুন",
        delete: "মুছুন",
        cancel: "বাতিল",
        clearAll: "সব মুছুন",
        deleteTitle: "মূল্যায়ন মুছবেন?",
        deleteDesc: "এটি ইতিহাস থেকে {{name}} এর মূল্যায়ন স্থায়ীভাবে সরিয়ে দেবে। এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।",
        deleteDescGeneric: "এটি এই মূল্যায়ন রেকর্ডটি স্থায়ীভাবে সরিয়ে দেবে। এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।",
        clearTitle: "সব ইতিহাস মুছবেন?",
        clearDesc: "এটি সমস্ত {{count}}টি মূল্যায়ন রেকর্ড স্থায়ীভাবে মুছে দেবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।",
        assessmentReport: "মূল্যায়ন প্রতিবেদন",
        chiefComplaint: "প্রধান অভিযোগ",
        yrs: "বছর",
        viewDetails: "বিস্তারিত দেখুন",
        deleteRecord: "রেকর্ড মুছুন",
        unknown: "অজানা",
        noRecordsTitle: "এখনও কোনো মূল্যায়ন নেই",
        noRecordsDesc: "সম্পন্ন মূল্যায়নগুলি ভবিষ্যতে এখানে দেখা যাবে।",
        startAssessment: "একটি মূল্যায়ন শুরু করুন"
      }
    }
  }
};

const savedLanguage = localStorage.getItem('app-language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('app-language', lng);
});

export default i18n;
