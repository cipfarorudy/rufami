# 🔐 Guide Complet du Coffre-Fort - Problèmes de Déverrouillage

## 📌 Sommaire
1. [Vue d'ensemble](#vue-densemble)
2. [Comment ça marche](#comment-ça-marche)
3. [Problèmes courants](#problèmes-courants)
4. [Solutions détaillées](#solutions-détaillées)
5. [Questions fréquentes](#questions-fréquentes)

---

## Vue d'ensemble

Le **Coffre-Fort** (🔒) est un gestionnaire de mots de passe chiffré dans Rufami. Vos données sont protégées par:
- **PBKDF2** (clé dérivée avec 150 000 itérations)
- **AES-256-GCM** (chiffrement militaire)
- **localStorage** (stockage client, aucun serveur)

---

## Comment ça marche

### 1️⃣ Première utilisation
```
Ouvrir Coffre-Fort → Choisir mot de passe → Créer entrées
```

### 2️⃣ Utilisations suivantes
```
Ouvrir Coffre-Fort → Entrer le mot de passe → Accès instant
```

### 3️⃣ Sécurité
- ✅ Vos données ne quittent **jamais** votre navigateur
- ✅ Le mot de passe n'est stocké **nulle part**
- ✅ Seul **vous** avez accès à vos données
- ✅ Même les administrateurs du site ne peuvent pas accéder

---

## Problèmes courants

### ❌ "Je n'arrive pas à déverrouiller le Coffre-Fort"

**Causes possibles:**
1. **Mauvais mot de passe** (cause #1 - 90% des cas)
2. Données corrompues
3. Web Crypto API non disponible
4. localStorage désactivé
5. Mode navigation privée

### ❌ "Je vois 'Données chiffrées v2 corrompues ou mot de passe incorrect'"

**Diagnostic:**
- Vous avez des données stockées ✅
- Mais le mot de passe n'est pas correct ❌

**Solution:**
- Vérifiez que CAPS LOCK n'est pas activé
- Essayez le mot de passe exact (majuscules/minuscules comptent)
- Vérifiez que vous ne copiez/collez pas d'espaces

### ❌ "Le Coffre-Fort est vide"

**Possible si:**
- C'est votre première visite (normal!)
- localStorage a été effacé
- Vous avez changé de navigateur
- Mode incognito/privé a fermé les données

---

## Solutions détaillées

### 🔧 Solution 1: Vérifier le mot de passe

```
❌ MAUVAIS:
- monMotDePasse → montdepasse (majuscules différentes)
- monMotDePasse → " monMotDePasse" (espaces)

✅ CORRECT:
- Utilisez EXACTEMENT le même mot de passe
- Attention à CAPS LOCK
- Pas d'espaces avant/après
```

**Comment tester?**
1. Allez à `/vault-diagnostics`
2. Cliquez "Lancer le diagnostic"
3. Vérifiez que "Web Crypto API" = ✅ Disponible
4. Vérifiez que "Données stockées" = ✅ Données trouvées

### 🔧 Solution 2: Rafraîchir le navigateur

```powershell
Windows:  Ctrl + Shift + Delete (vider cache)
Mac:      Cmd + Shift + Delete
```

Puis:
1. Fermez complètement le navigateur
2. Réouvrez Rufami
3. Allez au Coffre-Fort
4. Essayez le mot de passe

### 🔧 Solution 3: Essayer un autre navigateur

Testez sur:
- ✅ Chrome/Chromium (recommandé)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ Edge

**Si ça marche ailleurs:**
- Votre premier navigateur a peut-être un problème
- Vider le cache/cookies

### 🔧 Solution 4: Mode navigation privée

```
Chrome:   Ctrl + Shift + N
Firefox:  Ctrl + Shift + P
Safari:   Cmd + Shift + N
Edge:     Ctrl + Shift + InPrivate
```

⚠️ **Attention:** Les données disparaissent à la fermeture!

### 🔧 Solution 5: Réinitialiser le Coffre-Fort

Si vous êtes certain d'avoir oublié le mot de passe:

1. Allez à `/vault-diagnostics`
2. Cliquez "🗑️ Réinitialiser"
3. Confirmez l'avertissement
4. Créez un nouveau Coffre-Fort

⚠️ **⚠️ ATTENTION:** Les données actuelles seront **PERDUES DÉFINITIVEMENT**

---

## Conseils de sécurité

### 📚 Bonnes pratiques

```
✅ À faire:
- Utiliser un mot de passe fort (12+ caractères)
- Mélanger majuscules/minuscules/chiffres/symboles
- Stocker le mot du Coffre dans un gestionnaire externe
- Sauvegardez vos mots de passe régulièrement

❌ À éviter:
- Ne pas utiliser le même mot de passe pour tout
- Ne pas écrire le mot de passe en dur
- Ne pas donner accès à votre navigateur à quelqu'un d'autre
- Ne pas effacer le cache si vous oubliez le mot de passe
```

### 💾 Sauvegarder ses données

Le Coffre-Fort propose une fonction d'export:

1. Allez au Coffre-Fort
2. Cliquez "💾 Exporter données" (dans le diagnostic)
3. Cela télécharge un fichier `coffre-fort-backup-*.txt`

⚠️ **Ce fichier est chiffré** - impossible à lire sans le mot de passe

---

## Questions fréquentes

### Q: Où sont stockées mes données?
**R:** Sur votre ordinateur dans `localStorage` du navigateur.
- Aucun serveur
- Aucun cloud
- Complètement privé

### Q: Et si j'oublie mon mot de passe?
**R:** Malheureusement, c'est irréversible car:
- Le mot de passe n'est jamais stocké
- Seul vous le connaissez
- Pas de fonction "Récupération de mot de passe"

**Conseil:** Utilisez un gestionnaire de mots de passe externe (Bitwarden, 1Password, etc.)

### Q: Est-ce vraiment sécurisé?
**R:** OUI! Nous utilisons:
- PBKDF2 (150 000 itérations) - très coûteux en attaque par force brute
- AES-256-GCM - norme fédérale américaine
- Web Crypto API du navigateur
- Zéro transmission réseau

**Équivalent à:** Les meilleurs gestionnaires du marché

### Q: Peux-je accéder au Coffre-Fort sur un autre appareil?
**R:** Non, actuellement:
- Les données sont **locales** à votre navigateur
- Pas de synchronisation cloud
- Chaque appareil est indépendant

**Prochainement:** Support cloud chiffré (fin de piste)

### Q: Puis-je exporter mes données?
**R:** Oui! Deux façons:
1. **Export chiffré:** Fichier `.txt` protégé par le mot de passe
2. **Export en clair:** À faire manuellement (danger ⚠️)

### Q: Comment signaler un problème?
**R:** Rendez-vous sur `/vault-diagnostics` et:
1. Cliquez "🔧 Lancer le diagnostic"
2. Vérifiez les résultats
3. Consultez ce guide
4. Ou ouvrez une issue GitHub

---

## Diagnostic pas-à-pas

### ✅ Checklist complète

- [ ] Vérifier Web Crypto API = ✅ Disponible
- [ ] Vérifier localStorage = ✅ Disponible
- [ ] Vérifier les données = ✅ Données trouvées (ou normal si vide)
- [ ] Vérifier CAPS LOCK n'est pas activé
- [ ] Vérifier le mot de passe exact (majuscules/minuscules)
- [ ] Essayer en rafraîchissant (Ctrl+F5)
- [ ] Essayer en mode privé
- [ ] Essayer dans un autre navigateur
- [ ] Vérifier les avertissements du navigateur (F12 > Console)

### 🐛 Signaler un bug

Ouvrez la **console du navigateur** (F12):

1. Allez au Coffre-Fort
2. Essayez de déverrouiller
3. Regardez les erreurs rouges/orange
4. Copiez l'erreur complète
5. Ouvrez une issue avec cette erreur

---

## Support

- 📖 **Ce guide:** Ouvrez toujours ce guide en premier
- 🔍 **Diagnostic:** Allez à `/vault-diagnostics`
- 🐛 **Bug:** Ouvrez une issue GitHub avec les logs (F12)
- 💬 **Discussion:** Consultez les issues existantes

---

**Dernière mise à jour:** 15 décembre 2025
**Version:** Coffre-Fort v2 (PBKDF2 + AES-256)
