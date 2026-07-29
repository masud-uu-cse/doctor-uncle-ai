import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface QuestionFlowProps {
  inputType?: 'text' | 'boolean' | 'radio' | 'scale' | 'select';
  options?: string[];
  placeholder?: string;
  onAnswer: (answer: string) => void;
  isTyping?: boolean;
}

export const QuestionFlow = ({
  inputType = 'text',
  options,
  placeholder,
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
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 dark:bg-slate-800 rounded-2xl rounded-tl-sm max-w-[200px] animate-fade-in-up">
        <span className="text-sm">👨‍⚕️</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  // 1-10 Scale options if not provided
  const scaleOptions = inputType === 'scale' 
    ? (options && options.length > 0 ? options : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    : [];

  // Boolean options if not provided
  const booleanOptions = inputType === 'boolean'
    ? (options && options.length > 0 ? options : [t('boolean.yes', 'Yes'), t('boolean.no', 'No')])
    : [];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Boolean Input Type */}
      {inputType === 'boolean' && (
        <div className="flex gap-3 justify-center md:justify-start">
          {booleanOptions.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className="px-6 py-3 rounded-xl bg-card border-2 border-border text-foreground text-sm font-semibold hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all active:scale-95 shadow-sm min-w-[100px]"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Scale Input Type */}
      {inputType === 'scale' && (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground font-medium px-1">
            {t('questionFlow.scaleLabel', 'Select a value from 1 (mild) to 10 (severe):')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {scaleOptions.map((val) => (
              <button
                key={val}
                onClick={() => onAnswer(val)}
                className="w-10 h-10 rounded-full bg-card border-2 border-border text-foreground text-sm font-bold hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all active:scale-95 flex items-center justify-center shadow-2xs"
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Radio and Select Choice Pills */}
      {(inputType === 'radio' || inputType === 'select') && options && options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className="px-4 py-2.5 rounded-xl bg-card border-2 border-border text-foreground text-sm font-medium hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all active:scale-95 shadow-2xs"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Custom Text Input */}
      {inputType === 'text' && (
        <div className="flex gap-2">
          <Input
            placeholder={placeholder || t('questionFlow.placeholder')}
            value={customAnswer}
            onChange={(e) => setCustomAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            className="flex-1 bg-card border-border focus-visible:ring-teal-500"
          />
          <Button
            onClick={handleSubmit}
            disabled={!customAnswer.trim()}
            size="icon"
            className="bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
