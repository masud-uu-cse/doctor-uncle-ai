import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TriageLevel } from '@/types/health';

interface TriageResultCardProps {
  level: TriageLevel;
  possibleCauses: string[];
}

const triageConfig = {
  mild: {
    icon: CheckCircle,
    title: 'Mild Concern',
    description: 'Your symptoms appear manageable with home care',
    bgClass: 'bg-triage-mild/10',
    textClass: 'text-triage-mild',
    badgeClass: 'triage-mild'
  },
  moderate: {
    icon: AlertCircle,
    title: 'Moderate Concern',
    description: 'Consider seeing a doctor if symptoms persist',
    bgClass: 'bg-triage-moderate/10',
    textClass: 'text-triage-moderate',
    badgeClass: 'triage-moderate'
  },
  severe: {
    icon: AlertTriangle,
    title: 'Urgent Concern',
    description: 'Please seek medical attention promptly',
    bgClass: 'bg-triage-severe/10',
    textClass: 'text-triage-severe',
    badgeClass: 'triage-severe'
  }
};

export const TriageResultCard = ({ level, possibleCauses }: TriageResultCardProps) => {
  const config = triageConfig[level];
  const Icon = config.icon;

  return (
    <Card className={`border-none shadow-card overflow-hidden animate-fade-in-up`}>
      <div className={`${config.bgClass} p-4`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${config.badgeClass} flex items-center justify-center`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${config.textClass}`}>{config.title}</h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-semibold text-foreground mb-3">Possible Causes</h4>
        <ul className="space-y-2">
          {possibleCauses.map((cause, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${config.badgeClass}`} />
              <span className="text-sm text-muted-foreground">{cause}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
