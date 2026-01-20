import { Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeRemedy } from '@/types/health';

interface HomeRemediesCardProps {
  remedies: HomeRemedy[];
}

export const HomeRemediesCard = ({ remedies }: HomeRemediesCardProps) => {
  return (
    <Card className="border-none shadow-card animate-fade-in-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-accent" />
          </div>
          Home Remedies
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Natural ways to feel better at home
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-3">
          {remedies.map((remedy, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 transition-colors"
            >
              <span className="text-2xl">{remedy.icon}</span>
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  {remedy.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {remedy.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
