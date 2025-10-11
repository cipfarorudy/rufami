import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkspaceCollaboratif from './WorkspaceCollaboratif';
import AzureAuthProvider from './AzureAuthProvider';
import EventsFromAPI from './EventsFromAPI';
import GoogleAuth from './GoogleAuth';
import Agenda from './Agenda';
import Calendar from './Calendar';
import BlocNote from './BlocNote';
import Annuaire from './Annuaire';
import CoffreFort from './CoffreFort';
import CitoyenAction from './CitoyenAction';
import FormationsCIPFARO from './FormationsCIPFARO';
import GestionLiens from './GestionLiens';


const AppContent = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Rufami App</h1>
              <GoogleAuth />
            </div>
          </div>
        </header>
        <nav className="flex space-x-2 bg-gray-100 p-2 border-b">
          <Link to="/" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-dashboard">Tableau de bord</Link>
          <Link to="/collaboratif" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-collaboratif">Collaboratif</Link>
          <Link to="/agenda" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-agenda">Agenda</Link>
          <Link to="/calendrier" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-calendrier">Calendrier</Link>
          <Link to="/blocnote" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-blocnote">Bloc-notes</Link>
          <Link to="/annuaire" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-annuaire">Annuaire</Link>
          <Link to="/coffrefort" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-coffrefort">Coffre-fort</Link>
          <Link to="/citoyenaction" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-citoyenaction">CitoyenAction</Link>
          <Link to="/formations" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-formations">Formations</Link>
          <Link to="/liens" className="px-3 py-2 rounded hover:bg-gray-200" data-testid="nav-liens">Liens rapides</Link>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<EventsFromAPI />} />
            <Route path="/collaboratif" element={<WorkspaceCollaboratif />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/calendrier" element={<Calendar />} />
            <Route path="/blocnote" element={<BlocNote />} />
            <Route path="/annuaire" element={<Annuaire />} />
            <Route path="/coffrefort" element={<CoffreFort />} />
            <Route path="/citoyenaction" element={<CitoyenAction />} />
            <Route path="/formations" element={<FormationsCIPFARO />} />
            <Route path="/liens" element={<GestionLiens />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <AzureAuthProvider>
      <AppContent />
    </AzureAuthProvider>
  );
}
