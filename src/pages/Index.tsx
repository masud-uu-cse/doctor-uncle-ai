import { Header } from '@/components/Header';
import { SymptomInput } from '@/components/SymptomInput';
import { ChatHistory } from '@/components/ChatHistory';
import { QuestionFlow } from '@/components/QuestionFlow';
import { TriageResultCard } from '@/components/TriageResultCard';
import { MedicineSuggestionCard } from '@/components/MedicineSuggestionCard';
import { HomeRemediesCard } from '@/components/HomeRemediesCard';
import { SpecialistRecommendation } from '@/components/SpecialistRecommendation';
import { NextStepsCard } from '@/components/NextStepsCard';
import { useSymptomChat } from '@/hooks/useSymptomChat';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const {
    session,
    isTyping,
    currentQuestion,
    currentOptions,
    startAssessment,
    answerQuestion,
    resetSession
  } = useSymptomChat();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-2xl py-6 px-4">
        {/* Input Screen */}
        {session.status === 'input' && (
          <SymptomInput onSubmit={startAssessment} />
        )}

        {/* Chat/Questioning Screen */}
        {session.status === 'questioning' && (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <ScrollArea className="flex-1 pr-4">
              <ChatHistory messages={session.messages} />
            </ScrollArea>
            
            <div className="pt-4 border-t border-border mt-4">
              <QuestionFlow
                currentQuestion={currentQuestion}
                options={currentOptions}
                onAnswer={answerQuestion}
                isTyping={isTyping}
              />
            </div>
          </div>
        )}

        {/* Results Screen */}
        {session.status === 'complete' && session.result && (
          <div className="space-y-6">
            {/* Doctor Uncle's Summary */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary animate-fade-in-up">
              <span className="text-3xl">👨‍⚕️</span>
              <div>
                <h2 className="font-bold text-lg text-foreground">
                  Your Assessment is Ready
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on our conversation about "{session.initialSymptom}", here's what I found...
                </p>
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
              💚 Take care of yourself! Remember, Doctor Uncle is here to guide you, 
              but always seek professional medical advice for serious concerns.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
