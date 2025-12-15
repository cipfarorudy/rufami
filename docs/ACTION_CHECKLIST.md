# 📋 Configuration farorudy.fr - Checklist d'Action

## Status Actuel

```
┌─────────────────────────────────────────┐
│  Application Rufami                     │
│  ✅ Déployée sur Azure Static Web Apps  │
│  ⏳ Domaine personnalisé: EN ATTENTE    │
└─────────────────────────────────────────┘

URL Actuelle: https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net
URL Cible:   https://farorudy.fr
Statut:      ⏳ À configurer
```

---

## 📋 À FAIRE (3 Étapes)

### Étape 1: Configuration Azure (5-10 minutes)

```
TÂCHE: Ajouter le domaine dans Azure Portal
───────────────────────────────────────────

⬜ [ ] Ouvrir: https://portal.azure.com
⬜ [ ] Chercher: "Static Web Apps"
⬜ [ ] Cliquer: "rufamir" (votre ressource)
⬜ [ ] Menu gauche: "Domaines personnalisés"
⬜ [ ] Bouton: "+ Ajouter un domaine personnalisé"
⬜ [ ] Entrer: farorudy.fr
⬜ [ ] Sélectionner: "Domaine acheté ailleurs"
⬜ [ ] Cliquer: "Valider"
⬜ [ ] ✅ Copier les enregistrements DNS fournis

Résultat attendu:
  ✅ Message: "Domaine en attente de validation"
  ✅ Enregistrements DNS à configurer affichés
```

---

### Étape 2: Configuration DNS (5-10 minutes)

```
TÂCHE: Ajouter les enregistrements DNS
──────────────────────────────────────

📌 Registraire: [Votre registraire DNS]
   (OVH, GoDaddy, AWS Route53, Cloudflare, etc.)

ENREGISTREMENTS À AJOUTER:

1️⃣  CNAME Principal
    ─────────────────
    ⬜ [ ] Nom:   @
    ⬜ [ ] Type:  CNAME
    ⬜ [ ] Valeur: lemon-pebble-0d7cdbb10.azurestaticapps.net
    ⬜ [ ] TTL:   3600
    ⬜ [ ] SAUVEGARDER

2️⃣  TXT Validation (Azure vous donnera le code)
    ───────────────────────────────────────────
    ⬜ [ ] Nom:   _acm-validations.farorudy.fr
    ⬜ [ ] Type:  TXT
    ⬜ [ ] Valeur: [CODE_FOURNI_PAR_AZURE]
    ⬜ [ ] TTL:   3600
    ⬜ [ ] SAUVEGARDER

3️⃣  CNAME WWW (Optionnel)
    ───────────────────────
    ⬜ [ ] Nom:   www
    ⬜ [ ] Type:  CNAME
    ⬜ [ ] Valeur: lemon-pebble-0d7cdbb10.azurestaticapps.net
    ⬜ [ ] TTL:   3600
    ⬜ [ ] SAUVEGARDER

✅ Tous les enregistrements sauvegardés
```

---

### Étape 3: Vérification (5-15 minutes)

```
TÂCHE: Vérifier la configuration
────────────────────────────────

⏳ ATTENDRE: Propagation DNS
   • Temps typique: 5-15 minutes
   • Maximum: 48 heures
   • Patience: C'est normal ! ⏱️

🔍 TEST 1: Résolution DNS
   ⬜ [ ] Ouvrir PowerShell/Terminal
   ⬜ [ ] Exécuter: nslookup farorudy.fr
   ⬜ [ ] Résultat: Doit afficher une IP ou CNAME
   ⬜ [ ] ✅ OK: DNS propagé

🔐 TEST 2: Certificat SSL
   ⬜ [ ] Ouvrir navigateur
   ⬜ [ ] Aller à: https://farorudy.fr
   ⬜ [ ] ⏳ En attente (12-30 min)
   ⬜ [ ] ✅ Certificat généré automatiquement

🌐 TEST 3: Accès au site
   ⬜ [ ] URL: https://farorudy.fr
   ⬜ [ ] ✅ Page d'accueil affichée
   ⬜ [ ] ✅ Certificat SSL valide (🔒 vert)
   ⬜ [ ] ✅ Navigation fonctionnelle

📱 TEST 4: Variantes
   ⬜ [ ] Tester: http://farorudy.fr (redirection HTTP)
   ⬜ [ ] Tester: https://www.farorudy.fr (si configuré)
   ⬜ [ ] ✅ Tous les accès fonctionnent
```

