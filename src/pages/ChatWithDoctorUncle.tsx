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
import { RotateCcw } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

const ChatWithDoctorUncle = () => {
  const { t } = useTranslation();
  const {
    session,
    isTyping,
    currentQuestion,
    currentOptions,
    inputPlaceholder,
    answerQuestion,
    resetSession
  } = useSymptomChat();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 md:pb-8">
      <Header />
      
      <main className="flex-1 container max-w-2xl py-6 px-4">
        {session.status === 'complete' && (
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetSession}
              className="gap-2 text-xs font-medium border-border"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('nextSteps.startNew')}</span>
            </Button>
          </div>
        )}

        {/* Chat Conversation Intake / Follow-up Screen */}
        {session.status !== 'complete' && (
          <div className="flex flex-col h-[calc(100vh-180px)] bg-card rounded-2xl border border-border p-4 shadow-sm animate-fade-in-up">
            <ScrollArea className="flex-1 pr-4">
              <ChatHistory messages={session.messages} />
            </ScrollArea>
            
            <div className="pt-4 border-t border-border mt-4">
              <QuestionFlow
                currentQuestion={currentQuestion}
                options={currentOptions}
                placeholder={inputPlaceholder}
                onAnswer={answerQuestion}
                isTyping={isTyping}
              />
            </div>
          </div>
        )}

        {/* Results Screen */}
        {session.status === 'complete' && session.result && (
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
