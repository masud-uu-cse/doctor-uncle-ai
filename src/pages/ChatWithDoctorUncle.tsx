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
import { RotateCcw, Home, Stethoscope, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatWithDoctorUncle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
                    👤 Patient: {session.patientInfo.name} ({session.patientInfo.age} yrs, {session.patientInfo.gender})
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

      {/* Sticky Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>{t('landingPage.nav.home')}</span>
          </button>

          <button
            onClick={() => {
              resetSession();
              navigate('/doctor-uncle');
            }}
            className="flex flex-col items-center gap-1 text-teal-700 dark:text-teal-400 font-medium text-xs py-1"
          >
            <div className="p-1 rounded-full bg-teal-100/80 dark:bg-teal-900/50">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span>{t('landingPage.nav.triage')}</span>
          </button>

          <button
            onClick={() => navigate('/doctor-uncle')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <Clock className="w-5 h-5" />
            <span>{t('landingPage.nav.history')}</span>
          </button>

          <button
            onClick={() => navigate('/doctor-uncle')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>{t('landingPage.nav.profile')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithDoctorUncle;
