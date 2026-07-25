import { useRef } from 'react';
import { ArrowRight, Heart, AlertTriangle, MessageSquare, Home, Stethoscope, Clock, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { SymptomInput } from '@/components/SymptomInput';

interface LandingPageProps {
  onStartAssessment: (symptom: string) => void;
  onOpenHistory?: () => void;
}

export const LandingPage = ({ onStartAssessment }: LandingPageProps) => {
  const { t } = useTranslation();
  const inputSectionRef = useRef<HTMLDivElement>(null);

  const scrollToInput = () => {
    inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 pb-20 md:pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/90 via-emerald-50/40 to-background dark:from-teal-950/40 dark:via-slate-950/80 dark:to-background pt-8 pb-12 px-4 border-b border-border/50">
        <div className="container max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{t('landingPage.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-tight">
            {t('landingPage.title').split("'Doctor Uncle'")[0]}
            <span className="text-teal-700 dark:text-teal-400 underline decoration-teal-400/40 underline-offset-4">
              'Doctor Uncle'
            </span>
            {t('landingPage.title').split("'Doctor Uncle'")[1]}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t('landingPage.subtitle')}
          </p>

          {/* CTA Button */}
          <Button
            onClick={scrollToInput}
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-lg hover:shadow-teal-500/25 transition-all duration-200 group gap-3"
          >
            <span>{t('landingPage.ctaButton')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Doctor Hero Image Card */}
          <div className="w-full max-w-xl mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-card dark:border-slate-800 bg-card">
            <img
              src="/images/doctor_uncle_hero.png"
              alt="Doctor Uncle AI Assistant"
              className="w-full h-auto object-cover max-h-[380px] hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-10">
        
        {/* Input Trigger Section */}
        <div ref={inputSectionRef} className="scroll-mt-20">
          <SymptomInput onSubmit={onStartAssessment} />
        </div>

        {/* The Tradition of Care Section */}
        <Card className="border-none shadow-md bg-card dark:bg-slate-900/90 overflow-hidden relative border border-border/60">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            <h3 className="text-xl font-bold text-foreground tracking-tight">
              {t('landingPage.traditionTitle')}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {t('landingPage.traditionText')}
            </p>

            <blockquote className="border-l-4 border-teal-500 dark:border-teal-400 pl-4 py-2 my-2 bg-teal-50/50 dark:bg-teal-950/40 rounded-r-lg text-xs md:text-sm text-foreground/90 italic">
              {t('landingPage.traditionQuote')}
            </blockquote>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground px-1 tracking-tight">
            {t('landingPage.howItWorksTitle')}
          </h3>

          <div className="grid gap-4">
            {/* Step 1 */}
            <Card className="border border-border/80 shadow-xs bg-card dark:bg-slate-900 hover:border-teal-500/50 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-teal-700 dark:bg-teal-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-base">
                    {t('landingPage.step1Title')}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {t('landingPage.step1Desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border border-border/80 shadow-xs bg-card dark:bg-slate-900 hover:border-teal-500/50 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-teal-700 dark:bg-teal-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-base">
                    {t('landingPage.step2Title')}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {t('landingPage.step2Desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border border-border/80 shadow-xs bg-card dark:bg-slate-900 hover:border-teal-500/50 transition-colors">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-teal-700 dark:bg-teal-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-base">
                    {t('landingPage.step3Title')}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {t('landingPage.step3Desc')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clinical Logic & Family Warmth Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border/60 group">
          <img
            src="/images/doctor_uncle_app_holding.png"
            alt="Clinical Logic Family Warmth"
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-8">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl max-w-xs shadow-lg">
              <p className="font-semibold text-base md:text-lg tracking-wide">
                {t('landingPage.bannerTag')}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Card */}
        <Card className="border-amber-200/80 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 shadow-xs">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs md:text-sm uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{t('landingPage.disclaimerTitle')}</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-amber-800/90 dark:text-amber-300/90">
              {t('landingPage.disclaimerText')}
            </p>
          </CardContent>
        </Card>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card/50 py-8 px-4 text-center text-xs text-muted-foreground">
        <div className="container max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 font-bold text-sm text-foreground">
            <span>👨‍⚕️</span>
            <span>Doctor Uncle</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">{t('landingPage.footer.privacy')}</a>
            <span>•</span>
            <a href="#terms" className="hover:text-foreground transition-colors">{t('landingPage.footer.terms')}</a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-foreground transition-colors">{t('landingPage.footer.disclaimer')}</a>
            <span>•</span>
            <a href="#contact" className="hover:text-foreground transition-colors">{t('landingPage.footer.contact')}</a>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            © {new Date().getFullYear()} Doctor Uncle AI. Built with care for family health.
          </p>
        </div>
      </footer>

      {/* Floating Action Button (FAB) for mobile/desktop */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
        <Button
          onClick={scrollToInput}
          size="icon"
          className="w-14 h-14 rounded-full bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-xl hover:scale-105 transition-all duration-200"
          title={t('landingPage.ctaButton')}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>

      {/* Sticky Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-teal-700 dark:text-teal-400 font-medium text-xs py-1"
          >
            <div className="p-1 rounded-full bg-teal-100/80 dark:bg-teal-900/50">
              <Home className="w-5 h-5" />
            </div>
            <span>{t('landingPage.nav.home')}</span>
          </button>

          <button
            onClick={scrollToInput}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <Stethoscope className="w-5 h-5" />
            <span>{t('landingPage.nav.triage')}</span>
          </button>

          <button
            onClick={scrollToInput}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <Clock className="w-5 h-5" />
            <span>{t('landingPage.nav.history')}</span>
          </button>

          <button
            onClick={scrollToInput}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-xs py-1 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>{t('landingPage.nav.profile')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
