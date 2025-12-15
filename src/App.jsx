import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import AzureAuthProvider from './AzureAuthProvider';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { t } from './i18n/translations';
import GoogleAuth from './GoogleAuth';

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


const LanguageSwitcher = () => {
  const { lang, changeLang } = useLanguage();
  return (
    <div className="flex gap-1">
      {['fr', 'en', 'es'].map(l => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-2 py-1 rounded text-sm font-semibold transition ${
            lang === l
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Rufami App</h1>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <GoogleAuth />
              </div>
            </div>
          </div>
        </header>
        <nav aria-label="Navigation principale" className="flex space-x-2 bg-gray-100 p-2 border-b overflow-x-auto">
          <Link to="/" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-dashboard">{t('nav.dashboard', lang)}</Link>
          <Link to="/collaboratif" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-collaboratif">{t('nav.collaboratif', lang)}</Link>
          <Link to="/agenda" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-agenda">{t('nav.agenda', lang)}</Link>
          <Link to="/calendrier" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-calendrier">{t('nav.calendar', lang)}</Link>
          <Link to="/blocnote" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-blocnote">{t('nav.notes', lang)}</Link>
          <Link to="/annuaire" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-annuaire">{t('nav.directory', lang)}</Link>
          <Link to="/coffrefort" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-coffrefort">{t('nav.vault', lang)}</Link>
          <Link to="/citoyenaction" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-citoyenaction">{t('nav.citizen', lang)}</Link>
          <Link to="/formations" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-formations">{t('nav.training', lang)}</Link>
          <Link to="/liens" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-liens">{t('nav.links', lang)}</Link>
          <Link to="/devis" className="px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" data-testid="nav-devis">{t('nav.devis', lang)}</Link>
        </nav>
        <main id="contenu-principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
          <Suspense fallback={
            <div role="status" aria-live="polite" className="p-4 text-center text-gray-600" data-testid="lazy-loading">
              Chargement des modules...
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
