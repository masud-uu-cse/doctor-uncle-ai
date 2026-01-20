import { UserRound, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SpecialistRecommendationProps {
  specialist: {
    type: string;
    urgency: string;
    reason: string;
  };
}

export const SpecialistRecommendation = ({ specialist }: SpecialistRecommendationProps) => {
  return (
    <Card className="border-none shadow-card animate-fade-in-up overflow-hidden">
      <div className="bg-secondary p-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center">
            <UserRound className="h-4 w-4 text-secondary-foreground" />
          </div>
          Specialist Recommendation
        </CardTitle>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
            <span className="text-2xl">🩺</span>
          </div>
          <div>
            <h4 className="font-bold text-foreground text-lg">{specialist.type}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{specialist.urgency}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2 p-3 rounded-xl bg-muted">
          <MessageCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {specialist.reason}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
