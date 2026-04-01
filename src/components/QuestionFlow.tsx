import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface QuestionFlowProps {
  currentQuestion: string;
  options?: string[];
  onAnswer: (answer: string) => void;
  isTyping?: boolean;
}

export const QuestionFlow = ({
  currentQuestion,
  options,
  onAnswer,
  isTyping
}: QuestionFlowProps) => {
  const { t } = useTranslation();
  const [customAnswer, setCustomAnswer] = useState('');

  const handleSubmit = () => {
    if (customAnswer.trim()) {
      onAnswer(customAnswer.trim());
      setCustomAnswer('');
    }
  };

  if (isTyping) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-chat-ai rounded-2xl rounded-tl-sm max-w-[200px] animate-fade-in-up">
        <span className="text-sm">👨‍⚕️</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Quick Reply Options */}
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className="px-4 py-2.5 rounded-xl bg-card border-2 border-border text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all active:scale-95"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Custom Input */}
      <div className="flex gap-2">
        <Input
          placeholder={t('questionFlow.placeholder')}
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          className="flex-1"
        />
        <Button onClick={handleSubmit} disabled={!customAnswer.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
