import { ListChecks, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface NextStepsCardProps {
  steps: string[];
  onStartOver: () => void;
}

export const NextStepsCard = ({ steps, onStartOver }: NextStepsCardProps) => {
  const { t } = useTranslation();
  return (
    <Card className="border-none shadow-card animate-fade-in-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <ListChecks className="h-4 w-4 text-primary" />
          </div>
          {t('nextSteps.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('nextSteps.subtitle')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-sm text-foreground leading-relaxed pt-0.5">
              {step}
            </p>
          </div>
        ))}
        
        <div className="pt-4">
          <Button onClick={onStartOver} className="w-full gap-2" variant="outline">
            {t('nextSteps.startNew')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
