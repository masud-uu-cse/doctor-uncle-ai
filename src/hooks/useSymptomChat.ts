import { useState, useCallback, useEffect } from 'react';
import { Message, SymptomSession, HealthResult, TriageLevel, PatientInfo, SessionState } from '@/types/health';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@/hooks/useHistory';

const generateId = () => Math.random().toString(36).substr(2, 9);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/symptom-checker';

interface APIQuestion {
  id: string;
  question: string;
  inputType: 'text' | 'boolean' | 'radio' | 'scale' | 'select';
  options?: string[];
  required?: boolean;
}

interface APIAnswer {
  question: string;
  answer: string;
}

export const useSymptomChat = () => {
  const { saveRecord } = useHistory();
  const { toast } = useToast();
  const { i18n, t } = useTranslation();
  
  const [session, setSession] = useState<SymptomSession>(() => ({
    id: generateId(),
    patientInfo: { name: '', age: '', gender: '' },
    initialSymptom: '',
    messages: [],
    status: 'WELCOME'
  }));

  const [questions, setQuestions] = useState<APIQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<APIAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((role: 'ai' | 'user', content: string, options?: string[]) => {
    const newMessage: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      options
    };
    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  }, []);

  const simulateTyping = useCallback(async (callback: () => void, delay = 1200) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    callback();
  }, []);

  // Handle step 1 (WELCOME) immediately
  useEffect(() => {
    if (session.status === 'WELCOME' && session.messages.length === 0) {
      simulateTyping(() => {
        addMessage('ai', t('intake.askName'));
        setSession(prev => ({ ...prev, status: 'NAME' }));
      }, 600);
    }
  }, [session.status, session.messages.length, t, simulateTyping, addMessage]);

  // Sync initial message if language changes at start
  useEffect(() => {
    if (session.messages.length === 1 && (session.status === 'WELCOME' || session.status === 'NAME')) {
      setSession(prev => ({
        ...prev,
        messages: [
          {
            ...prev.messages[0],
            content: t('intake.askName')
          }
        ]
      }));
    }
  }, [i18n.language, t, session.messages.length, session.status]);

  const handleInputSubmit = useCallback(async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (session.status === 'NAME') {
      // Validate Name: Minimum 2 chars, letters and spaces only
      const nameRegex = /^[A-Za-z\s\u0980-\u09ff]+$/;
      if (trimmed.length < 2 || !nameRegex.test(trimmed)) {
        addMessage('user', trimmed);
        await simulateTyping(() => {
          addMessage('ai', t('validation.invalidName'));
        }, 800);
        return;
      }

      addMessage('user', trimmed);
      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, name: trimmed },
        status: 'SYMPTOMS'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('intake.niceToMeetYou', { name: trimmed }));
      }, 1000);
      return;
    }

    if (session.status === 'SYMPTOMS') {
      // Validate Symptoms: Minimum 10 chars, check for only greetings or random strings
      const greetings = ['hi', 'hello', 'hey', 'হ্যালো', 'হাই', 'আসসালামু আলাইকুম', 'assalamualaikum', 'salam', 'yo'];
      const isOnlyGreeting = greetings.includes(trimmed.toLowerCase());
      const isRandom = trimmed.length > 5 && !/[aeiouy\u0985-\u09b0\u09cd]/i.test(trimmed);

      if (trimmed.length < 10 || isOnlyGreeting || isRandom) {
        addMessage('user', trimmed);
        await simulateTyping(() => {
          addMessage('ai', t('validation.invalidSymptom'));
        }, 800);
        return;
      }

      addMessage('user', trimmed);

      // Local emergency symptom check
      const emergencyKeywords = [
        'chest pain', 'heart attack', 'difficulty breathing', 'shortness of breath', 
        'unconscious', 'passed out', 'fainted', 'stroke', 'bleeding', 'hemorrhage', 
        'seizure', 'choking', 'cannot breathe', 'chest pressure',
        'বুকে ব্যথা', 'হার্ট অ্যাটাক', 'শ্বাসকষ্ট', 'শ্বাস নিতে কষ্ট', 'অজ্ঞান', 
        'স্ট্রোক', 'রক্তপাত', 'প্রচুর রক্ত', 'খিঁচুনি'
      ];
      const isEmergency = emergencyKeywords.some(keyword => trimmed.toLowerCase().includes(keyword));

      if (isEmergency) {
        setSession(prev => ({
          ...prev,
          initialSymptom: trimmed,
          status: 'COMPLETE'
        }));
        await simulateTyping(() => {
          addMessage('ai', t('intake.emergencyWarning'));
        }, 1200);
        return;
      }

      setSession(prev => ({
        ...prev,
        initialSymptom: trimmed,
        status: 'AGE'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('intake.askAgeConversational'));
      }, 1200);
      return;
    }

    if (session.status === 'AGE') {
      // Validate Age: Numeric and 0-120
      const ageNum = parseInt(trimmed, 10);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
        addMessage('user', trimmed);
        await simulateTyping(() => {
          addMessage('ai', t('validation.invalidAge'));
        }, 800);
        return;
      }

      addMessage('user', trimmed);
      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, age: trimmed },
        status: 'GENDER'
      }));

      const genderOpts = t('intake.genderOptions', { returnObjects: true }) as string[];
      await simulateTyping(() => {
        addMessage('ai', t('intake.askGender'), Array.isArray(genderOpts) ? genderOpts : undefined);
      }, 1000);
      return;
    }

    if (session.status === 'GENDER') {
      addMessage('user', trimmed);
      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, gender: trimmed },
        status: 'FOLLOW_UP_QUESTIONS'
      }));

      setIsTyping(true);
      try {
        const response = await fetch(`${API_BASE_URL}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            symptoms: session.initialSymptom,
            language: i18n.language,
            patientInfo: {
              name: session.patientInfo.name,
              age: session.patientInfo.age,
              gender: trimmed
            },
            state: 'FOLLOW_UP_QUESTIONS'
          })
        });

        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        
        const generatedQuestions: APIQuestion[] = data.questions;
        setQuestions(generatedQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);

        if (generatedQuestions && generatedQuestions.length > 0) {
          setIsTyping(false);
          const firstQ = generatedQuestions[0];
          addMessage('ai', firstQ.question, firstQ.options);
        } else {
          throw new Error('No questions returned from API');
        }
      } catch (error) {
        console.error(error);
        setIsTyping(false);
        toast({
          title: t('aiMessages.errors.connectionTitle'),
          description: t('aiMessages.errors.connectionDesc'),
          variant: "destructive"
        });
      }
      return;
    }
  }, [session, addMessage, simulateTyping, t, i18n.language, toast]);

  const answerQuestion = useCallback(async (answer: string) => {
    // Forward to input submit if still in intake phases
    if (
      session.status === 'WELCOME' ||
      session.status === 'NAME' ||
      session.status === 'SYMPTOMS' ||
      session.status === 'AGE' ||
      session.status === 'GENDER'
    ) {
      await handleInputSubmit(answer);
      return;
    }

    addMessage('user', answer);
    
    const currentQ = questions[currentQuestionIndex];
    const newAnswers = [...userAnswers, { question: currentQ ? currentQ.question : '', answer }];
    setUserAnswers(newAnswers);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      await simulateTyping(() => {
        const nextQ = questions[nextIndex];
        
        // Random natural acknowledgements
        const acknowledgements = i18n.language === 'bn'
          ? ["ধন্যবাদ।", "আমি বুঝতে পেরেছি।", "এটি তথ্যপূর্ণ।", "ঠিক আছে।"]
          : ["Thank you.", "I understand.", "That's helpful.", "Got it.", "Okay."];
        const randomAck = acknowledgements[Math.floor(Math.random() * acknowledgements.length)];

        addMessage('ai', `${randomAck}\n\n${nextQ.question}`, nextQ.options);
      }, 1200);
    } else {
      // Complete Phase - Analyzing
      setSession(prev => ({
        ...prev,
        status: 'ANALYZING'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('aiMessages.analyzing'));
      }, 2500);

      setIsTyping(true);
      try {
        const response = await fetch(`${API_BASE_URL}/diagnosis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            symptoms: session.initialSymptom,
            answers: newAnswers,
            language: i18n.language,
            patientInfo: session.patientInfo,
            state: 'REPORT'
          })
        });

        if (!response.ok) throw new Error('Failed to fetch diagnosis');
        const diagnosisData = await response.json();
        
        setIsTyping(false);

        // Show closing messages
        const translatedClosing = t('aiMessages.closing', { returnObjects: true }) as string[];
        if (Array.isArray(translatedClosing)) {
          for (let i = 0; i < translatedClosing.length; i++) {
            await simulateTyping(() => {
              addMessage('ai', translatedClosing[i]);
            }, 1000);
          }
        }

        // Map backend schema to frontend HealthResult
        const mappedResult: HealthResult = {
          possibleCauses: diagnosisData.possibleConditions?.map((c: { name: string; description: string }) => `${c.name}: ${c.description}`) || [],
          triageLevel: (diagnosisData.severity?.level?.toLowerCase() === 'severe' ? 'severe' : 
                       (diagnosisData.severity?.level?.toLowerCase() === 'mild' ? 'mild' : 'moderate')) as TriageLevel,
          medicines: diagnosisData.whatYouCanDoNow?.medicines?.map((m: { name: string; usage: string }) => ({
            name: m.name,
            dosage: 'As directed',
            frequency: 'As needed',
            notes: m.usage
          })) || [],
          homeRemedies: diagnosisData.whatYouCanDoNow?.homeCare?.map((hc: string) => ({
            title: hc,
            description: hc,
            icon: '💡'
          })) || [],
          specialist: {
            type: diagnosisData.whenToTakeAction?.seeDoctorType || 'General Physician',
            urgency: diagnosisData.emergencyAlert?.isEmergency ? 'Immediate' : 'Routine or As needed',
            reason: diagnosisData.severity?.message || 'Further evaluation required'
          },
          nextSteps: [
            ...(diagnosisData.whenToTakeAction?.nextSteps || []),
            ...(diagnosisData.emergencyAlert?.warningSigns?.length ? [`Warning signs to watch out for: ${diagnosisData.emergencyAlert.warningSigns.join(', ')}`] : []),
            diagnosisData.disclaimer || 'This is general guidance.'
          ]
        };

        // Persist to localStorage history
        saveRecord({
          id: generateId(),
          createdAt: new Date().toISOString(),
          patientInfo: session.patientInfo as PatientInfo,
          initialSymptom: session.initialSymptom,
          result: mappedResult
        });

        setSession(prev => ({
          ...prev,
          status: 'COMPLETE',
          result: mappedResult
        }));

      } catch (error) {
        console.error(error);
        setIsTyping(false);
        toast({
          title: t('aiMessages.errors.diagnosisTitle'),
          description: t('aiMessages.errors.diagnosisDesc'),
          variant: "destructive"
        });
      }
    }
  }, [session, questions, currentQuestionIndex, userAnswers, addMessage, simulateTyping, handleInputSubmit, saveRecord, t, i18n.language, toast]);

  const resetSession = useCallback(() => {
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsTyping(false);
    setSession({
      id: generateId(),
      patientInfo: { name: '', age: '', gender: '' },
      initialSymptom: '',
      messages: [],
      status: 'WELCOME'
    });
  }, []);

  const askAnotherQuestion = useCallback(() => {
    setSession(prev => {
      const resetMessages: Message[] = [
        {
          id: generateId(),
          role: 'ai',
          content: t('intake.niceToMeetYou', { name: prev.patientInfo.name }),
          timestamp: new Date()
        }
      ];
      return {
        id: generateId(),
        patientInfo: prev.patientInfo,
        initialSymptom: '',
        messages: resetMessages,
        status: 'SYMPTOMS'
      };
    });
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsTyping(false);
  }, [t]);

  // Determine current active question options & input types dynamically
  let currentQuestionObj = questions[currentQuestionIndex];
  let inputType: 'text' | 'boolean' | 'radio' | 'scale' | 'select' = 'text';
  let activeOptions: string[] | undefined = undefined;

  if (session.status === 'NAME' || session.status === 'SYMPTOMS' || session.status === 'AGE') {
    inputType = 'text';
    activeOptions = undefined;
  } else if (session.status === 'GENDER') {
    inputType = 'radio';
    activeOptions = t('intake.genderOptions', { returnObjects: true }) as string[];
  } else if (session.status === 'FOLLOW_UP_QUESTIONS' && currentQuestionObj) {
    inputType = currentQuestionObj.inputType || 'radio';
    activeOptions = currentQuestionObj.options;
  }

  // Placeholder prompts
  let inputPlaceholder = t('questionFlow.placeholder');
  if (session.status === 'NAME') inputPlaceholder = t('intake.placeholderName');
  else if (session.status === 'AGE') inputPlaceholder = t('intake.placeholderAge');
  else if (session.status === 'SYMPTOMS') inputPlaceholder = t('intake.placeholderSymptom');

  return {
    session,
    isTyping,
    currentQuestion: currentQuestionObj?.question || '',
    currentOptions: activeOptions,
    inputType,
    inputPlaceholder,
    handleInputSubmit,
    answerQuestion,
    resetSession,
    askAnotherQuestion
  };
};
