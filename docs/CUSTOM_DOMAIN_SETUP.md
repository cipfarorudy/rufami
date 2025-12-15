# Configuration du Domaine Personnalisé farorudy.fr

## Étapes pour connecter le domaine farorudy.fr à Azure Static Web Apps

### 1. **Via le Portail Azure**

#### Accéder à la ressource Static Web Apps
```
1. Ouvrir https://portal.azure.com
2. Rechercher "Static Web Apps"
3. Sélectionner la ressource "rufamir" (ou votre ressource)
4. Cliquer sur "Domaines personnalisés" dans le menu latéral
```

#### Ajouter le domaine personnalisé
```
1. Cliquer sur "+ Ajouter un domaine personnalisé"
2. Entrer: farorudy.fr
3. Sélectionner le type de domaine: "Domain bought elsewhere"
4. Azure générera un identifiant de validation
```

#### Configurer les enregistrements DNS
Azure vous fournira les enregistrements DNS à ajouter chez votre registraire (ex: GoDaddy, OVH, etc.)

**Types d'enregistrements à configurer:**

**Option 1: Avec CNAME (Recommandé - plus simple)**
```
Nom: @
Type: CNAME
Valeur: lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL: 3600
```

**Option 2: Avec A Record (Si CNAME non disponible)**
```
Nom: @
Type: A
Valeur: [IP fournie par Azure]
TTL: 3600
```

**Pour www:**
```
Nom: www
Type: CNAME
Valeur: lemon-pebble-0d7cdbb10.azurestaticapps.net
TTL: 3600
```

**Vérification TXT (fournie par Azure):**
```
Nom: _acm-validations.farorudy.fr
Type: TXT
Valeur: [Code fourni par Azure]
TTL: 3600
```

### 2. **Via Azure CLI**

Si vous préférez la ligne de commande:

```powershell
# Installer Azure CLI (si pas déjà fait)
# https://learn.microsoft.com/cli/azure/install-azure-cli

# Se connecter à Azure
az login

# Ajouter le domaine personnalisé
az staticwebapp custom-domain add \
  --name rufamir \
  --resource-group [VOTRE_RESOURCE_GROUP] \
  --domain-name farorudy.fr

# Lister les domaines
az staticwebapp custom-domain list \
  --name rufamir \
  --resource-group [VOTRE_RESOURCE_GROUP]
```

### 3. **Vérification après configuration**

```bash
# Tester la résolution DNS
nslookup farorudy.fr

# Tester si le domaine pointe vers Azure
curl -I https://farorudy.fr
```

### 4. **Certificat SSL/TLS**

Azure Static Web Apps génère automatiquement des certificats SSL/TLS gratuits via Let's Encrypt pour les domaines personnalisés.

- **Temps d'activation**: 5-15 minutes après la validation DNS
- **Renouvellement**: Automatique
- **HTTPS**: Activé par défaut

### 5. **Redirection www vers non-www (Optionnel)**

Pour rediriger `www.farorudy.fr` vers `farorudy.fr`:

Ajouter une règle dans `public/staticwebapp.config.json`:

```json
{
  "routes": [
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

### 6. **Troubleshooting**

**Le domaine n'est pas actif après 15 minutes:**
- ✓ Vérifier que l'enregistrement DNS est correct
- ✓ Attendre la propagation DNS (jusqu'à 48h)
- ✓ Vider le cache DNS: `ipconfig /flushdns` (Windows)
- ✓ Vérifier les certificats SSL

**Erreur de validation de domaine:**
- ✓ S'assurer que l'enregistrement TXT est exactement comme fourni par Azure
- ✓ Attendre que l'enregistrement se propage
- ✓ Réessayer la validation dans le portail

**HTTPS non actif:**
- ✓ Attendre 15-30 minutes (génération du certificat)
- ✓ Forcer actualisation du navigateur (Ctrl+Shift+R)

### 7. **Endpoints actuels**

**Avant configuration du domaine:**
```
https://lemon-pebble-0d7cdbb10.2.azurestaticapps.net
https://yellow-mud-056280c10.2.azurestaticapps.net (si configuré)
```

**Après configuration du domaine:**
```
https://farorudy.fr
https://www.farorudy.fr (si configuré)
```

### 8. **Documentation officielle**

- [Configurer un domaine personnalisé dans Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/custom-domain)
- [Configurer les enregistrements DNS](https://learn.microsoft.com/azure/static-web-apps/custom-domain-azure-dns)

## Résumé des Actions Requises

1. ✅ **Fichier staticwebapp.config.json créé** (gère le routage et la validation)
2. ⏳ **À faire**: Accéder au portail Azure et ajouter le domaine personnalisé
3. ⏳ **À faire**: Configurer les enregistrements DNS chez votre registraire
4. ⏳ **À faire**: Attendre la propagation DNS et la validation du certificat SSL
5. ✅ **Vérifier**: Accéder à https://farorudy.fr

---

**Besoin d'aide ?**
- Support Azure: https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade
- FAQ Azure Static Web Apps: https://learn.microsoft.com/azure/static-web-apps/faq
