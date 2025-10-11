import React, { useState } from "react";

function CitoyenAction({ showToast }) {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem("citoyenActionLinks");
    return saved ? JSON.parse(saved) : [
      { name: "CitoyenAction", url: "https://citoyenaction-c7hdbehbdza9acha.westus3-01.azurewebsites.net" }
    ];
  });
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const saveLinks = (newLinks) => {
    setLinks(newLinks);
    localStorage.setItem("citoyenActionLinks", JSON.stringify(newLinks));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !url) return;
    const newLinks = [...links, { name, url }];
    saveLinks(newLinks);
    setName("");
    setUrl("");
    showToast && showToast("Lien ajouté");
  };

  const handleDelete = (idx) => {
    const newLinks = links.filter((_, i) => i !== idx);
    saveLinks(newLinks);
    showToast && showToast("Lien supprimé");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Liens CitoyenAction</h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom du service"
          value={name}
          onChange={e => setName(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="px-2 py-1 rounded border"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Ajouter</button>
      </form>
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={idx} className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded shadow">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">{link.name}</a>
            <button onClick={() => handleDelete(idx)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
          </li>
        ))}
        {links.length === 0 && <li className="text-gray-500">Aucun lien enregistré.</li>}
      </ul>
    </div>
  );
}

export default CitoyenAction;
