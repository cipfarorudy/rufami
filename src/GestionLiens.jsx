import React, { useState } from "react";
import { useLocalStorage } from './hooks/useLocalStorage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding, faGraduationCap, faCloud, faEnvelope, faBank, faIdCard, faGlobe, faHandshake, faLock, faLink
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp, faTelegram, faFacebook, faInstagram, faTiktok, faTwitter, faLinkedin, faYoutube, faGoogleDrive, faPaypal
} from "@fortawesome/free-brands-svg-icons";

const defaultLinks = [
  // Professionnel
  { label: "Formations CIPFARO", url: "https://cipfaro-formations.com/", category: "pro", icon: faGraduationCap },
  { label: "Bêtapros Formanoo", url: "https://betapros.formanoo.org/", category: "pro", icon: faBuilding },
  { label: "Faromirval", url: "https://www.faromirval.com/", category: "pro", icon: faBuilding },
  { label: "Bungalows Azure", url: "https://bungalosazure.site/", category: "pro", icon: faCloud },
  { label: "Certification ICPF", url: "https://certif-icpf.org/certifies/rudy-faro", category: "pro", icon: faIdCard },
  { label: "CERES EDOF", url: "https://ceres-edof.fr/", category: "pro", icon: faGraduationCap },
  // Officiel
  { label: "Farorudy.fr", url: "https://farorudy.fr/", category: "officiel", icon: faGlobe },
  { label: "Farorudy.com", url: "https://farorudy.com/", category: "officiel", icon: faGlobe },
  { label: "CIPFARO.org", url: "https://cipfaro.org/", category: "officiel", icon: faGlobe },
  // Public
  { label: "Chorus Pro", url: "https://chorus-pro.gouv.fr/", category: "public", icon: faHandshake },
  { label: "Portail Emploi", url: "https://www.pole-emploi-partenaires.fr/", category: "public", icon: faHandshake },
  // Cloud
  { label: "Serveur Azure (IP)", url: "https://20.163.58.153/", category: "cloud", icon: faCloud },
  { label: "Google Drive", url: "https://drive.google.com/", category: "cloud", icon: faGoogleDrive },
  // Messagerie
  { label: "Outlook", url: "https://outlook.office.com/", category: "messagerie", icon: faEnvelope },
  { label: "WhatsApp", url: "https://wa.me/596690570846", category: "messagerie", icon: faWhatsapp },
  { label: "Télégramme", url: "https://t.me/", category: "messagerie", icon: faTelegram },
  // Banque
  { label: "La Banque Postale", url: "https://www.labanquepostale.fr/", category: "banque", icon: faBank },
  { label: "Banxo", url: "https://www.banxo.com/", category: "banque", icon: faBank },
  { label: "Qonto", url: "https://www.qonto.com/", category: "banque", icon: faBank },
  { label: "PayPal", url: "https://www.paypal.com/", category: "banque", icon: faPaypal },
  // Identité
  { label: "FranceConnect", url: "https://franceconnect.gouv.fr/", category: "identite", icon: faIdCard },
  { label: "Service-Public.fr", url: "https://www.service-public.fr/", category: "identite", icon: faLock },
  // Réseaux sociaux
  { label: "Facebook", url: "https://facebook.com/", category: "social", icon: faFacebook },
  { label: "Instagram", url: "https://instagram.com/", category: "social", icon: faInstagram },
  { label: "TikTok", url: "https://tiktok.com/", category: "social", icon: faTiktok },
  { label: "Twitter / X", url: "https://twitter.com/", category: "social", icon: faTwitter },
  { label: "LinkedIn", url: "https://linkedin.com/", category: "social", icon: faLinkedin },
  { label: "YouTube", url: "https://youtube.com/", category: "social", icon: faYoutube }
];

const categories = [
  { key: "pro", label: "🏢 Entreprises, Formations & Projets" },
  { key: "officiel", label: "🌐 Sites Web Officiels" },
  { key: "public", label: "💼 Plateformes Publiques & Partenariats" },
  { key: "cloud", label: "☁️ Cloud, Hébergement & Infrastructure" },
  { key: "messagerie", label: "📧 Communication & Messagerie" },
  { key: "banque", label: "🏦 Banques, Comptes & Paiements" },
  { key: "identite", label: "🔐 Identité Numérique & Démarches Administratives" },
  { key: "social", label: "🌍 Réseaux Sociaux & Communication Digitale" }
];

function GestionLiens() {
  const [links, setLinks] = useLocalStorage('liensPerso', defaultLinks);
  const [form, setForm] = useState({ label: "", url: "", category: "pro", icon: "" });
  const [editIndex, setEditIndex] = useState(null);

  const saveLinks = (newLinks) => {
    setLinks(newLinks);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.label || !form.url) return;
    saveLinks([...links, { ...form }]);
    setForm({ label: "", url: "", category: "pro", icon: "" });
  };

  const handleDelete = (idx) => {
    saveLinks(links.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setForm(links[idx]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editIndex === null) return;
    const newLinks = links.map((l, i) => (i === editIndex ? { ...form } : l));
    saveLinks(newLinks);
    setEditIndex(null);
    setForm({ label: "", url: "", category: "pro", icon: "" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Gestion des liens rapides</h2>
      <form onSubmit={editIndex === null ? handleAdd : handleUpdate} className="flex flex-col md:flex-row gap-2 mb-4">
        <input type="text" placeholder="Nom du lien" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} className="px-2 py-1 rounded border" required />
        <input type="url" placeholder="URL" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} className="px-2 py-1 rounded border" required />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="px-2 py-1 rounded border">
          {categories.map(cat => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">{editIndex === null ? "Ajouter" : "Modifier"}</button>
        {editIndex !== null && (
          <button type="button" onClick={() => { setEditIndex(null); setForm({ label: "", url: "", category: "pro", icon: "" }); }} className="bg-gray-400 text-white px-3 py-1 rounded">Annuler</button>
        )}
      </form>
      <ul className="space-y-2">
        {links.map((l, idx) => (
          <li key={idx} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded shadow">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={l.icon || faLink} />
              <span className="font-semibold">{l.label}</span>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Ouvrir</a>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => handleEdit(idx)} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
              <button onClick={() => handleDelete(idx)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
          </li>
        ))}
        {links.length === 0 && <li className="text-gray-500">Aucun lien enregistré.</li>}
      </ul>
    </div>
  );
}

export default GestionLiens;
