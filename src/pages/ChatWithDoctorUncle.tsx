import { Header } from '@/components/Header';
import { ChatHistory } from '@/components/ChatHistory';
import { QuestionFlow } from '@/components/QuestionFlow';
import { TriageResultCard } from '@/components/TriageResultCard';
import { MedicineSuggestionCard } from '@/components/MedicineSuggestionCard';
import { HomeRemediesCard } from '@/components/HomeRemediesCard';
import { SpecialistRecommendation } from '@/components/SpecialistRecommendation';
import { NextStepsCard } from '@/components/NextStepsCard';
import { useSymptomChat } from '@/hooks/useSymptomChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare, PlusCircle } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { downloadAssessmentPDF } from '@/utils/generatePDF';

export const ChatWithDoctorUncle = () => {
  const { t } = useTranslation();
  const {
    session,
    isTyping,
    currentQuestion,
    currentOptions,
    inputType,
    inputPlaceholder,
    answerQuestion,
    resetSession,
    askAnotherQuestion
  } = useSymptomChat();

  const handleDownloadPDF = () => {
    if (session.result) {
      downloadAssessmentPDF({
        id: session.id,
        createdAt: new Date().toISOString(),
        patientInfo: session.patientInfo,
        initialSymptom: session.initialSymptom,
        result: session.result
      });
    }
  };

  // Calculate Progress Percent dynamically based on the state machine
  const getProgressPercent = () => {
    switch (session.status) {
      case 'WELCOME':
      case 'NAME':
        return 15;
      case 'SYMPTOMS':
        return 35;
      case 'AGE':
        return 50;
      case 'GENDER':
        return 65;
      case 'FOLLOW_UP_QUESTIONS':
        return 80;
      case 'ANALYZING':
        return 95;
      case 'REPORT':
      case 'COMPLETE':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 md:pb-8">
      <Header />
      
      <main className="flex-1 container max-w-2xl py-6 px-4">
        {/* Progress Indicator */}
        {session.status !== 'COMPLETE' && (
          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-4">
            <div 
              className="bg-teal-600 dark:bg-teal-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>
        )}

        {/* Chat Conversation Intake / Follow-up Screen */}
        {session.status !== 'COMPLETE' && (
          <div className="flex flex-col h-[calc(100vh-200px)] bg-card rounded-2xl border border-border p-4 shadow-sm animate-fade-in-up">
            <ScrollArea className="flex-1 pr-4">
              <ChatHistory messages={session.messages} />
            </ScrollArea>
            
            <div className="pt-4 border-t border-border mt-4">
              <QuestionFlow
                inputType={inputType}
                options={currentOptions}
                placeholder={inputPlaceholder}
                onAnswer={answerQuestion}
                isTyping={isTyping}
              />
            </div>
          </div>
        )}

        {/* Results Screen */}
        {session.status === 'COMPLETE' && session.result && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Doctor Uncle's Summary */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 via-primary/10 to-secondary border border-teal-500/20">
              <span className="text-3xl">👨‍⚕️</span>
              <div>
                <h2 className="font-bold text-lg text-foreground">
                  {t('index.assessmentReady')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('index.assessmentBasedOn', { symptom: session.initialSymptom })}
                </p>
                {session.patientInfo.name && (
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1">
                    👤 {t('chatPage.patientLabel')}: {session.patientInfo.name} ({session.patientInfo.age} {t('chatPage.yrs')}, {session.patientInfo.gender})
                  </p>
                )}
              </div>
            </div>

            <TriageResultCard
              level={session.result.triageLevel}
              possibleCauses={session.result.possibleCauses}
            />

            <MedicineSuggestionCard medicines={session.result.medicines} />

            <HomeRemediesCard remedies={session.result.homeRemedies} />

            <SpecialistRecommendation specialist={session.result.specialist} />

            <NextStepsCard
              steps={session.result.nextSteps}
              onStartOver={resetSession}
            />

            {/* Premium Call-to-Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={resetSession}
                variant="outline"
                className="flex-1 gap-2 py-5 font-semibold text-xs border-border"
              >
                <PlusCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t('landingPage.ctaButton', 'Start New Assessment')}</span>
              </Button>
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="flex-1 gap-2 py-5 font-semibold text-xs border-teal-500/20 hover:border-teal-500 text-teal-700 dark:text-teal-400"
              >
                <Download className="w-4 h-4" />
                <span>{t('historyPage.downloadPdf', 'Download Report')}</span>
              </Button>
              <Button
                onClick={askAnotherQuestion}
                variant="default"
                className="flex-1 gap-2 py-5 font-semibold text-xs bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('chatPage.askAnotherQuestion', 'Ask Another Question')}</span>
              </Button>
            </div>

            {/* Final Disclaimer */}
            <p className="text-xs text-muted-foreground text-center px-4 pb-8">
              {t('index.disclaimer')}
            </p>
          </div>
        )}
      </main>

      <BottomNav activeTab="triage" onTriageClick={resetSession} />
    </div>
  );
};

export default ChatWithDoctorUncle;
