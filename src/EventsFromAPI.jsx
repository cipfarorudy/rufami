// Données initiales
// À adapter selon votre backend
import React, { useState } from 'react';
import CoffreFort from "./CoffreFort.jsx";
import CitoyenAction from "./CitoyenAction.jsx";
import FormationsCIPFARO from "./FormationsCIPFARO.jsx";
import GestionLiens from "./GestionLiens.jsx";
// Correction de l’URL d’API pour éviter l’erreur Failed to fetch (à adapter selon votre backend déployé)
const API_URL = 'https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net/api/events';

// Composant Toast
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
      {message}
      <button onClick={onClose} className="ml-4 text-white font-bold">×</button>
    </div>
  );
}

function AlertBanner({ error, onClose, onRetry }) {
  const [shaking, setShaking] = React.useState(false);
  React.useEffect(() => {
    if (error) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Copier le message
  const handleCopy = () => {
    if (error) navigator.clipboard.writeText(error);
  };

  if (!error) return null;
  return (
    <div className={`fixed top-0 left-0 w-full max-w-2xl mx-auto bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white px-6 py-3 rounded-b-2xl shadow-2xl z-50 flex flex-col md:flex-row justify-between items-center animate-fade-in ${shaking ? 'animate-shake' : ''}`} style={{left: '50%', transform: 'translateX(-50%)'}}>
      <span className="flex items-center gap-4 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>
          <strong className="text-xl">Impossible de récupérer les données.</strong> <br />
          <span className="text-base">Vérifiez votre connexion ou réessayez.</span> <br />
          <span className="text-xs opacity-80">Détail : {error}</span>
        </span>
      </span>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button onClick={handleCopy} className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold shadow hover:bg-red-100 transition">Copier</button>
        {onRetry && <button onClick={onRetry} className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold shadow hover:bg-red-100 transition">Réessayer</button>}
        <a href="https://faq.rufami.fr" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-3 py-1 rounded-lg font-bold shadow hover:bg-blue-100 transition">FAQ</a>
        <button onClick={onClose} className="ml-2 text-white font-bold text-2xl hover:text-red-300 transition">×</button>
      </div>
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.6s;
        }
      `}</style>
    </div>
  );
}

// Switch thème
function ThemeSwitch({ theme, setTheme }) {
  return (
    <button
      className={`mb-4 px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    </button>
  );
}
// Données initiales
const defaultEvents = [
  { id: 1, title: 'Réunion projet', date: '2025-10-12' },
  { id: 2, title: 'Atelier collaboratif', date: '2025-10-15' },
  { id: 3, title: 'Démo client', date: '2025-10-20' }
];
const defaultContacts = [
  { id: 1, name: 'Alice Martin', email: 'alice.martin@email.com', phone: '0601020304' },
  { id: 2, name: 'Bob Dupont', email: 'bob.dupont@email.com', phone: '0605060708' },
  { id: 3, name: 'Carla Durand', email: 'carla.durand@email.com', phone: '0611121314' }
];

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  const setAndStore = v => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [value, setAndStore];
}

function Agenda({ showToast, events, setEvents, onFetch }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const addEvent = e => {
    e.preventDefault();
    if (!title || !date) return;
    const newEvent = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
    setTitle('');
    setDate('');
    if (showToast) showToast('Événement ajouté !');
  };
  const removeEvent = id => {
    setEvents(events.filter(ev => ev.id !== id));
    if (showToast) showToast('Événement supprimé !');
  };

  return (
    <section className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">Agenda</h3>
      <form onSubmit={addEvent} className="flex gap-2 mb-3">
        <label htmlFor="agenda-date" className="sr-only">Date de l'événement</label>
        <input id="agenda-date" type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-2 py-1" required aria-label="Date de l'événement" />
        <label htmlFor="agenda-title" className="sr-only">Titre de l'événement</label>
        <input id="agenda-title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="border rounded px-2 py-1" required aria-label="Titre de l'événement" />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Ajouter</button>
      </form>
      <button onClick={onFetch} className="mb-2 bg-indigo-600 text-white px-3 py-1 rounded">Rafraîchir depuis l'API</button>
      <ul>
        {events.map(ev => (
          <li key={ev.id} className="flex justify-between items-center py-1 border-b">
            <span>{ev.date} : {ev.title}</span>
            <button onClick={() => removeEvent(ev.id)} className="text-red-500 hover:underline text-sm">Supprimer</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Calendar() {
  const [events] = useLocalStorage('agendaEvents', defaultEvents);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventDays = events.map(ev => parseInt(ev.date.split('-')[2], 10));
  return (
    <section className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">Calendrier ({now.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })})</h3>
      <div className="grid grid-cols-7 gap-1 max-w-xs">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isEvent = eventDays.includes(day);
          return (
            <div key={day} className={`p-2 border rounded text-center ${isEvent ? 'bg-blue-100 font-bold' : 'bg-gray-50'}`}>{day}</div>
          );
        })}
      </div>
    </section>
  );
}

function BlocNote({ showToast }) {
  const [note, setNote] = useLocalStorage('blocNote', '');
  const handleChange = e => {
    setNote(e.target.value);
    if (showToast) showToast('Note enregistrée !');
  };
  return (
    <section className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">Bloc-notes</h3>
      <textarea value={note} onChange={handleChange} rows={5} className="border rounded w-full p-2" placeholder="Écrivez vos notes ici..." />
    </section>
  );
}

function Annuaire({ showToast }) {
  const [contacts, setContacts] = useLocalStorage('annuaireContacts', defaultContacts);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = e => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    const newContact = { id: Date.now(), name, email, phone };
    setContacts([...contacts, newContact]);
    setName('');
    setEmail('');
    setPhone('');
    if (showToast) showToast('Contact ajouté !');
  };
  const removeContact = id => {
    setContacts(contacts.filter(c => c.id !== id));
    if (showToast) showToast('Contact supprimé !');
  };

  return (
    <section className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">Annuaire</h3>
      <form onSubmit={addContact} className="flex flex-col gap-2 mb-3">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom" className="border rounded px-2 py-1" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border rounded px-2 py-1" required />
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" className="border rounded px-2 py-1" required />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Ajouter</button>
      </form>
      <ul>
        {contacts.map(c => (
          <li key={c.id} className="flex justify-between items-center py-1 border-b">
            <span><strong>{c.name}</strong> — {c.email} — {c.phone}</span>
            <button onClick={() => removeContact(c.id)} className="text-red-500 hover:underline text-sm">Supprimer</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DashboardPresentation() {
  return (
    <div className="p-8 bg-white rounded shadow text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">Bienvenue sur votre bureau collaboratif</h2>
      <p className="text-gray-600 mb-4">Accédez à tous vos outils depuis le tableau de bord : agenda, calendrier, bloc-notes, annuaire, coffre-fort, liens rapides, etc.</p>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <span className="px-4 py-2 bg-blue-100 rounded text-blue-700">Organisation</span>
        <span className="px-4 py-2 bg-green-100 rounded text-green-700">Collaboration</span>
        <span className="px-4 py-2 bg-yellow-100 rounded text-yellow-700">Sécurité</span>
        <span className="px-4 py-2 bg-purple-100 rounded text-purple-700">Productivité</span>
      </div>
    </div>
  );
}

const EventsFromAPI = () => {
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useLocalStorage('agendaEvents', defaultEvents);

  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  }, [theme]);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };
  const showError = msg => {
    setError(msg);
    setTimeout(() => setError(''), 5000);
  };

  const fetchEventsFromAPI = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Réponse non valide');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
        showToast('Événements chargés depuis l’API !');
      } else {
        showError('Format de données inattendu.');
      }
    } catch (err) {
      showError('Erreur lors du chargement API : ' + err.message);
    }
  };

  return (
    <div className={theme === 'dark' ? 'min-h-screen flex bg-gray-900 text-white' : 'min-h-screen flex bg-gray-100 text-gray-900'}>
      {/* Barre latérale */}
      <aside className={theme === 'dark' ? 'w-64 min-h-screen bg-gray-800 text-white flex flex-col p-4 shadow-xl' : 'w-64 min-h-screen bg-white text-gray-900 flex flex-col p-4 shadow-xl'}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Espace collaboratif</h1>
          <span className="text-sm opacity-70">Bureau rangé et fonctionnel</span>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#agenda" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Agenda</a>
          <a href="#calendrier" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Calendrier</a>
          <a href="#blocnote" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Bloc-notes</a>
          <a href="#annuaire" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Annuaire</a>
          <a href="#coffre" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Coffre-fort</a>
          <a href="#liens" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Liens rapides</a>
          <a href="#citoyen" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">CitoyenAction</a>
          <a href="#formations" className="hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-2 rounded">Formations CIPFARO</a>
        </nav>
        <div className="mt-auto pt-8">
          <ThemeSwitch theme={theme} setTheme={setTheme} />
        </div>
      </aside>
      {/* Tableau de bord */}
      <main className="flex-1 p-6">
        <DashboardPresentation />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <section id="liens" className="col-span-1 xl:col-span-3">
            <GestionLiens />
          </section>
          <section id="agenda">
            <Agenda showToast={showToast} events={events} setEvents={setEvents} onFetch={fetchEventsFromAPI} />
          </section>
          <section id="calendrier">
            <Calendar />
          </section>
          <section id="blocnote">
            <BlocNote showToast={showToast} />
          </section>
          <section id="annuaire">
            <Annuaire showToast={showToast} />
          </section>
          <section id="coffre">
            <CoffreFort showToast={showToast} />
          </section>
          <section id="citoyen">
            <CitoyenAction showToast={showToast} />
          </section>
          <section id="formations">
            <FormationsCIPFARO showToast={showToast} />
          </section>
        </div>
        <AlertBanner error={error} onClose={() => setError('')} onRetry={error ? fetchEventsFromAPI : null} />
        <Toast message={toast} onClose={() => setToast('')} />
      </main>
    </div>
  );
};

export default EventsFromAPI;
