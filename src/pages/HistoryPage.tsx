import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { useHistory, AssessmentRecord } from '@/hooks/useHistory';
import { TriageResultCard } from '@/components/TriageResultCard';
import { MedicineSuggestionCard } from '@/components/MedicineSuggestionCard';
import { HomeRemediesCard } from '@/components/HomeRemediesCard';
import { SpecialistRecommendation } from '@/components/SpecialistRecommendation';
import { NextStepsCard } from '@/components/NextStepsCard';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Trash2,
  ClipboardList,
  User,
  Calendar,
  ChevronRight,
  AlertTriangle,
  Stethoscope,
  Download,
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { downloadAssessmentPDF } from '@/utils/generatePDF';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const severityColor: Record<string, string> = {
  mild: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  moderate: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  severe: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
};

const severityIcon: Record<string, string> = {
  mild: '🟢',
  moderate: '🟡',
  severe: '🔴',
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ─────────────────────────────────────────────
// History list card
// ─────────────────────────────────────────────
interface HistoryCardProps {
  record: AssessmentRecord;
  onSelect: () => void;
  onDelete: () => void;
}

const HistoryCard = ({ record, onSelect, onDelete }: HistoryCardProps) => {
  const { t } = useTranslation();
  const level = record.result.triageLevel;
  const badge = severityColor[level] ?? severityColor.moderate;

  return (
    <div className="group relative flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-teal-500/40 hover:bg-card/80 transition-all duration-200 cursor-pointer shadow-sm">
      {/* Clickable main area */}
      <div className="flex-1 min-w-0" onClick={onSelect}>
        {/* Severity badge + date */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge}`}>
            {severityIcon[level]} {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {formatDate(record.createdAt)}
          </span>
        </div>

        {/* Patient info */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <User className="w-3.5 h-3.5 text-teal-500" />
          <span className="text-sm font-semibold text-foreground truncate">
            {record.patientInfo.name || t('historyPage.unknown')}
          </span>
          {record.patientInfo.age && (
            <span className="text-xs text-muted-foreground">· {record.patientInfo.age} {t('historyPage.yrs')}</span>
          )}
          {record.patientInfo.gender && (
            <span className="text-xs text-muted-foreground">· {record.patientInfo.gender}</span>
          )}
        </div>

        {/* Symptom */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          <span className="font-medium text-foreground/70">{t('historyPage.chiefComplaint')}: </span>
          {record.initialSymptom}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
              title={t('historyPage.deleteRecord')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('historyPage.deleteTitle')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('historyPage.deleteDesc', { name: record.patientInfo.name || t('historyPage.unknown') })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('historyPage.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={onDelete}
              >
                {t('historyPage.delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <button
          className="p-1.5 rounded-lg text-muted-foreground hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"
          onClick={onSelect}
          title={t('historyPage.viewDetails')}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Detail view
// ─────────────────────────────────────────────
interface DetailViewProps {
  record: AssessmentRecord;
  onBack: () => void;
  onDelete: () => void;
}

const DetailView = ({ record, onBack, onDelete }: DetailViewProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          {t('historyPage.backToHistory')}
        </Button>

        <div className="flex items-center gap-2">
          {/* Download PDF */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-teal-600 border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30"
            onClick={() => downloadAssessmentPDF(record)}
          >
            <Download className="w-3.5 h-3.5" />
            {t('historyPage.downloadPdf')}
          </Button>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-red-500 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/30">
                <Trash2 className="w-3.5 h-3.5" />
                {t('historyPage.delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('historyPage.deleteTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('historyPage.deleteDescGeneric')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('historyPage.cancel')}</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={onDelete}>
                  {t('historyPage.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Summary header */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 via-primary/10 to-secondary border border-teal-500/20">
        <span className="text-3xl">👨‍⚕️</span>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg text-foreground">{t('historyPage.assessmentReport')}</h2>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
            <span className="font-medium">{t('historyPage.chiefComplaint')}: </span>
            {record.initialSymptom}
          </p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-teal-600 dark:text-teal-400 font-semibold">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {record.patientInfo.name}</span>
            {record.patientInfo.age && <span>· {record.patientInfo.age} {t('historyPage.yrs')}</span>}
            {record.patientInfo.gender && <span>· {record.patientInfo.gender}</span>}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(record.createdAt)}
          </p>
        </div>
      </div>

      <TriageResultCard
        level={record.result.triageLevel}
        possibleCauses={record.result.possibleCauses}
      />
      <MedicineSuggestionCard medicines={record.result.medicines} />
      <HomeRemediesCard remedies={record.result.homeRemedies} />
      <SpecialistRecommendation specialist={record.result.specialist} />
      <NextStepsCard steps={record.result.nextSteps} onStartOver={onBack} />
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const HistoryPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { records, deleteRecord, clearAll } = useHistory();
  const [selected, setSelected] = useState<AssessmentRecord | null>(null);

  const handleDelete = (id: string) => {
    deleteRecord(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-24 md:pb-8">
      <Header />

      <main className="flex-1 container max-w-2xl py-6 px-4">
        {selected ? (
          <DetailView
            record={selected}
            onBack={() => setSelected(null)}
            onDelete={() => handleDelete(selected.id)}
          />
        ) : (
          <div className="space-y-6 animate-fade-in-up">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-teal-500" />
                <h1 className="text-xl font-bold text-foreground">{t('historyPage.title')}</h1>
                {records.length > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                    {records.length}
                  </span>
                )}
              </div>

              {records.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs text-red-500 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/30">
                      <Trash2 className="w-3.5 h-3.5" />
                      {t('historyPage.clearAll')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('historyPage.clearTitle')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('historyPage.clearDesc', { count: records.length })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('historyPage.cancel')}</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={clearAll}>
                        {t('historyPage.clearAll')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            {/* Empty state */}
            {records.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="p-5 rounded-full bg-teal-500/10 border border-teal-500/20">
                  <AlertTriangle className="w-10 h-10 text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('historyPage.noRecordsTitle')}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('historyPage.noRecordsDesc')}
                  </p>
                </div>
                <Button
                  className="mt-2 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white gap-2"
                  onClick={() => navigate('/doctor-uncle')}
                >
                  <Stethoscope className="w-4 h-4" />
                  {t('historyPage.startAssessment')}
                </Button>
              </div>
            )}

            {/* History list */}
            <div className="space-y-3">
              {records.map(record => (
                <HistoryCard
                  key={record.id}
                  record={record}
                  onSelect={() => setSelected(record)}
                  onDelete={() => handleDelete(record.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav activeTab="history" />
    </div>
  );
};

export default HistoryPage;
