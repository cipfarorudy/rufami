import React from 'react';
import WorkspaceCollaboratif from './WorkspaceCollaboratif';
import AzureAuthProvider from './AzureAuthProvider';
import EventsFromAPI from './EventsFromAPI';
import GoogleAuth from './GoogleAuth';


const AppContent = () => {
  console.log('AppContent rendering');
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Rufami App</h1>
            <GoogleAuth />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <WorkspaceCollaboratif />
          </div>
          <div>
            <EventsFromAPI />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  console.log('App rendering');
  return (
    <AzureAuthProvider>
      <AppContent />
    </AzureAuthProvider>
  );
}
