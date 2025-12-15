# Rufami App

Application React 19 déployée sur **Azure Static Web Apps**. Bureau collaboratif modulaire: agenda, calendrier, bloc‑notes, annuaire, coffre‑fort de mots de passe, gestion de liens, espace collaboratif.

Déploiement automatique via `azure.yaml` (build CRA → dossier `build`).

> Dernier redéploiement déclenché : 1 Dec 2025

## Architecture Fonctionnelle

- **Routing**: `react-router-dom` v7, code splitting via `React.lazy` + `Suspense` (voir `App.jsx`).
- **Authentification Azure AD**: Contexte MSAL dans `AzureAuthProvider.jsx` (login/logout, `getToken` silencieux). Route protégée: `/coffrefort` (affiche message si non authentifié).
- **Thème global**: `ThemeProvider` (`src/context/ThemeContext.jsx`) gère `light/dark` + persistance `localStorage` (`appTheme`). Composant réutilisable `ThemeSwitch`.
- **Persistance locale**: Hook `useLocalStorage` pour modules (agenda, contacts, notes, liens...).
- **CRUD générique**: `CRUDList.jsx` abstrait formulaires et listes (ajout/modif/suppression) avec API contrôlée (`controlledItems`, `onItemsChange`) ou stockage direct.
- **API externe**: `EventsFromAPI.jsx` utilise `apiClient` pour récupérer `/api/events` (ajout automatique Authorization si token MSAL présent).
- **Accessibilité**: Labels SR-only, navigation focusable, rôles `status`/`alert`, skip link dans `index.html`.

## Sécurité Coffre‑fort

`CoffreFort.jsx` implémente un stockage chiffré côté client versionné :

- **Version v2**: PBKDF2 (150k itérations, SHA‑256) + AES‑GCM (sel + IV aléatoires) via Web Crypto.
- **Migration automatique**: Ancien format v1 (AES CryptoJS + clé SHA‑256 simple) ou plaintext migré vers v2 au premier déverrouillage.
- **Format stockage**: `{version:2,salt,iterations,iv,ciphertext}` sérialisé JSON sous clé `coffreFortEnc`.
- **Déverrouillage asynchrone**: État "Déchiffrement en cours…" jusqu’à fin PBKDF2 + AES‑GCM.
- **Tests**: `CoffreFort.test.js` vérifie format v2 et absence de secrets en clair.

### Limites actuelles

- Chiffrement purement client (XSS ou extension malveillante peuvent lire mémoire).
- Pas d’effacement mémoire sécurisé après utilisation (GC dépendant du moteur JS).
- Pas de rotation programmée de mot de passe maître / re‑chiffrement batch.
- Pas d’Argon2id (WebAssembly) fallback quand PBKDF2 considéré insuffisant sur certaines plateformes.
- Aucune intégration serveur (Key Vault) pour secrets haute criticité.

### Pistes Futures

- Argon2id / scrypt WebAssembly si compatible + auto‑adjust itérations (budget temps).
- Rotation programmée + indicateur de vieillissement de dérivation.
- Intégration **Azure Key Vault** / Azure Functions pour enveloppement de clé maître.
- Effacement explicite buffers (CryptoKey non exportable, mais purge références & tab close handler).

## Performance & Code Splitting

Routes lourdes chargées à la demande (`lazy()`): réduit bundle initial et temps de first paint.
Fallback accessible: `<div role="status" aria-live="polite">Chargement…</div>`.

## Tests

- **Outils**: Jest + React Testing Library (`npm test`).
- **Couverture principale**: Navigation (`App.test.js`), Dashboard & widgets (`EventsFromAPI.test.js`), CRUD générique (`CRUDList.test.js`), Chiffrement coffre‑fort (`CoffreFort.test.js`).
- **Mocks** MSAL pour éviter erreurs crypto en environnement test.

## Prochaines Itérations

- Internationalisation (fr/en) via contexte i18n.
- Monitoring (Azure Application Insights / console structured logging).
- CI (GitHub Actions: build + test + déploiement SWA).
- Amélioration accessibilité (tests axe-core, contrastes).
- Vectorisation liens / recherche (phase R&D Cosmos DB + index).

---

## Scripts Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Notes Azure Static Web Apps

Fichier `azure.yaml` configure:

- `app_location: .`
- `output_location: build`
- `api_location: api` (réservé pour futures Azure Functions).

Déploiement: push sur `main` déclenche pipeline SWA (créé via portail ou CLI). Pour retenter déploiement manual: modifier un fichier et pousser.

Sécurité API future: ajout d’en-tête Authorization avec token MSAL (`getToken()`), scopes à définir dans `authConfig.js`.

---

## Avertissement Sécurité

Bien que PBKDF2 + AES‑GCM soit en place, ce coffre‑fort reste un stockage côté client exposé au contexte de la page. Ne pas y conserver de secrets critiques (accès bancaire, clés privées, tokens longue durée) tant que :

- Audit XSS / CSP / Trusted Types effectué et durci
- Intégration serveur (Azure Key Vault / API) pour chiffrage hors navigateur
- Mécanismes de rotation et révocation implémentés
- Option Argon2id activée (si support) pour durcir la dérivation

Usage recommandé: données à faible sensibilité ou démonstration pédagogique.
