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
      aiMessages: {
        greetings: [
          "Hello there! I'm Doctor Uncle, your friendly health assistant. 👨‍⚕️",
          "Don't worry, you're in good hands. Let me ask you a few questions to better understand how you're feeling.",
          "Remember, I'm here to guide you – but always consult a real doctor for serious concerns!"
        ],
        closing: [
          "Based on our conversation, I've prepared a comprehensive assessment for you.",
          "Remember, this is guidance only. If you feel your condition is serious, please seek immediate medical attention.",
          "Take care of yourself! Your health is your greatest wealth. 💚"
        ],
        analyzing: "Thank you. I am analyzing your responses with my medical database to generate a detailed assessment...",
        errors: {
          connectionTitle: "Connection Error",
          connectionDesc: "Failed to connect to Doctor Uncle AI Backend. Make sure your local server is running.",
          diagnosisTitle: "Diagnosis Error",
          diagnosisDesc: "Could not retrieve diagnosis from backend."
        }
      }
    }
  },
  bn: {
    translation: {
      header: {
        title: "ডাক্তার আঙ্কেল",
        subtitle: "এআই স্বাস্থ্য সহকারী",
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
