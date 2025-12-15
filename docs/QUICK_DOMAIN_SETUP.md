# 🌐 Configuration Rapide - Domaine farorudy.fr

## ⚡ TL;DR (Résumé rapide)

Pour connecter **farorudy.fr** à votre application:

### Option 1: Portail Azure (Simple)
```
1. Aller à https://portal.azure.com
2. Ouvrir "Static Web Apps" → "rufamir"
3. Cliquer "Domaines personnalisés" → "+ Ajouter"
4. Entrer: farorudy.fr
5. Copier l'enregistrement DNS fourni
6. Aller chez votre registraire DNS (OVH, GoDaddy, etc.)
7. Ajouter l'enregistrement CNAME:
   Nom: @
   Valeur: lemon-pebble-0d7cdbb10.azurestaticapps.net
8. Attendre 5-15 minutes
```

### Option 2: Azure CLI (Avancé)
```powershell
# Exécuter le script
.\scripts\setup-custom-domain.ps1 -ResourceGroup "votre-groupe" -Domain "farorudy.fr"
```

## 📋 Étapes Détaillées

### Étape 1: Accéder au Portail Azure

1. Ouvrir: https://portal.azure.com
2. Chercher: "Static Web Apps"
3. Cliquer sur **"rufamir"**

### Étape 2: Ajouter le Domaine

1. Dans le menu gauche: **"Domaines personnalisés"**
2. Bouton: **"+ Ajouter un domaine personnalisé"**
3. Entrer: `farorudy.fr`
4. Sélectionner: **"Domaine acheté ailleurs"**
5. Cliquer: **"Valider"**

### Étape 3: Configuration DNS

Azure vous montrera les enregistrements à ajouter. Allez chez votre registraire:

#### 📌 CNAME (Recommandé)
```
Type: CNAME
Nom (Host): @
Valeur (Points to): lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL: 3600
```

#### 📌 TXT (Validation)
```
Type: TXT
Nom (Host): _acm-validations.farorudy.fr
Valeur: [CODE_FOURNI_PAR_AZURE]
TTL: 3600
```

#### 📌 Pour www (Optionnel)
```
Type: CNAME
Nom (Host): www
Valeur (Points to): lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL: 3600
```

### Étape 4: Vérification

```powershell
# Vérifier la propagation DNS
nslookup farorudy.fr

# Devrait afficher:
# Name:    farorudy.fr
# Address: (IP d'Azure)
```

### Étape 5: Accès

Après 5-15 minutes:
```
✅ https://farorudy.fr
✅ https://www.farorudy.fr
```

## 🆘 Troubleshooting

| Problème | Solution |
|----------|----------|
| Le domaine ne se propage pas | Attendre 48h, vérifier TTL, vider cache DNS |
| Erreur "certificat invalide" | Attendre la génération du certificat SSL (15-30 min) |
| DNS invalide | Vérifier la syntaxe exacte chez votre registraire |
| Le domaine reste en "validation" | Vérifier l'enregistrement TXT exact |

## 🔗 Ressources

- 📘 [Doc officielle Azure](https://learn.microsoft.com/azure/static-web-apps/custom-domain)
- 📘 [Configuration DNS](https://learn.microsoft.com/azure/static-web-apps/custom-domain-azure-dns)
- 💬 [Support Azure](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade)

## 📞 Besoin d'aide ?

- Vérifier le fichier: `docs/CUSTOM_DOMAIN_SETUP.md`
- Exécuter le script: `scripts/setup-custom-domain.ps1`
- Contacter: Support Azure
