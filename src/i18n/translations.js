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
  "nav.devis": {
    fr: "Demande de Devis",
    en: "Quote Request",
    es: "Solicitud de Presupuesto",
  },

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

  // Formulaire de Devis
  "formadevis.title": {
    fr: "Demande de Devis",
    en: "Quote Request",
    es: "Solicitud de Presupuesto",
  },
  "formadevis.description": {
    fr: "Remplissez le formulaire ci-dessous pour demander un devis personnalisé",
    en: "Fill out the form below to request a personalized quote",
    es: "Complete el formulario a continuación para solicitar un presupuesto personalizado",
  },
  "formadevis.fullName": {
    fr: "Nom complet",
    en: "Full Name",
    es: "Nombre Completo",
  },
  "formadevis.email": { fr: "Email", en: "Email", es: "Correo Electrónico" },
  "formadevis.phone": { fr: "Téléphone", en: "Phone", es: "Teléfono" },
  "formadevis.projectType": {
    fr: "Type de projet",
    en: "Project Type",
    es: "Tipo de Proyecto",
  },
  "formadevis.projectDescription": {
    fr: "Description du projet",
    en: "Project Description",
    es: "Descripción del Proyecto",
  },
  "formadevis.budget": {
    fr: "Budget estimé (€)",
    en: "Estimated Budget (€)",
    es: "Presupuesto Estimado (€)",
  },
  "formadevis.deadline": {
    fr: "Délai souhaité",
    en: "Desired Timeline",
    es: "Plazo Deseado",
  },
  "formadevis.submit": {
    fr: "Envoyer la demande",
    en: "Submit Request",
    es: "Enviar Solicitud",
  },
  "formadevis.success": {
    fr: "Devis demandé avec succès !",
    en: "Quote request submitted successfully!",
    es: "¡Solicitud de presupuesto enviada con éxito!",
  },
  "formadevis.select": {
    fr: "-- Sélectionner --",
    en: "-- Select --",
    es: "-- Seleccionar --",
  },
  "formadevis.webDevelopment": {
    fr: "Développement web",
    en: "Web Development",
    es: "Desarrollo Web",
  },
  "formadevis.mobileApp": {
    fr: "Application mobile",
    en: "Mobile App",
    es: "Aplicación Móvil",
  },
  "formadevis.ecommerce": {
    fr: "E-commerce",
    en: "E-commerce",
    es: "Comercio Electrónico",
  },
  "formadevis.consulting": {
    fr: "Conseil",
    en: "Consulting",
    es: "Consultoría",
  },
  "formadevis.other": { fr: "Autre", en: "Other", es: "Otro" },

  // Common UI
  "ui.loading": {
    fr: "Chargement...",
    en: "Loading...",
    es: "Cargando...",
  },
  "ui.error": {
    fr: "Erreur",
    en: "Error",
    es: "Error",
  },
  "ui.success": {
    fr: "Succès",
    en: "Success",
    es: "Éxito",
  },
  "ui.warning": {
    fr: "Attention",
    en: "Warning",
    es: "Advertencia",
  },
  "ui.close": {
    fr: "Fermer",
    en: "Close",
    es: "Cerrar",
  },
  "ui.back": {
    fr: "Retour",
    en: "Back",
    es: "Atrás",
  },
  "ui.home": {
    fr: "Accueil",
    en: "Home",
    es: "Inicio",
  },
  "ui.about": {
    fr: "À propos",
    en: "About",
    es: "Acerca de",
  },

  // 404 Page
  "404.title": {
    fr: "Page Non Trouvée",
    en: "Page Not Found",
    es: "Página no encontrada",
  },
  "404.code": {
    fr: "Erreur 404",
    en: "Error 404",
    es: "Error 404",
  },
  "404.message": {
    fr: "La page que vous cherchez n'existe pas ou a été supprimée.",
    en: "The page you are looking for does not exist or has been deleted.",
    es: "La página que busca no existe o ha sido eliminada.",
  },
  "404.button": {
    fr: "Retourner au tableau de bord",
    en: "Go back to dashboard",
    es: "Volver al panel",
  },

  // Dashboard
  "dashboard.title": {
    fr: "Tableau de Bord",
    en: "Dashboard",
    es: "Panel de Control",
  },
  "dashboard.welcome": {
    fr: "Bienvenue à Rufami",
    en: "Welcome to Rufami",
    es: "Bienvenido a Rufami",
  },
  "dashboard.desc": {
    fr: "Votre bureau collaboratif modulaire et sécurisé",
    en: "Your modular and secure collaborative office",
    es: "Su oficina colaborativa modular y segura",
  },

  // About Page
  "about.title": {
    fr: "À Propos de Rufami",
    en: "About Rufami",
    es: "Acerca de Rufami",
  },
  "about.description": {
    fr: "Rufami est une application collaborative multilingue construite avec React 19, Tailwind CSS et des technologies Azure modernes.",
    en: "Rufami is a multilingual collaborative application built with React 19, Tailwind CSS and modern Azure technologies.",
    es: "Rufami es una aplicación colaborativa multilingüe construida con React 19, Tailwind CSS y tecnologías Azure modernas.",
  },
  "about.features": {
    fr: "Caractéristiques",
    en: "Features",
    es: "Características",
  },
  "about.feature1": {
    fr: "✨ Design moderne avec animations fluides",
    en: "✨ Modern design with smooth animations",
    es: "✨ Diseño moderno con animaciones suaves",
  },
  "about.feature2": {
    fr: "🌍 Support multilingue (FR/EN/ES)",
    en: "🌍 Multilingual support (FR/EN/ES)",
    es: "🌍 Soporte multilingüe (FR/EN/ES)",
  },
  "about.feature3": {
    fr: "🔒 Chiffrement sécurisé (PBKDF2 + AES-GCM)",
    en: "🔒 Secure encryption (PBKDF2 + AES-GCM)",
    es: "🔒 Cifrado seguro (PBKDF2 + AES-GCM)",
  },
  "about.feature4": {
    fr: "☁️ Déploiement sur Azure Static Web Apps",
    en: "☁️ Deployment on Azure Static Web Apps",
    es: "☁️ Implementación en Azure Static Web Apps",
  },
  "about.feature5": {
    fr: "📱 Responsive et optimisé pour tous les appareils",
    en: "📱 Responsive and optimized for all devices",
    es: "📱 Responsive y optimizado para todos los dispositivos",
  },
  "about.feature6": {
    fr: "🎯 Modules modulaires et facilement extensibles",
    en: "🎯 Modular and easily extensible modules",
    es: "🎯 Módulos modulares y fácilmente extensibles",
  },
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
