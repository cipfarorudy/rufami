import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.exemple.com/events'; // Remplacez par l’URL de votre API

const EventsFromAPI = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur API:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Événements synchronisés</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsFromAPI;
