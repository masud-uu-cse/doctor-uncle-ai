import { useState, useCallback } from 'react';
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
  
  const [session, setSession] = useState<SymptomSession>({
    id: generateId(),
    initialSymptom: '',
    messages: [],
    status: 'input'
  });
  
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

  const simulateTyping = useCallback(async (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    callback();
  }, []);

  const startAssessment = useCallback(async (symptom: string) => {
    setSession(prev => ({
      ...prev,
      initialSymptom: symptom,
      status: 'questioning',
      messages: []
    }));

    // Add user's initial symptom
    addMessage('user', symptom);

    // AI greeting sequence
    const translatedGreetings = t('aiMessages.greetings', { returnObjects: true }) as string[];
    for (let i = 0; i < translatedGreetings.length; i++) {
      await simulateTyping(() => {
        addMessage('ai', translatedGreetings[i]);
      }, 1000 + i * 500);
    }

    setIsTyping(true);
    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: symptom, language: i18n.language })
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
  }, [addMessage, simulateTyping, toast]);

  const answerQuestion = useCallback(async (answer: string) => {
    addMessage('user', answer);
    
    const currentQ = questions[currentQuestionIndex];
    const newAnswers = [...userAnswers, { question: currentQ.question, answer }];
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
            language: i18n.language
          })
        });

        if (!response.ok) throw new Error('Failed to fetch diagnosis');
        const diagnosisData = await response.json();
        
        setIsTyping(false);

        // Show closing messages
        const translatedClosing = t('aiMessages.closing', { returnObjects: true }) as string[];
        for (let i = 0; i < translatedClosing.length; i++) {
          await simulateTyping(() => {
            addMessage('ai', translatedClosing[i]);
          }, 1000);
        }

        // Map backend schema to frontend HealthResult
        const mappedResult: HealthResult = {
          possibleCauses: diagnosisData.possibleConditions?.map((c: any) => `${c.name}: ${c.description}`) || [],
          triageLevel: (diagnosisData.severity?.level?.toLowerCase() === 'severe' ? 'severe' : 
                       (diagnosisData.severity?.level?.toLowerCase() === 'mild' ? 'mild' : 'moderate')) as TriageLevel,
          medicines: diagnosisData.whatYouCanDoNow?.medicines?.map((m: any) => ({
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
  }, [currentQuestionIndex, questions, userAnswers, addMessage, simulateTyping, session.initialSymptom, toast]);

  const resetSession = useCallback(() => {
    setSession({
      id: generateId(),
      initialSymptom: '',
      messages: [],
      status: 'input'
    });
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsTyping(false);
  }, []);

  const currentQuestionObj = questions[currentQuestionIndex];

  return {
    session,
    isTyping,
    currentQuestion: currentQuestionObj?.question || '',
    currentOptions: currentQuestionObj?.options,
    startAssessment,
    answerQuestion,
    resetSession
  };
};
