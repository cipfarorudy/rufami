import React, { useState } from "react";

function CoffreFort({ showToast }) {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("coffreFort");
    return saved ? JSON.parse(saved) : [];
  });
  const [site, setSite] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    localStorage.setItem("coffreFort", JSON.stringify(newEntries));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!site || !login || !password) return;
    const newEntries = [...entries, { site, login, password }];
    saveEntries(newEntries);
    setSite("");
    setLogin("");
    setPassword("");
    showToast && showToast("Ajouté au coffre-fort");
  };

  const handleDelete = (idx) => {
    const newEntries = entries.filter((_, i) => i !== idx);
    saveEntries(newEntries);
    showToast && showToast("Supprimé du coffre-fort");
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setSite(entries[idx].site);
    setLogin(entries[idx].login);
    setPassword(entries[idx].password);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editIndex === null) return;
    const newEntries = entries.map((entry, i) =>
      i === editIndex ? { site, login, password } : entry
    );
    saveEntries(newEntries);
    setEditIndex(null);
    setSite("");
    setLogin("");
    setPassword("");
    showToast && showToast("Modifié dans le coffre-fort");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Coffre-fort (codes & mots de passe)</h2>
      <form onSubmit={editIndex === null ? handleAdd : handleUpdate} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Site ou service"
          value={site}
          onChange={e => setSite(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <input
          type="text"
          placeholder="Identifiant"
          value={login}
          onChange={e => setLogin(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <input
          type="password"
          placeholder="Mot de passe/code"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          {editIndex === null ? "Ajouter" : "Modifier"}
        </button>
        {editIndex !== null && (
          <button type="button" onClick={() => { setEditIndex(null); setSite(""); setLogin(""); setPassword(""); }} className="bg-gray-400 text-white px-3 py-1 rounded">Annuler</button>
        )}
      </form>
      <ul className="space-y-2">
        {entries.map((entry, idx) => (
          <li key={idx} className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-700 p-2 rounded shadow">
            <div className="flex-1">
              <span className="font-semibold">{entry.site}</span> — <span>{entry.login}</span> — <span className="font-mono">••••••••</span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => handleEdit(idx)} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
              <button onClick={() => handleDelete(idx)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
          </li>
        ))}
        {entries.length === 0 && <li className="text-gray-500">Aucune entrée enregistrée.</li>}
      </ul>
    </div>
  );
}

export default CoffreFort;
