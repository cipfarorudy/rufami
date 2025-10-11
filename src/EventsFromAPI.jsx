// Données initiales
// À adapter selon votre backend
import React, { useState } from 'react';
import CoffreFort from "./CoffreFort.jsx";
import CitoyenAction from "./CitoyenAction.jsx";
import FormationsCIPFARO from "./FormationsCIPFARO.jsx";
const API_URL = 'http://localhost:3000/api/events';

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
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-2 py-1" required />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="border rounded px-2 py-1" required />
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

const EventsFromAPI = () => {
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState('');
  const [events, setEvents] = useLocalStorage('agendaEvents', defaultEvents);

  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  }, [theme]);

  // Props pour modules
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Fonction pour charger les événements depuis l'API
  const fetchEventsFromAPI = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Réponse non valide');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
        showToast('Événements chargés depuis l’API !');
      } else {
        showToast('Format de données inattendu.');
      }
    } catch (err) {
      showToast('Erreur lors du chargement API : ' + err.message);
    }
  };

  return (
    <div className={theme === 'dark' ? 'min-h-screen p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 text-white' : 'min-h-screen p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 text-gray-900'}>
      <div className="col-span-2 flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex gap-2 mb-2 md:mb-0">
          <a href="https://cipfaro-formations.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow">CIPFARO Formations</a>
          <a href="https://farorudy.fr/" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded shadow">Farorudy.fr</a>
          <a href="https://cipfaro.org/" target="_blank" rel="noopener noreferrer" className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow">CIPFARO.org</a>
          <a href="https://www.intercariforef.org/formations/details/organisme-11_1780.html" target="_blank" rel="noopener noreferrer" className="bg-yellow-700 hover:bg-yellow-800 text-white px-4 py-2 rounded shadow">Intercariforef</a>
          <a href="https://www.faromirval.com/" target="_blank" rel="noopener noreferrer" className="bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded shadow">Faromirval</a>
          <a href="https://certif-icpf.org/certifies/rudy-faro" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded shadow">Certification ICPF</a>
          <a href="https://www.linkedin.com/in/rudy-faro/?originalSubdomain=gp" target="_blank" rel="noopener noreferrer" className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded shadow">LinkedIn</a>
          <a href="https://www.youtube.com/@RuddyFARO" target="_blank" rel="noopener noreferrer" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded shadow">YouTube</a>
          <a href="https://www.labanquepostale.fr" target="_blank" rel="noopener noreferrer" className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded shadow">La Banque Postale</a>
          <a href="https://www.banxo.fr" target="_blank" rel="noopener noreferrer" className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded shadow">Banxo</a>
          <a href="https://www.qonto.com/fr" target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-950 text-white px-4 py-2 rounded shadow">Qonto</a>
          <a href="https://chorus-pro.gouv.fr/" target="_blank" rel="noopener noreferrer" className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded shadow">Chorus Pro</a>
          <a href="https://ceres-edof.fr/" target="_blank" rel="noopener noreferrer" className="bg-lime-700 hover:bg-lime-800 text-white px-4 py-2 rounded shadow">CERES EDOF</a>
          <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">PayPal</a>
          <a href="https://authentification-partenaire.portail-emploi.fr/connexion/realms/spe/protocol/openid-connect/auth?client_id=SPE_BASTION_2BA4AB9F29F1F94C4986EC8A0656B0D89A76155CF579768621C4D44A6EAA8EAD&redirect_uri=https%3A%2F%2Fwww.portail-emploi.fr%2Foauth%2Fclient%2Fredirect&response_type=code&state=5DtnERvq4wHSQlRRKeijVvA&code_challenge_method=S256&code_challenge=k4XHIwyEOQlU-fItNYNUdaVJ95kNeFCncblCPDTXrJ8" target="_blank" rel="noopener noreferrer" className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded shadow">Portail Emploi (Connexion Partenaire)</a>
        </div>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>
      <Agenda showToast={showToast} events={events} setEvents={setEvents} onFetch={fetchEventsFromAPI} />
      <Calendar />
      <BlocNote showToast={showToast} />
  <Annuaire showToast={showToast} />
  <CoffreFort showToast={showToast} />
  <CitoyenAction showToast={showToast} />
  <FormationsCIPFARO showToast={showToast} />
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
};

export default EventsFromAPI;
