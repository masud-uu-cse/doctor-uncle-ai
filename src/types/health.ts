export type TriageLevel = 'mild' | 'moderate' | 'severe';

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
}

export interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  notes?: string;
}

export interface HomeRemedy {
  title: string;
  description: string;
  icon: string;
}

export interface HealthResult {
  possibleCauses: string[];
  triageLevel: TriageLevel;
  medicines: Medicine[];
  homeRemedies: HomeRemedy[];
  specialist: {
    type: string;
    urgency: string;
    reason: string;
  };
  nextSteps: string[];
}

export interface SymptomSession {
  id: string;
  patientInfo: PatientInfo;
  initialSymptom: string;
  messages: Message[];
  result?: HealthResult;
  status: 'input_name' | 'input_age' | 'input_gender' | 'input_symptom' | 'questioning' | 'complete';
}
