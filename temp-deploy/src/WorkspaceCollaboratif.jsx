import React, { useEffect, useState } from 'react';
import CallAzureApiButton from './CallAzureApiButton';

const API_URL = 'https://api.exemple.com/workspace'; // Remplacez par l’URL réelle

const WorkspaceCollaboratif = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/projects`).then(res => res.json()),
      fetch(`${API_URL}/users`).then(res => res.json())
    ]).then(([projectsData, usersData]) => {
      setProjects(projectsData);
      setUsers(usersData);
      setLoading(false);
    });
  }, []);

  const addProject = (name) => {
    fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(newProject => setProjects([...projects, newProject]));
  };

  const removeUser = (id) => {
    fetch(`${API_URL}/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(u => u.id !== id)));
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Espace de travail collaboratif (API)</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4" onClick={() => addProject('Nouveau projet')}>Ajouter projet</button>
      <CallAzureApiButton />
      <ul className="mb-6">
        {projects.map(p => <li key={p.id} className="p-2 bg-gray-100 rounded mb-2">{p.name}</li>)}
      </ul>
      <h3 className="font-medium mb-2">Utilisateurs</h3>
      <ul>
        {users.map(u => (
          <li key={u.id} className="p-2 bg-gray-100 rounded mb-2 flex justify-between items-center">
            <span>{u.name}</span>
            <button className="text-red-600" onClick={() => removeUser(u.id)}>Retirer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceCollaboratif;
