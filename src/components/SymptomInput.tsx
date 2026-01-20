import { useState } from 'react';
import { Mic, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface SymptomInputProps {
  onSubmit: (symptom: string) => void;
}

const quickSymptoms = [
  "Headache",
  "Sore throat",
  "Stomach pain",
  "Fever",
  "Back pain",
  "Cough"
];

export const SymptomInput = ({ onSubmit }: SymptomInputProps) => {
  const [symptom, setSymptom] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (symptom.trim()) {
      onSubmit(symptom.trim());
    }
  };

  const handleQuickSymptom = (quick: string) => {
    setSymptom(quick);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording would be implemented here
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Welcome Message */}
      <Card className="border-none shadow-card bg-gradient-to-br from-primary/5 to-secondary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍⚕️</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Hello! I'm Doctor Uncle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Tell me what's bothering you today. Describe your symptoms in your own words, 
                and I'll ask some follow-up questions to help you better.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Input Area */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Textarea
              placeholder="Describe your symptoms... (e.g., 'I've had a headache for 2 days')"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="min-h-[120px] resize-none pr-12 text-base border-2 focus:border-primary transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRecording}
              className={`absolute right-2 top-2 ${isRecording ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Press Enter to send
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!symptom.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Symptom Chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>Common symptoms</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickSymptoms.map((quick) => (
            <button
              key={quick}
              onClick={() => handleQuickSymptom(quick)}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {quick}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-4">
        ⚠️ This is for informational purposes only. Always consult a healthcare 
        professional for medical advice, diagnosis, or treatment.
      </p>
    </div>
  );
};
