import React, { useState } from 'react';
import CallAzureApiButton from './CallAzureApiButton';

// Connexion API désactivée pour accès libre à l'espace de travail

const WorkspaceCollaboratif = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Projet Alpha' },
    { id: 2, name: 'Projet Beta' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);

  const addProject = (name) => {
    const newProject = { id: Date.now(), name };
    setProjects([...projects, newProject]);
  };

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

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
