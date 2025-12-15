# 🔐 Solution Rapide - Problèmes de Coffre-Fort

## 🚨 Vous ne pouvez pas déverrouiller le Coffre-Fort?

Suivez ces étapes **dans l'ordre**:

---

## ✅ Étape 1: Vérifier le diagnostic (2 min)

1. Allez à: **`/vault-diagnostics`**
   - Dans la navigation, cliquez sur le lien "Aide" du Coffre-Fort
   - OU tapez directement `http://localhost:3000/vault-diagnostics`

2. Cliquez **"🔧 Lancer le diagnostic"**

3. Vérifiez les résultats:
   ```
   ✅ localStorage:        DOIT ÊTRE ✅ Disponible
   ✅ Web Crypto API:       DOIT ÊTRE ✅ Disponible
   ✅ Données stockées:     Peut être ⚠️ Aucune donnée (c'est OK)
   ```

---

## ✅ Étape 2: Vérifier le mot de passe

**90% des problèmes viennent du mot de passe!**

```
❌ PROBLÈMES COURANTS:

1. CAPS LOCK activé
   → Maintenez Maj + la touche CAPS LOCK pour le désactiver

2. Majuscules/minuscules mauvaises
   → Le mot de passe est sensible à la casse
   → "MonMotDePasse" ≠ "monmotdepasse"

3. Espaces invisibles
   → Ne copier/coller pas le mot de passe
   → Tapez-le manuellement

4. Mauvais clavier
   → Vérifiez que la langue du clavier est correcte
   → (FR, EN, etc.)
```

**Test:** Essayez d'entrer le mot de passe **très lentement**, lettre par lettre

---

## ✅ Étape 3: Rafraîchir et nettoyer le cache

1. **Rafraîchissez la page:**
   ```
   Windows:  Ctrl + Shift + Delete
   Mac:      Cmd + Shift + Delete
   ```

2. **Fermez complètement le navigateur** (alt+F4 ou cmd+Q)

3. **Réouvrez le navigateur**

4. **Allez au Coffre-Fort** et essayez le mot de passe

---

## ✅ Étape 4: Essayer un autre navigateur

Si ça fonctionne dans **Chrome** mais pas dans **Firefox**, le problème vient du navigateur.

```
✅ Navigateurs testés (doivent tous fonctionner):
- Google Chrome / Chromium
- Mozilla Firefox
- Apple Safari
- Microsoft Edge
```

**Action:** Essayez dans un autre navigateur → Si ça marche → le problème c'est votre navigateur

---

## ✅ Étape 5: Mode navigation privée

```
Chrome:   Ctrl + Shift + N
Firefox:  Ctrl + Shift + P
Safari:   Cmd + Shift + N
Edge:     Ctrl + Shift + InPrivate
```

⚠️ **Les données disparaissent à la fermeture!**

---

## 🆘 Aucune solution ne fonctionne?

### Plan d'action:

1. **Ouvrez la console** (F12 ou Dev Tools)

2. **Allez au Coffre-Fort** et essayez de déverrouiller

3. **Observez les erreurs rouges** dans la Console

4. **Copiez l'erreur complète**

5. **Ouvrez une issue GitHub** avec:
   - L'erreur exacte de la console
   - Votre navigateur et version
   - Le résultat du diagnostic

---

## 💾 Si vous avez oublié le mot de passe

**⚠️ Il n'y a pas de "Récupération de mot de passe"** car:
- Les données sont chiffrées côté client
- Nous n'avons jamais accès au mot de passe
- C'est votre responsabilité de le retenir

### Option 1: Vous vous souvenez du mot de passe
→ Allez à l'étape 2

### Option 2: Vous l'avez oublié définitivement
→ **Réinitialiser le Coffre-Fort:**
1. Allez à `/vault-diagnostics`
2. Cliquez **"🗑️ Réinitialiser"**
3. Confirmez l'avertissement
4. Créez un nouveau Coffre-Fort

⚠️ **Vos anciens mots de passe seront PERDUS**

### Option 3: Le prévenir pour l'avenir
Utilisez un gestionnaire de mots de passe comme:
- **Bitwarden** (gratuit, open-source)
- **1Password** (payant)
- **KeePass** (gratuit, local)

→ Gardez le mot de passe du Coffre-Fort dedans!

---

## 📚 Documentation complète

Pour plus de détails, consultez: [VAULT_TROUBLESHOOTING.md](./VAULT_TROUBLESHOOTING.md)

---

## 🎯 Résumé en 3 points

| Problème | Solution |
|----------|----------|
| **Mot de passe incorrect** | Vérifiez CAPS LOCK, majuscules/minuscules, pas d'espaces |
| **Cache/cookies** | Rafraîchissez (Ctrl+Shift+Delete) et fermez le navigateur |
| **Problème navigateur** | Essayez dans Chrome/Firefox/Safari/Edge |

---

**Dernière mise à jour:** 15 décembre 2025

**Besoin d'aide?** Consultez `/vault-diagnostics` → lancer le diagnostic → voir les solutions
