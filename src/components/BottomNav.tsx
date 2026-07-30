import { Home, Stethoscope, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavItem {
  key: 'home' | 'triage' | 'history';
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface BottomNavProps {
  /** Which tab to highlight as active. Defaults to auto-detecting from current path. */
  activeTab?: 'home' | 'triage' | 'history';
  /** Optional extra action when the Triage tab is clicked (e.g. reset session). */
  onTriageClick?: () => void;
}

export const BottomNav = ({ activeTab, onTriageClick }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const resolvedActive =
    activeTab ??
    (location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/history')
      ? 'history'
      : 'triage');

  const items: NavItem[] = [
    {
      key: 'home',
      icon: <Home className="w-5 h-5" />,
      label: t('landingPage.nav.home'),
      path: '/',
    },
    {
      key: 'triage',
      icon: <Stethoscope className="w-5 h-5" />,
      label: t('landingPage.nav.triage'),
      path: '/doctor-uncle',
    },
    {
      key: 'history',
      icon: <Clock className="w-5 h-5" />,
      label: t('landingPage.nav.history'),
      path: '/history',
    },
  ];

  const handleClick = (item: NavItem) => {
    if (item.key === 'triage' && onTriageClick) {
      onTriageClick();
    }
    navigate(item.path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {items.map((item) => {
          const isActive = resolvedActive === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center gap-1 font-medium text-sm py-1 transition-colors ${
                isActive
                  ? 'text-teal-700 dark:text-teal-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive ? (
                <div className="p-1 rounded-full bg-teal-100/80 dark:bg-teal-900/50">
                  {item.icon}
                </div>
              ) : (
                item.icon
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
