## 🌐 Guide d'Accessibilité Rufami (WCAG 2.1 AA)

Ce guide décrit les pratiques d'accessibilité mises en place dans Rufami.

### 1. Critères WCAG Respectés

#### 1.1 Navigation Clavier
- ✅ Tous les éléments interactifs sont accessibles via **Tab**
- ✅ Les liens et boutons fonctionnent avec **Entrée** et **Espace**
- ✅ Indicateurs de focus clairement visibles (ring-2 Tailwind)
- ✅ Ordre de tabulation logique (top-to-bottom, left-to-right)

#### 1.2 Labels & Description
```jsx
// ✅ BON
<label htmlFor="email-input">Email</label>
<input id="email-input" type="email" />

// ✅ BON avec description
<label htmlFor="password">Mot de passe</label>
<input 
  id="password" 
  type="password"
  aria-describedby="password-desc"
/>
<p id="password-desc">Min 8 caractères</p>
```

#### 1.3 Contraste des Couleurs (WCAG AA)
- ✅ Texte foncé sur fond clair ≥ 4.5:1
- ✅ Texte clair sur fond foncé ≥ 4.5:1
- ✅ Éléments graphiques ≥ 3:1
- ✅ Mode sombre activé via Tailwind dark:*

#### 1.4 Annonces ARIA
```jsx
// ✅ Erreurs de formulaire
<div role="alert" aria-live="polite">
  Email invalide
</div>

// ✅ Chargement
<div role="status" aria-live="polite">
  Chargement...
</div>
```

### 2. Attributs ARIA Utilisés

| Attribut | Usage | Exemple |
|----------|-------|---------|
| `aria-label` | Label pour éléments sans texte visible | `<button aria-label="Fermer">✕</button>` |
| `aria-labelledby` | Connecte à un heading | `<div aria-labelledby="form-title">` |
| `aria-describedby` | Description supplémentaire | `<input aria-describedby="hint-id" />` |
| `aria-invalid` | Champ invalide | `<input aria-invalid="true" />` |
| `aria-live` | Zone dynamique (polite/assertive) | `<div aria-live="polite">` |
| `role` | Rôle sémantique | `<div role="alert">Erreur</div>` |

### 3. Composants Accessibles

#### CoffreFort (Vault)
```jsx
// Labels explicites
<label htmlFor="master-pass">Mot de passe maître</label>
<input 
  id="master-pass"
  aria-describedby="master-pass-desc"
  required
/>

// Descriptions
<p id="master-pass-desc">
  Mot de passe pour accéder à vos identifiants chiffrés
</p>

// Alerts
<div role="alert" aria-live="polite">
  {error}
</div>
```

#### Navigation
- ✅ `aria-label` sur icon buttons
- ✅ `aria-current="page"` sur le lien actif (peut être amélioré)
- ✅ Icônes lucide-react avec labels texte

#### Formulaires
- ✅ Tous les inputs ont des labels associés
- ✅ Erreurs avec `role="alert"`
- ✅ Loading avec `role="status"`
- ✅ Placeholder comme indice, pas comme label

### 4. Tests d'Accessibilité

#### Outils Recommandés
1. **axe DevTools** - Extension Chrome/Firefox
2. **WAVE** - Extension Web Accessibility Evaluation
3. **Lighthouse** - DevTools Chrome (Accessibility tab)
4. **Screen Reader**:
   - NVDA (gratuit, Windows)
   - JAWS (payant, Windows)
   - VoiceOver (MacOS/iOS)

#### Vérifications Manuelles
```bash
# 1. Navigation au clavier
Tab        → Naviguer forward
Shift+Tab  → Naviguer backward
Enter/Space → Activer boutons
Arrow keys  → Scrollable elements

# 2. Zoom
Ctrl++     → Agrandir le texte (150%)
Ctrl+-     → Réduire le texte
```

### 5. Améliorations Futures

- [ ] Implémenter `aria-current` dynamique en navigation
- [ ] Ajouter skeleton loaders avec announcements ARIA
- [ ] Améliorer les messages d'erreur détaillés
- [ ] Ajouter des transcriptions pour vidéos (si ajoutées)
- [ ] Tester avec lecteur d'écran réel (NVDA)
- [ ] Vérifier contraste des graphiques/images

### 6. Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

### 7. Checklist pour Contributeurs

Avant de soumettre une PR, vérifiez:
- [ ] Labels sur tous les inputs
- [ ] `aria-label` ou `aria-labelledby` sur les éléments sans texte visible
- [ ] Indicateurs de focus visibles
- [ ] Erreurs avec `role="alert"`
- [ ] Pas de focus-visible désactivé
- [ ] Ratio de contraste ≥ 4.5:1 pour le texte
- [ ] Test de navigation au clavier (Tab/Shift+Tab)
- [ ] Pas d'utilisation de `tabindex > 0` (sauf cas spéciaux)

---

**Statut WCAG**: 🟡 Partiellement Conforme AA (en cours d'amélioration)

Pour signaler un problème d'accessibilité: [GitHub Issues](https://github.com/cipfarorudy/rufami/issues)
