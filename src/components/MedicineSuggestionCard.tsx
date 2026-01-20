import { Pill, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medicine } from '@/types/health';

interface MedicineSuggestionCardProps {
  medicines: Medicine[];
}

export const MedicineSuggestionCard = ({ medicines }: MedicineSuggestionCardProps) => {
  return (
    <Card className="border-none shadow-card animate-fade-in-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Pill className="h-4 w-4 text-primary" />
          </div>
          OTC Medicines
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Over-the-counter medications that may help
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {medicines.map((medicine, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/50 space-y-2"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-foreground">{medicine.name}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {medicine.dosage}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{medicine.frequency}</span>
            </div>
            
            {medicine.notes && (
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-background/80 rounded-lg p-2">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{medicine.notes}</span>
              </div>
            )}
          </div>
        ))}
        
        <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          ⚠️ Always read labels and consult a pharmacist if unsure
        </p>
      </CardContent>
    </Card>
  );
};
