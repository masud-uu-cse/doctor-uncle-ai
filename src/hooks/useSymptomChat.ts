import { useState, useCallback, useEffect } from 'react';
import { Message, SymptomSession, HealthResult, TriageLevel } from '@/types/health';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const generateId = () => Math.random().toString(36).substr(2, 9);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/symptom-checker';

interface APIQuestion {
  id: string;
  question: string;
  options: string[];
}

interface APIAnswer {
  question: string;
  answer: string;
}

export const useSymptomChat = () => {
  const { toast } = useToast();
  const { i18n, t } = useTranslation();
  
  const [session, setSession] = useState<SymptomSession>(() => ({
    id: generateId(),
    patientInfo: { name: '', age: '', gender: '' },
    initialSymptom: '',
    messages: [
      {
        id: generateId(),
        role: 'ai',
        content: t('intake.askName'),
        timestamp: new Date()
      }
    ],
    status: 'input_name'
  }));

  // Sync initial message if language changes at start
  useEffect(() => {
    if (session.messages.length === 1 && session.status === 'input_name') {
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

  const handleInputSubmit = useCallback(async (input: string) => {
    if (!input.trim()) return;

    if (session.status === 'input_name') {
      const name = input.trim();
      addMessage('user', name);
      const ageOpts = t('intake.ageOptions', { returnObjects: true }) as string[];

      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, name },
        status: 'input_age'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('intake.askAge', { name }), Array.isArray(ageOpts) ? ageOpts : undefined);
      });
      return;
    }

    if (session.status === 'input_age') {
      const age = input.trim();
      addMessage('user', age);
      const genderOpts = t('intake.genderOptions', { returnObjects: true }) as string[];

      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, age },
        status: 'input_gender'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('intake.askGender'), Array.isArray(genderOpts) ? genderOpts : undefined);
      });
      return;
    }

    if (session.status === 'input_gender') {
      const gender = input.trim();
      addMessage('user', gender);

      setSession(prev => ({
        ...prev,
        patientInfo: { ...prev.patientInfo, gender },
        status: 'input_symptom'
      }));

      await simulateTyping(() => {
        addMessage('ai', t('intake.askSymptom', { name: session.patientInfo.name }));
      });
      return;
    }

    if (session.status === 'input_symptom') {
      const symptom = input.trim();
      addMessage('user', symptom);

      setSession(prev => ({
        ...prev,
        initialSymptom: symptom,
        status: 'questioning'
      }));

      setIsTyping(true);
      try {
        const response = await fetch(`${API_BASE_URL}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            symptoms: symptom,
            language: i18n.language,
            patientInfo: session.patientInfo
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
  }, [session.status, session.patientInfo, addMessage, simulateTyping, t, i18n.language, toast]);

  const answerQuestion = useCallback(async (answer: string) => {
    // If we're still in intake steps, map to handleInputSubmit
    if (session.status === 'input_name' || session.status === 'input_age' || session.status === 'input_gender' || session.status === 'input_symptom') {
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
        addMessage('ai', nextQ.question, nextQ.options);
      }, 1200);
    } else {
      // Complete phase
      await simulateTyping(() => {
        addMessage('ai', t('aiMessages.analyzing'));
      }, 1500);

      setIsTyping(true);
      
      try {
        const response = await fetch(`${API_BASE_URL}/diagnosis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            symptoms: session.initialSymptom,
            answers: newAnswers,
            language: i18n.language,
            patientInfo: session.patientInfo
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

        setSession(prev => ({
          ...prev,
          status: 'complete',
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
  }, [session.status, session.patientInfo, session.initialSymptom, questions, currentQuestionIndex, userAnswers, addMessage, simulateTyping, handleInputSubmit, t, i18n.language, toast]);

  const resetSession = useCallback(() => {
    setSession({
      id: generateId(),
      patientInfo: { name: '', age: '', gender: '' },
      initialSymptom: '',
      messages: [
        {
          id: generateId(),
          role: 'ai',
          content: t('intake.askName'),
          timestamp: new Date()
        }
      ],
      status: 'input_name'
    });
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsTyping(false);
  }, [t]);

  const currentQuestionObj = questions[currentQuestionIndex];
  
  // Options for current question / intake step
  const lastMessage = session.messages[session.messages.length - 1];
  const activeOptions = lastMessage?.role === 'ai' ? lastMessage.options : undefined;

  // Placeholder prompt for custom input
  let inputPlaceholder = t('questionFlow.placeholder');
  if (session.status === 'input_name') inputPlaceholder = t('intake.placeholderName');
  else if (session.status === 'input_age') inputPlaceholder = t('intake.placeholderAge');
  else if (session.status === 'input_symptom') inputPlaceholder = t('intake.placeholderSymptom');

  return {
    session,
    isTyping,
    currentQuestion: currentQuestionObj?.question || '',
    currentOptions: activeOptions,
    inputPlaceholder,
    handleInputSubmit,
    answerQuestion,
    resetSession
  };
};