---

## 📊 Timeline Estimée

```
┌─────────────────────────────────────────────────┐
│ Configuration farorudy.fr - Timeline            │
├─────────────────────────────────────────────────┤
│                                                 │
│ 0-5 min   : Étape 1 - Azure Portal              │
│            ████░░░░░░░░░░░░░░░░░░░░░░          │
│                                                 │
│ 5-10 min  : Étape 2 - Registraire DNS           │
│            ████████░░░░░░░░░░░░░░░░░░          │
│                                                 │
│ 10-20 min : Propagation DNS                     │
│            ████████████████░░░░░░░░░░░░        │
│            ⏳ Attendre...                       │
│                                                 │
│ 20-30 min : Certificat SSL                      │
│            ████████████████████░░░░░░░░        │
│            ⏳ Auto-généré par Azure              │
│                                                 │
│ 30+ min   : ✅ LIVE !                           │
│            ████████████████████████████        │
│            https://farorudy.fr 🚀              │
│                                                 │
│ Total: 30-45 minutes (cas normal)              │
│        jusqu'à 48h (maximum)                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🆘 Aide Rapide

### Q: Combien de temps ça prend?
**A:** 30-45 minutes généralement. Max 48h.

### Q: Comment savoir si c'est bien configuré?
**A:** Exécutez `nslookup farorudy.fr`. Devrait afficher une réponse.

### Q: Le domaine ne fonctionne toujours pas après 48h?
**A:** Vérifiez:
- [ ] CNAME exactement: `lemon-pebble-0d7cdbb10.azurestaticapps.net`
- [ ] Pas d'espaces supplémentaires
- [ ] TTL assez bas (3600 ou moins)

### Q: Certificat SSL invalide?
**A:** C'est normal les 30 premières minutes. Attendez.

### Q: Erreur 404 en accédant?
**A:** DNS pas encore propagé. Attendez 5-15 minutes.

---

## 📞 Ressources d'Aide

| Besoin | Ressource |
|--------|-----------|
| 📘 Guide complet | `docs/CUSTOM_DOMAIN_SETUP.md` |
| ⚡ Guide rapide | `docs/QUICK_DOMAIN_SETUP.md` |
| 🔧 Scripts auto | `scripts/setup-custom-domain.ps1` |
| 🐧 Script Linux | `scripts/setup-custom-domain.sh` |
| 🌐 Doc officielle | [Microsoft Learn](https://learn.microsoft.com/azure/static-web-apps/custom-domain) |
| 💬 Support Azure | [Support Portal](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade) |

---

## ✅ Avant/Après

```
AVANT                          APRÈS
─────────────────────────────────────
❌ n'est pas connecté          ✅ connecté à
   à farorudy.fr                  farorudy.fr

🌐 lemon-pebble-0d7cdbb10    🌐 farorudy.fr
   .2.azurestaticapps.net         (domaine custom)

⏳ À configurer                 ✅ Actif & Live
```

---

## 🎯 Résumé des Actions

```
VOUS:
  1. Ouvrir Azure Portal
  2. Ajouter domaine farorudy.fr
  3. Copier enregistrements DNS
  4. Aller chez registraire
  5. Ajouter CNAME + TXT
  6. Attendre 5-15 min
  7. Accéder à https://farorudy.fr ✅

AZURE (Automatique):
  • Reçoit et valide le domaine
  • Génère certificat SSL Let's Encrypt
  • Configure le routage
  • Active HTTPS automatique
```

---

**Status:** ⏳ EN ATTENTE DE VOTRE ACTION

**Prochaine étape:** Ouvrir https://portal.azure.com et ajouter le domaine

🚀 **Une fois fait**, votre app sera accessible via https://farorudy.fr !
