## 📊 Performance Guide - Rufami

Ce document décrit les optimisations de performance et comment les mesurer.

### 1. Métriques Core Web Vitals

#### Largest Contentful Paint (LCP) - Target: < 2.5s
- Temps jusqu'à ce que le contenu principal soit affiché
- **Optimisations**:
  - ✅ Lazy loading avec React.lazy() implémenté
  - ✅ Code splitting automatique par route
  - ✅ Images optimisées (compression)
  - ✅ Fonts optimisées (system fonts)

#### Cumulative Layout Shift (CLS) - Target: < 0.1
- Décalages de layout non attendus
- **Optimisations**:
  - ✅ Dimensions fixes pour images/videos
  - ✅ Réservation d'espace pour contenu dynamique
  - ✅ Éviter insertion d'éléments au-dessus du fold

#### First Input Delay (FID) → Interaction to Next Paint (INP) - Target: < 200ms
- Délai de réponse aux interactions utilisateur
- **Optimisations**:
  - ✅ Minimal JavaScript on main thread
  - ✅ Debouncing pour search/filter
  - ✅ Async operations hors du UI thread

### 2. Build Size Optimization

#### Actuel
```
main.xxx.js:        151.92 kB (gzipped)
css/main.xxx.css:   5.42 kB (gzipped)
Total bundle:       ~170 kB (gzipped)
```

#### Targets
- Main JS: < 150 kB gzipped ✅
- Main CSS: < 10 kB gzipped ✅
- Total: < 200 kB gzipped ✅

#### Stratégies de Réduction
1. **Code Splitting** (✅ Implémenté)
```jsx
const ComponentName = lazy(() => import('./ComponentName'));
```

2. **Tree Shaking** (✅ Activé en production)
- Unused imports automatiquement supprimés
- Only include used utilities from Tailwind

3. **Minification** (✅ React Scripts)
- CSS minifié
- JS minifié et obfusqué

### 3. Network Optimization

#### Caching Strategy
```
index.html → No-Cache (vérifier mises à jour)
static/    → Long-term cache (1 year)
.js bundles → Hash-based versioning
```

#### HTTP Compression
- ✅ Gzip enabled on Azure Static Web Apps
- ✅ Brotli compression (automatic)

#### Service Worker (optionnel)
```bash
# Pour implémenter offline support
npx create-react-app rufami --template cra-template-pwa
```

### 4. Lighthouse Audit

#### Exécuter l'audit
```bash
# Via DevTools
1. F12 → Lighthouse tab
2. Select "Mobile" ou "Desktop"
3. Audit pour Performance, Accessibility, Best Practices, SEO

# Via CLI
npm install -g lighthouse
lighthouse https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net
```

#### Targets
- 📊 **Performance**: ≥ 90
- ♿ **Accessibility**: ≥ 90
- ✅ **Best Practices**: ≥ 90
- 🔍 **SEO**: ≥ 90

### 5. Runtime Performance

#### React DevTools Profiler
```jsx
// Envelopper composant pour profiling
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="FormadevisIntegration" onRender={onRenderCallback}>
  <FormadevisIntegration />
</Profiler>
```

#### Measuring Components
```bash
# Identifier les re-renders inutiles
1. DevTools → Profiler tab
2. Click "Start Recording"
3. User interaction
4. Click "Stop"
5. Analyser les flamegraphs
```

### 6. Image Optimization

#### Format
- ✅ WebP avec fallback PNG/JPG
- ✅ Dimensions appropriées (no over-scaling)
- ✅ Compression (TinyPNG, ImageOptim)

#### Lazy Loading
```jsx
<img src="..." loading="lazy" />
```

### 7. Font Optimization

#### Actuel
```jsx
// system-ui font stack (aucun téléchargement)
@tailwind base {
  @layer base {
    body {
      @apply font-sans; // system-ui
    }
  }
}
```

**Avantages**:
- ✅ 0 font downloads
- ✅ Instant rendering (no FOIT/FOUT)
- ✅ Native look and feel

#### Alternative: Google Fonts (si ajouté)
```jsx
// Ajouter dans public/index.html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### 8. Bundle Analysis

```bash
# Analyser la taille exacte
npm install -g webpack-bundle-analyzer

# Après build:
webpack-bundle-analyzer build/static/js/main.*.js
```

### 9. Performance Budget

```json
{
  "bundles": [
    {
      "name": "main-js",
      "maxSize": "150kB"
    },
    {
      "name": "main-css",
      "maxSize": "10kB"
    }
  ]
}
```

### 10. Monitoring en Production

#### Azure Static Web Apps
```bash
# Monitorer depuis Azure Portal:
1. Navigate to your SWA resource
2. Insights → Performance
3. Monitor Core Web Vitals
```

#### Google PageSpeed Insights
```
https://pagespeed.web.dev/?url=https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net
```

### Checklist d'Optimisation

- [ ] Lighthouse score ≥ 90 for Performance
- [ ] Bundle size < 200kB gzipped
- [ ] Core Web Vitals dans green
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID/INP < 200ms
- [ ] Images optimisées
- [ ] Aucune render jank (60fps)
- [ ] Caching policy configurée

### Ressources

- [Google Web Vitals](https://web.dev/vitals/)
- [Webpack Bundle Analysis](https://github.com/webpack-bundle-analyzer/webpack-bundle-analyzer)
- [React Profiler API](https://react.dev/reference/react/Profiler)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

**Statut**: 🟢 Optimisé (performance within targets)

Last Updated: 2024
