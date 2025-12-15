## 🛠️ Guide du Développeur - Rufami

Ce guide est destiné aux contributeurs et développeurs qui souhaitent travailler sur le projet Rufami.

### Table des Matières
1. [Setup Initial](#setup-initial)
2. [Architecture](#architecture)
3. [Conventions de Code](#conventions-de-code)
4. [Workflow Git](#workflow-git)
5. [Tests](#tests)
6. [Déploiement](#déploiement)
7. [Troubleshooting](#troubleshooting)

---

## Setup Initial

### Prérequis
- Node.js v18+ ([Download](https://nodejs.org/))
- npm v8+
- Git

### Installation
```bash
# Clone le repo
git clone https://github.com/cipfarorudy/rufami.git
cd rufami

# Install dépendances
npm install

# Start dev server
npm start

# Dev server accessible à http://localhost:3000
```

### Structure du Projet
```
rufami/
├── public/
│   ├── index.html           # Entry point HTML
│   └── staticwebapp.config.json  # Config Azure SWA
├── src/
│   ├── App.jsx              # Composant principal
│   ├── App.css              # Styles globaux
│   ├── index.css            # CSS Tailwind
│   ├── i18n/
│   │   └── translations.js  # Traductions FR/EN/ES
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── security/
│   │   └── vaultCrypto.js   # Chiffrement PBKDF2+AES-GCM
│   ├── hooks/
│   │   └── a11yUtils.js     # Utilities accessibilité
│   ├── components/
│   │   └── CRUDList.jsx     # Composant réutilisable
│   ├── *Integration.jsx     # Modules spécialisés
│   └── *.test.js            # Tests Jest
├── docs/
│   ├── ACCESSIBILITY.md
│   ├── PERFORMANCE.md
│   └── CUSTOM_DOMAIN_SETUP.md
├── .github/workflows/       # GitHub Actions CI/CD
├── package.json             # Dépendances
├── tailwind.config.js       # Config Tailwind CSS
├── postcss.config.js        # Config PostCSS
└── README.md
```

---

## Architecture

### Stack Technique
- **Frontend**: React 19 + React Router v7
- **Styling**: Tailwind CSS 3.x + PostCSS
- **Chiffrement**: Web Crypto API + PBKDF2 (150k iterations) + AES-GCM
- **i18n**: Custom Context + JSON translations
- **Testing**: Jest + React Testing Library
- **Deployment**: Azure Static Web Apps + GitHub Actions

### Patterns Utilisés

#### Context API pour State Global
```jsx
// useLanguage
const { language, lang, changeLang } = useLanguage();

// useTheme
const { theme, toggleTheme } = useTheme();
```

#### Lazy Loading avec React.lazy()
```jsx
const EventsFromAPI = lazy(() => import('./EventsFromAPI'));

// Dans Routes:
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<EventsFromAPI />} />
  </Routes>
</Suspense>
```

#### localStorage pour Persistance
```jsx
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  const setAndStore = (v) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  
  return [value, setAndStore];
};
```

---

## Conventions de Code

### Nommage
- **Composants**: PascalCase (e.g., `FormadevisIntegration.jsx`)
- **Fichiers**: camelCase sauf composants (e.g., `vaultCrypto.js`, `CoffreFort.jsx`)
- **Variables/Functions**: camelCase (e.g., `handleSubmit`, `formData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `ENCRYPTED_KEY`, `MAX_ITEMS`)

### Composants Fonctionnels
```jsx
/**
 * Brève description du composant
 * @param {Object} props - Props
 * @returns {JSX.Element}
 */
function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // effect
  }, [dependencies]);
  
  const handleEvent = () => {
    // handler logic
  };
  
  return <div>JSX</div>;
}

export default ComponentName;
```

### Import Order
```jsx
// 1. React et libraries tierces
import React, { useState } from 'react';
import { useLanguage } from 'react-i18n';

// 2. Composants locaux
import MyComponent from './MyComponent';
import { helper } from './helpers';

// 3. Styles
import styles from './style.css';
```

### Taildwind CSS
```jsx
// ✅ Bon - Pas de variables dynamiques
<div className={`px-4 py-2 rounded ${isDark ? 'dark:bg-gray-800' : 'bg-white'}`} />

// ❌ Mauvais - Variables dynamiques ne compilent pas
const color = userTheme === 'dark' ? 'dark:bg-gray-800' : 'bg-white';
<div className={`px-4 py-2 rounded ${color}`} />
```

### Traductions
```jsx
import { useLanguage } from './context/LanguageContext';
import { t } from './i18n/translations';

function MyComponent() {
  const { lang } = useLanguage();
  return <h1>{t('my.translation.key', lang)}</h1>;
}
```

### Tests
```jsx
describe('ComponentName', () => {
  test('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
  
  test('should handle user interaction', () => {
    const { container } = render(<ComponentName />);
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(/* assertion */).toBe(true);
  });
});
```

---

## Workflow Git

### Branches
- `main` - Production, protégée
- `dev` - Development, CI/CD testé
- `feature/*` - Nouvelles features
- `fix/*` - Bug fixes
- `docs/*` - Documentation

### Commit Messages
```
# Format
[TYPE]: [Description]

# Types: feat, fix, docs, style, refactor, test, chore
feat: add language selector to header
fix: resolve vault migration issue
docs: update accessibility guide
```

### Pull Requests
1. Fork/branch depuis `dev`
2. Commit avec messages clairs
3. Push vers feature branch
4. Ouvrir PR avec description
5. Passer les checks (tests, linting)
6. Reviewer approuve
7. Merge vers `dev`, puis `main`

---

## Tests

### Run Tests
```bash
# Watch mode (recommandé pour développement)
npm test

# Single run
npm test -- --watchAll=false

# Avec coverage
npm test -- --coverage
```

### Test Structure
```jsx
describe('Feature Area', () => {
  beforeEach(() => {
    // Setup
  });
  
  test('should do something specific', () => {
    // Arrange
    const input = ...;
    
    // Act
    const result = ...;
    
    // Assert
    expect(result).toBe(...);
  });
  
  afterEach(() => {
    // Cleanup
  });
});
```

### Coverage Targets
- Statements: ≥ 80%
- Branches: ≥ 75%
- Functions: ≥ 80%
- Lines: ≥ 80%

---

## Déploiement

### Local Build
```bash
npm run build
# Output dans ./build/

# Test build localement
npx serve -s build
```

### Azure Static Web Apps
1. Commit/push vers `main`
2. GitHub Actions déclenche le workflow
3. Build automatiquement
4. Déploie sur https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net

### Vérifier le Déploiement
```bash
# Check GitHub Actions
https://github.com/cipfarorudy/rufami/actions

# Test en production
https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net
```

---

## Troubleshooting

### "Module not found: Can't resolve 'crypto'"
- Web Crypto API utilisée au runtime
- Jest mock setup dans `setupTests.js`
- Pour browser, Web Crypto est natif

### Tests échouent
```bash
# Clear cache
npm test -- --clearCache

# Rebuild node_modules
rm -rf node_modules package-lock.json
npm install
```

### Build échoue
```bash
# Vérifier syntax
npm run build 2>&1 | less

# Vérifier imports circulaires
npm ls

# Clean rebuild
rm -rf build/ node_modules/
npm install
npm run build
```

### Dev server ne démarre pas
```bash
# Port occupé?
lsof -i :3000  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess  # Windows

# Tuer le processus
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

---

## Resources

- 📚 [React Documentation](https://react.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧪 [Jest](https://jestjs.io/)
- ♿ [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- 📋 [GitHub Actions](https://docs.github.com/en/actions)

---

Questions? Créez une [GitHub Issue](https://github.com/cipfarorudy/rufami/issues)!
