import { useState, useCallback } from 'react';
import { Message, SymptomSession, HealthResult } from '@/types/health';
import { followUpQuestions, mockHealthResult, aiGreetings, aiClosingMessages } from '@/data/mockResponses';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useSymptomChat = () => {
  const [session, setSession] = useState<SymptomSession>({
    id: generateId(),
    initialSymptom: '',
    messages: [],
    status: 'input'
  });
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
    for (let i = 0; i < aiGreetings.length; i++) {
      await simulateTyping(() => {
        addMessage('ai', aiGreetings[i]);
      }, 1000 + i * 500);
    }

    // First question
    await simulateTyping(() => {
      const question = followUpQuestions[0];
      addMessage('ai', question.question, question.options);
    }, 800);
  }, [addMessage, simulateTyping]);

  const answerQuestion = useCallback(async (answer: string) => {
    addMessage('user', answer);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < followUpQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      await simulateTyping(() => {
        const question = followUpQuestions[nextIndex];
        addMessage('ai', question.question, question.options);
      }, 1200);
    } else {
      // All questions answered, show closing messages
      for (let i = 0; i < aiClosingMessages.length; i++) {
        await simulateTyping(() => {
          addMessage('ai', aiClosingMessages[i]);
        }, 1000);
      }

      // Complete the assessment
      setSession(prev => ({
        ...prev,
        status: 'complete',
        result: mockHealthResult
      }));
    }
  }, [currentQuestionIndex, addMessage, simulateTyping]);

  const resetSession = useCallback(() => {
    setSession({
      id: generateId(),
      initialSymptom: '',
      messages: [],
      status: 'input'
    });
    setCurrentQuestionIndex(0);
    setIsTyping(false);
  }, []);

  const currentQuestion = followUpQuestions[currentQuestionIndex];

  return {
    session,
    isTyping,
    currentQuestion: currentQuestion?.question || '',
    currentOptions: currentQuestion?.options,
    startAssessment,
    answerQuestion,
    resetSession
  };
};
