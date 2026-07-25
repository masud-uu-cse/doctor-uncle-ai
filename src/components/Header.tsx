import { Stethoscope, Home, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const resolvedActive =
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/history')
      ? 'history'
      : 'triage';

  const navItems = [
    { key: 'home',    icon: <Home className="w-4 h-4" />,        label: t('landingPage.nav.home'),    path: '/' },
    { key: 'triage',  icon: <Stethoscope className="w-4 h-4" />, label: t('landingPage.nav.triage'),  path: '/doctor-uncle' },
    { key: 'history', icon: <Clock className="w-4 h-4" />,       label: t('landingPage.nav.history'), path: '/history' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">

        {/* Logo / brand */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => navigate('/')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="absolute -bottom-1 -right-1 text-lg">👨‍⚕️</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground leading-tight">
              {t('header.title')}
            </h1>
            <span className="text-xs text-muted-foreground">
              {t('header.subtitle')}
            </span>
          </div>
        </div>

        {/* Desktop nav tabs — hidden on mobile (BottomNav handles mobile) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = resolvedActive === item.key;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-700 dark:text-teal-400 border border-teal-500/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
