/**
 * Dictionnaire multilingue FR/EN/ES
 * Structure : { clé: { fr, en, es } }
 */
const translations = {
  // Navigation
  "nav.dashboard": {
    fr: "Tableau de bord",
    en: "Dashboard",
    es: "Panel de Control",
  },
  "nav.collaboratif": {
    fr: "Collaboratif",
    en: "Collaborative",
    es: "Colaborativo",
  },
  "nav.agenda": { fr: "Agenda", en: "Agenda", es: "Agenda" },
  "nav.calendar": { fr: "Calendrier", en: "Calendar", es: "Calendario" },
  "nav.notes": { fr: "Bloc-notes", en: "Notes", es: "Notas" },
  "nav.directory": { fr: "Annuaire", en: "Directory", es: "Directorio" },
  "nav.vault": { fr: "Coffre-fort", en: "Vault", es: "Bóveda" },
  "nav.citizen": {
    fr: "Citoyen & Action",
    en: "Citizen & Action",
    es: "Ciudadano & Acción",
  },
  "nav.training": { fr: "Formations", en: "Training", es: "Capacitación" },
  "nav.links": { fr: "Liens", en: "Links", es: "Enlaces" },

  // Vault
  "vault.title": {
    fr: "Coffre-fort (codes & mots de passe)",
    en: "Vault (codes & passwords)",
    es: "Bóveda (códigos y contraseñas)",
  },
  "vault.locked": {
    fr: "Coffre-fort (verrouillé)",
    en: "Vault (locked)",
    es: "Bóveda (bloqueada)",
  },
  "vault.desc": {
    fr: "Entrez votre mot de passe maître pour déverrouiller vos secrets. (Chiffrement PBKDF2 + AES-GCM)",
    en: "Enter your master password to unlock your secrets. (PBKDF2 + AES-GCM encryption)",
    es: "Ingrese su contraseña maestra para desbloquear sus secretos. (Cifrado PBKDF2 + AES-GCM)",
  },
  "vault.masterPass": {
    fr: "Mot de passe maître",
    en: "Master password",
    es: "Contraseña maestra",
  },
  "vault.unlock": { fr: "Déverrouiller", en: "Unlock", es: "Desbloquear" },
  "vault.decrypting": {
    fr: "Déchiffrement en cours…",
    en: "Decrypting...",
    es: "Descifrando...",
  },
  "vault.site": {
    fr: "Site ou service",
    en: "Site or service",
    es: "Sitio o servicio",
  },
  "vault.login": {
    fr: "Identifiant",
    en: "Username/ID",
    es: "Nombre de usuario",
  },
  "vault.password": {
    fr: "Mot de passe/code",
    en: "Password/code",
    es: "Contraseña/código",
  },
  "vault.add": { fr: "Ajouter", en: "Add", es: "Añadir" },
  "vault.edit": { fr: "Modifier", en: "Edit", es: "Editar" },
  "vault.delete": { fr: "Supprimer", en: "Delete", es: "Eliminar" },
  "vault.cancel": { fr: "Annuler", en: "Cancel", es: "Cancelar" },
  "vault.noItems": {
    fr: "Aucune entrée.",
    en: "No entries.",
    es: "Sin entradas.",
  },
  "vault.added": { fr: "Ajouté", en: "Added", es: "Añadido" },
  "vault.updated": { fr: "Modifié", en: "Updated", es: "Actualizado" },
  "vault.deleted": { fr: "Supprimé", en: "Deleted", es: "Eliminado" },
  "vault.updated_enc": {
    fr: "Entrées mises à jour (chiffrement v2).",
    en: "Entries updated (v2 encryption).",
    es: "Entradas actualizadas (cifrado v2).",
  },
  "vault.migrated": {
    fr: "Migration vers chiffrement PBKDF2 v2 effectuée.",
    en: "Migration to PBKDF2 v2 encryption completed.",
    es: "Migración a cifrado PBKDF2 v2 completada.",
  },
  "vault.footer": {
    fr: "Chiffrement v2 PBKDF2 + AES-GCM côté client. Ne pas utiliser pour secrets critiques (absence de stockage sécurisé serveur / rotation clé).",
    en: "Client-side v2 PBKDF2 + AES-GCM encryption. Not for critical secrets (no server-side secure storage / key rotation).",
    es: "Cifrado v2 PBKDF2 + AES-GCM en el lado del cliente. No utilizar para secretos críticos (sin almacenamiento seguro en servidor / rotación de claves).",
  },

  // Events/Agenda
  "agenda.title": { fr: "Agenda", en: "Agenda", es: "Agenda" },
  "agenda.eventTitle": {
    fr: "Titre de l'événement",
    en: "Event title",
    es: "Título del evento",
  },
  "agenda.eventDate": {
    fr: "Date de l'événement",
    en: "Event date",
    es: "Fecha del evento",
  },
  "agenda.add": {
    fr: "Ajouter événement",
    en: "Add event",
    es: "Añadir evento",
  },

  // Notes
  "notes.title": { fr: "Bloc-notes", en: "Notes", es: "Notas" },
  "notes.add": { fr: "Ajouter note", en: "Add note", es: "Añadir nota" },

  // Directory
  "directory.title": { fr: "Annuaire", en: "Directory", es: "Directorio" },
  "directory.name": { fr: "Nom", en: "Name", es: "Nombre" },
  "directory.email": { fr: "Email", en: "Email", es: "Correo electrónico" },
  "directory.add": {
    fr: "Ajouter contact",
    en: "Add contact",
    es: "Añadir contacto",
  },

  // Theme
  "theme.dark": { fr: "Mode sombre", en: "Dark mode", es: "Modo oscuro" },
  "theme.light": { fr: "Mode clair", en: "Light mode", es: "Modo claro" },

  // Language
  "lang.label": { fr: "Langue", en: "Language", es: "Idioma" },
  "lang.fr": { fr: "Français", en: "French", es: "Francés" },
  "lang.en": { fr: "Anglais", en: "English", es: "Inglés" },
  "lang.es": { fr: "Espagnol", en: "Spanish", es: "Español" },
};

/**
 * Récupérer traduction pour clé et langue
 * @param {string} key - clé traduction (ex: 'vault.title')
 * @param {string} lang - code langue ('fr', 'en', 'es')
 * @returns {string} texte traduit ou clé si non trouvée
 */
export function getTranslation(key, lang = "fr") {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][lang] || translations[key]["fr"];
}

/**
 * Alias court pour utilisation dans JSX
 */
export function t(key, lang = "fr") {
  return getTranslation(key, lang);
}

export default translations;
