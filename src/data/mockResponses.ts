import { Message, HealthResult } from '@/types/health';

export const followUpQuestions: { question: string; options?: string[] }[] = [
  {
    question: "How long have you been experiencing these symptoms?",
    options: ["Less than 24 hours", "1-3 days", "3-7 days", "More than a week"]
  },
  {
    question: "On a scale of 1-10, how would you rate the discomfort?",
    options: ["1-3 (Mild)", "4-6 (Moderate)", "7-8 (Severe)", "9-10 (Unbearable)"]
  },
  {
    question: "Do you have any of these accompanying symptoms?",
    options: ["Fever", "Nausea", "Fatigue", "None of these"]
  },
  {
    question: "Have you taken any medication for this?",
    options: ["Yes, it helped", "Yes, but no improvement", "No, not yet"]
  },
  {
    question: "Do you have any known allergies or chronic conditions?",
    options: ["No known allergies", "Drug allergies", "Food allergies", "Chronic condition"]
  }
];

export const mockHealthResult: HealthResult = {
  possibleCauses: [
    "Common Cold or Upper Respiratory Infection",
    "Seasonal Allergies",
    "Viral Pharyngitis"
  ],
  triageLevel: 'mild',
  medicines: [
    {
      name: "Paracetamol (Acetaminophen)",
      dosage: "500mg",
      frequency: "Every 6 hours as needed",
      notes: "Do not exceed 4g per day"
    },
    {
      name: "Cetirizine",
      dosage: "10mg",
      frequency: "Once daily",
      notes: "May cause drowsiness"
    },
    {
      name: "Throat Lozenges",
      dosage: "As directed",
      frequency: "Every 2-3 hours",
      notes: "Choose sugar-free if diabetic"
    }
  ],
  homeRemedies: [
    {
      title: "Warm Salt Water Gargle",
      description: "Mix 1/4 teaspoon salt in 8oz warm water. Gargle 3-4 times daily.",
      icon: "💧"
    },
    {
      title: "Honey & Ginger Tea",
      description: "Brew fresh ginger with honey. Drink 2-3 cups daily for soothing relief.",
      icon: "🍯"
    },
    {
      title: "Steam Inhalation",
      description: "Inhale steam from hot water for 10-15 minutes to ease congestion.",
      icon: "♨️"
    },
    {
      title: "Rest & Hydration",
      description: "Get plenty of sleep and drink at least 8 glasses of water daily.",
      icon: "😴"
    }
  ],
  specialist: {
    type: "General Physician",
    urgency: "Within 3-5 days if symptoms persist",
    reason: "If symptoms worsen or don't improve with home care"
  },
  nextSteps: [
    "Monitor your temperature and note any changes",
    "Rest for at least 2-3 days and avoid strenuous activity",
    "Stay hydrated with water, herbal teas, and clear broths",
    "Avoid cold beverages and spicy foods temporarily",
    "Return here if symptoms worsen or new symptoms appear"
  ]
};

export const aiGreetings = [
  "Hello there! I'm Doctor Uncle, your friendly health assistant. 👨‍⚕️",
  "Don't worry, you're in good hands. Let me ask you a few questions to better understand how you're feeling.",
  "Remember, I'm here to guide you – but always consult a real doctor for serious concerns!"
];

export const aiClosingMessages = [
  "Based on our conversation, I've prepared a comprehensive assessment for you.",
  "Remember, this is guidance only. If you feel your condition is serious, please seek immediate medical attention.",
  "Take care of yourself! Your health is your greatest wealth. 💚"
];
