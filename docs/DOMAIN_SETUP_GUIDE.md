# 🚀 Configuration de farorudy.fr - Guide Complet

## État Actuel

✅ **Application déployée**: https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net  
⏳ **Domaine personnalisé**: À configurer

## Problème

L'application n'est pas accessible via **farorudy.fr**. Nous devons configurer le domaine personnalisé dans Azure Static Web Apps.

## Solution - 3 Étapes

### ✅ Étape 1: Fichiers de Configuration (COMPLÉTÉE)

Les fichiers suivants ont été créés:

- `public/staticwebapp.config.json` - Configuration Azure Static Web Apps
- `docs/CUSTOM_DOMAIN_SETUP.md` - Guide détaillé complet
- `docs/QUICK_DOMAIN_SETUP.md` - Guide rapide
- `scripts/setup-custom-domain.ps1` - Script PowerShell (Windows)
- `scripts/setup-custom-domain.sh` - Script Bash (Linux/Mac)

### ⏳ Étape 2: Configuration du Domaine (À FAIRE - VOUS)

**Vous devez faire cette étape manuellement ou en utilisant le script fourni.**

#### Option A: Via le Portail Azure (GUI - Recommandé)

```
1. Ouvrir: https://portal.azure.com
2. Rechercher: Static Web Apps
3. Sélectionner: rufamir
4. Cliquer: Domaines personnalisés
5. Bouton: + Ajouter un domaine personnalisé
6. Entrer: farorudy.fr
7. Cliquer: Valider
8. Copier les enregistrements DNS fournis
```

#### Option B: Via Azure CLI

```powershell
# Windows PowerShell
.\scripts\setup-custom-domain.ps1 -ResourceGroup "votre-groupe-ressources" -Domain "farorudy.fr"

# Linux/Mac bash
bash scripts/setup-custom-domain.sh "votre-groupe-ressources" "rufamir" "farorudy.fr"
```

### ⏳ Étape 3: Configuration DNS (À FAIRE - CHEZ VOTRE REGISTRAIRE)

Une fois le domaine ajouté dans Azure, vous recevrez des enregistrements DNS à configurer.

#### Accéder à votre registraire DNS

- **OVH** → https://www.ovh.com/manager
- **GoDaddy** → https://godaddy.com
- **AWS Route53** → https://console.aws.amazon.com/route53
- **CloudFlare** → https://dash.cloudflare.com
- **Autre** → [Vérifier votre panel]

#### Ajouter les enregistrements

**CNAME (Principal):**
```
Nom:   @
Type:  CNAME
Value: lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL:   3600
```

**TXT (Validation - Azure vous donnera le code):**
```
Nom:   _acm-validations.farorudy.fr
Type:  TXT
Value: [CODE_FOURNI_PAR_AZURE]
TTL:   3600
```

**WWW (Optionnel):**
```
Nom:   www
Type:  CNAME
Value: lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL:   3600
```

## 🔍 Vérification

### Test 1: Résolution DNS
```powershell
nslookup farorudy.fr
# Devrait afficher une IP ou le CNAME
```

### Test 2: Accès HTTPS
```powershell
curl -I https://farorudy.fr
# Devrait retourner HTTP 200 avec certificat valide
```

### Test 3: Redirection automatique
```
http://farorudy.fr → https://farorudy.fr (automatique)
```

## ⏱️ Délais

- **Configuration DNS**: Immédiat
- **Propagation DNS**: 5-15 minutes (parfois jusqu'à 48h)
- **Certificat SSL**: 5-30 minutes après validation DNS
- **Total**: 15-45 minutes (cas normal)

## 📊 Flux Complet

```
┌─────────────────────────────────────────┐
│ Application Rufami                      │
│ (React 19, Tailwind, i18n FR/EN/ES)    │
└────────────┬────────────────────────────┘
             │
     ✅ Déployée sur Azure Static Web Apps
             │
    ┌────────▼────────────────────────────┐
    │ lemon-pebble-0d7cdbb10.           │
    │ 2.azurestaticapps.net             │
    │ (Azure URL générique)             │
    └────────┬─────────────────────────────┘
             │
     ⏳ À configurer: domaine personnalisé
             │
    ┌────────▼─────────────────────────────┐
    │ farorudy.fr                          │
    │ (Votre domaine personnalisé)        │
    └──────────────────────────────────────┘
             │
         Utilisateurs: https://farorudy.fr
```

## 📋 Checklist

- [ ] Ouvrir le portail Azure
- [ ] Ajouter le domaine `farorudy.fr` dans Static Web Apps
- [ ] Copier les enregistrements DNS fournis par Azure
- [ ] Accéder au registraire DNS de farorudy.fr
- [ ] Ajouter l'enregistrement CNAME
- [ ] Ajouter l'enregistrement TXT (validation)
- [ ] Attendre la propagation DNS
- [ ] Tester: `nslookup farorudy.fr`
- [ ] Accéder à: https://farorudy.fr
- [ ] Vérifier le certificat SSL
- [ ] Tester l'accès au site

## 🆘 En Cas de Problème

### Le domaine ne se propage pas (> 48h)
- Vérifier l'enregistrement CNAME exactement
- Vérifier les espaces/caractères dans la valeur
- Vider le cache DNS: `ipconfig /flushdns` (Windows)
- Essayer un autre serveur DNS: `nslookup farorudy.fr 8.8.8.8`

### Certificat SSL invalide
- C'est normal les 30 premières minutes
- Attendre que Azure génère le certificat
- Forcer l'actualisation: `Ctrl+Shift+R`

### Erreur 404 après accès
- Attendre que la propagation DNS soit complète
- Vérifier que le CNAME est correctement saisi
- Tester depuis un autre navigateur/appareil

### Validation du domaine reste bloquée
- Vérifier l'enregistrement TXT exact
- S'assurer que le code de validation est complet
- Attendre la propagation DNS du TXT
- Cliquer "Revalider" dans le portail Azure

## 📞 Support

- **Docs Complet**: `docs/CUSTOM_DOMAIN_SETUP.md`
- **Guide Rapide**: `docs/QUICK_DOMAIN_SETUP.md`
- **Support Azure**: https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade
- **Documentation Officielle**: https://learn.microsoft.com/azure/static-web-apps/custom-domain

## 🎯 Prochaines Actions

1. **Maintenant** (⏰ 5 min):
   - Lire ce guide
   - Préparer les informations du registraire DNS

2. **Étape 1** (⏰ 5-10 min):
   - Ouvrir portail.azure.com
   - Ajouter le domaine farorudy.fr

3. **Étape 2** (⏰ 5-10 min):
   - Accéder au registraire DNS
   - Ajouter les enregistrements

4. **Étape 3** (⏰ 15-30 min):
   - Attendre la propagation
   - Tester l'accès

5. **Total**: ~30-60 minutes

---

✨ **Une fois configuré**, l'application sera accessible via:
- https://farorudy.fr
- https://www.farorudy.fr (si configuré)
- Les anciens URLs Azure continueront de fonctionner

Bonne chance ! 🚀
