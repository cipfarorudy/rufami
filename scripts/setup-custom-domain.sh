#!/bin/bash
# Configuration du domaine personnalisé farorudy.fr sur Azure Static Web Apps

set -e

RESOURCE_GROUP="${1:-default-resource-group}"
SWA_NAME="${2:-rufamir}"
DOMAIN="${3:-farorudy.fr}"

echo "🔧 Configuration du Domaine Personnalisé"
echo "========================================"
echo ""

# 1. Vérifier la connexion Azure
echo "1️⃣  Vérification de la connexion Azure..."
if ! az account show > /dev/null 2>&1; then
    echo "❌ Pas connecté à Azure. Connexion en cours..."
    az login
else
    EMAIL=$(az account show --query "user.name" -o tsv)
    echo "✅ Connecté en tant que: $EMAIL"
fi

echo ""

# 2. Vérifier la ressource Static Web Apps
echo "2️⃣  Vérification de la ressource Static Web Apps..."
if ! az staticwebapp show --name "$SWA_NAME" --resource-group "$RESOURCE_GROUP" > /dev/null 2>&1; then
    echo "❌ Erreur: Ressource Static Web Apps '$SWA_NAME' non trouvée"
    echo "   Utilisez: az staticwebapp list"
    exit 1
fi

SWA_INFO=$(az staticwebapp show --name "$SWA_NAME" --resource-group "$RESOURCE_GROUP")
DEFAULT_HOSTNAME=$(echo "$SWA_INFO" | jq -r '.defaultHostname')
echo "✅ Ressource trouvée: $SWA_NAME"
echo "   URL: $DEFAULT_HOSTNAME"

echo ""

# 3. Vérifier les domaines actuels
echo "3️⃣  Domaines actuels configurés:"
DOMAINS=$(az staticwebapp custom-domain list --name "$SWA_NAME" --resource-group "$RESOURCE_GROUP" 2>/dev/null || echo "[]")
if [ "$DOMAINS" != "[]" ]; then
    echo "$DOMAINS" | jq -r '.[].name' | while read -r dom; do
        echo "   • $dom"
    done
else
    echo "   (Aucun domaine personnalisé configuré)"
fi

echo ""

# 4. Ajouter le domaine personnalisé
echo "4️⃣  Ajout du domaine personnalisé: $DOMAIN"
read -p "Êtes-vous sûr de vouloir ajouter '$DOMAIN' ? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Opération annulée"
    exit 1
fi

if az staticwebapp custom-domain add \
    --name "$SWA_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --domain-name "$DOMAIN" > /dev/null 2>&1; then
    echo "✅ Domaine ajouté avec succès"
    echo ""
    echo "📋 Prochaines étapes:"
    echo "   1. Copier l'identifiant de validation fourni par Azure"
    echo "   2. Configurer les enregistrements DNS chez votre registraire:"
    echo "      • CNAME: $DOMAIN → $DEFAULT_HOSTNAME"
    echo "      • TXT: _acm-validations.$DOMAIN → [code validation]"
    echo "   3. Attendre la propagation DNS (5-15 minutes)"
    echo "   4. Vérifier avec: nslookup $DOMAIN"
else
    echo "❌ Erreur lors de l'ajout du domaine"
    exit 1
fi

echo ""
echo "✨ Configuration du domaine personnalisé en cours..."
