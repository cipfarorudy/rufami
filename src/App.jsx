import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import AzureAuthProvider from './AzureAuthProvider';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { t } from './i18n/translations';
import GoogleAuth from './GoogleAuth';
import NotFound from './NotFound';
import {
  LayoutDashboard,
  Users,
  Calendar as CalendarIcon,
  Notepad,
  Users2,
  Lock,
  Zap,
  BookOpen,
  Link2,
  FileText,
  Info,
} from 'lucide-react';

// Lazy loaded route components
const EventsFromAPI = lazy(() => import('./EventsFromAPI'));
const WorkspaceCollaboratif = lazy(() => import('./WorkspaceCollaboratif'));
const Agenda = lazy(() => import('./Agenda'));
const Calendar = lazy(() => import('./Calendar'));
const BlocNote = lazy(() => import('./BlocNote'));
const Annuaire = lazy(() => import('./Annuaire'));
const CoffreFort = lazy(() => import('./CoffreFort'));
const CitoyenAction = lazy(() => import('./CitoyenAction'));
const FormationsCIPFARO = lazy(() => import('./FormationsCIPFARO'));
const GestionLiens = lazy(() => import('./GestionLiens'));
const FormadevisIntegration = lazy(() => import('./FormadevisIntegration'));
const About = lazy(() => import('./About'));

// Composant NavLink amélioré avec icônes
const NavLink = ({ to, label, icon: IconComponent, dataTestId }) => {
  const isActive = window.location.pathname === to;
  return (
    <Link
      to={to}
      data-testid={dataTestId || to.substring(1) || 'nav-dashboard'}
      className={`nav-link px-3 py-2 flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 border-b-2 ${
        isActive
          ? 'text-primary-600 dark:text-primary-400 border-primary-600'
          : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400'
      }`}
    >
      {IconComponent && <IconComponent size={18} className="flex-shrink-0" />}
      <span>{label}</span>
    </Link>
  );
};

const LanguageSwitcher = () => {
  const { lang, changeLang } = useLanguage();
  return (
    <div className="flex gap-1 bg-white dark:bg-gray-700 rounded-full p-0.5 shadow-sm">
      {['fr', 'en', 'es'].map(l => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            lang === l
              ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
          title={t(`lang.${l}`, lang)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const AppContent = () => {
  const { lang } = useLanguage();
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header avec gradient moderne */}
        <header className="bg-gradient-header shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">R</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Rufami</h1>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <GoogleAuth />
              </div>
            </div>
          </div>
        </header>

        {/* Navigation redessinée */}
        <nav aria-label="Navigation principale" className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-0.5 overflow-x-auto scrollbar-hide py-0">
              <NavLink to="/" icon={LayoutDashboard} label={t('nav.dashboard', lang)} dataTestId="nav-dashboard" />
              <NavLink to="/collaboratif" icon={Users} label={t('nav.collaboratif', lang)} dataTestId="nav-collaboratif" />
              <NavLink to="/agenda" icon={CalendarIcon} label={t('nav.agenda', lang)} dataTestId="nav-agenda" />
              <NavLink to="/calendrier" icon={CalendarIcon} label={t('nav.calendar', lang)} dataTestId="nav-calendrier" />
              <NavLink to="/blocnote" icon={Notepad} label={t('nav.notes', lang)} dataTestId="nav-blocnote" />
              <NavLink to="/annuaire" icon={Users2} label={t('nav.directory', lang)} dataTestId="nav-annuaire" />
              <NavLink to="/coffrefort" icon={Lock} label={t('nav.vault', lang)} dataTestId="nav-coffrefort" />
              <NavLink to="/citoyenaction" icon={Zap} label={t('nav.citizen', lang)} dataTestId="nav-citoyenaction" />
              <NavLink to="/formations" icon={BookOpen} label={t('nav.training', lang)} dataTestId="nav-formations" />
              <NavLink to="/liens" icon={Link2} label={t('nav.links', lang)} dataTestId="nav-liens" />
              <NavLink to="/devis" icon={FileText} label={t('nav.devis', lang)} dataTestId="nav-devis" />
              <NavLink to="/about" icon={Info} label={t('ui.about', lang)} dataTestId="nav-about" />
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <main id="contenu-principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
          <Suspense fallback={
            <div role="status" aria-live="polite" className="p-8 text-center" data-testid="lazy-loading">
              <div className="animate-pulse flex justify-center items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3 font-medium">Chargement des modules...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<EventsFromAPI />} />
              <Route path="/collaboratif" element={<WorkspaceCollaboratif />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/calendrier" element={<Calendar />} />
              <Route path="/blocnote" element={<BlocNote />} />
              <Route path="/annuaire" element={<Annuaire />} />
              <Route path="/coffrefort" element={
                <>
                  <AuthenticatedTemplate>
                    <CoffreFort />
                  </AuthenticatedTemplate>
                  <UnauthenticatedTemplate>
                    <div className="bg-yellow-100 border border-yellow-300 p-4 rounded" data-testid="auth-required">
                      Veuillez vous connecter pour accéder au coffre-fort.
                    </div>
                  </UnauthenticatedTemplate>
                </>
              } />
              <Route path="/citoyenaction" element={<CitoyenAction />} />
              <Route path="/formations" element={<FormationsCIPFARO />} />
              <Route path="/liens" element={<GestionLiens />} />
              <Route path="/devis" element={<FormadevisIntegration />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <AzureAuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AzureAuthProvider>
  );
}
