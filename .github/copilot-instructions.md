# Rufami App - AI Coding Guidelines

## Architecture Overview
Application React 19 (Create React App) déployée sur **Azure Static Web Apps**. Bureau collaboratif modulaire avec persistance localStorage.

**Structure de l'app** (`src/App.jsx`):
- `AzureAuthProvider` wraps l'app (actuellement stub passthrough)
- `react-router-dom` v7 pour la navigation entre modules
- Header avec `GoogleAuth` (stub) + navigation principale

**Modules fonctionnels** (routes dans `App.jsx`):
| Route | Composant | État |
|-------|-----------|------|
| `/` | `EventsFromAPI` | Dashboard principal avec tous les widgets |
| `/collaboratif` | `WorkspaceCollaboratif` | Gestion projets/utilisateurs |
| `/agenda`, `/calendrier`, `/blocnote`, `/annuaire` | Composants individuels | Pages "en construction" |
| `/coffrefort` | `CoffreFort` | Gestionnaire mots de passe (localStorage) |
| `/citoyenaction`, `/formations` | `CitoyenAction`, `FormationsCIPFARO` | Gestionnaires de liens |
| `/liens` | `GestionLiens` | Liens rapides catégorisés |

## Patterns de données

**Persistance localStorage** - Hook réutilisable dans `EventsFromAPI.jsx`:
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  const setAndStore = v => { setValue(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [value, setAndStore];
}
```
Clés utilisées: `agendaEvents`, `blocNote`, `annuaireContacts`, `coffreFort`, `liensPerso`, `citoyenActionLinks`, `formationsCIPFAROLinks`

**Pattern CRUD uniforme** (voir `CoffreFort.jsx`, `GestionLiens.jsx`):
- État local + sync localStorage via `saveEntries()`
- Formulaire avec `editIndex` pour basculer ajout/modification
- Boutons: Ajouter/Modifier (blue-600), Supprimer (red-600), Annuler (gray-400)

## API & Authentification

**État actuel**: Auth désactivée pour accès libre
- `AzureAuthProvider.jsx`: Passthrough `<>{children}</>`
- `GoogleAuth.jsx`: Passthrough
- `CallAzureApiButton.jsx`: Stub avec message d'erreur

**API externe** (`EventsFromAPI.jsx`):
```jsx
const API_URL = 'https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net/api/events';
```

**Pour réactiver Azure AD**: Réimplémenter MSAL dans `AzureAuthProvider.jsx` avec `@azure/msal-browser` et `@azure/msal-react` (déjà en dépendances).

## Styling Tailwind CSS

**Classes communes**:
- Boutons primaires: `bg-blue-600 text-white px-3 py-1 rounded`
- Boutons danger: `bg-red-600 text-white px-2 py-1 rounded`
- Cards: `bg-white dark:bg-gray-700 p-4 rounded shadow`
- Inputs: `px-2 py-1 rounded border`

**Mode sombre**: Toggle via état `theme` dans `EventsFromAPI.jsx`, appliqué à `document.body.className`

**Responsive**: `flex-col md:flex-row`, `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`

## Composants UI réutilisables

Dans `EventsFromAPI.jsx`:
- `Toast({ message, onClose })`: Notification verte en bas
- `AlertBanner({ error, onClose, onRetry })`: Bannière d'erreur rouge en haut avec animation shake
- `ThemeSwitch({ theme, setTheme })`: Toggle mode clair/sombre

**Pattern showToast**: Passé en prop aux composants enfants pour notifications contextuelles.

## Développement & Déploiement

```bash
npm start      # Dev server localhost:3000
npm run build  # Production → /build
npm test       # Jest + React Testing Library
```

**Azure Static Web Apps** (`azure.yaml`):
- `app_location: "."` (racine)
- `output_location: "build"`
- `api_location: "api"` (Azure Functions, si utilisé)

## Conventions

- **Langue UI**: Français
- **Icônes**: FontAwesome (`@fortawesome/react-fontawesome`) + Lucide React
- **IDs accessibilité**: Labels `sr-only` + `aria-label` sur inputs
- **Data-testid**: Utilisé pour navigation (`data-testid="nav-dashboard"`, etc.)