#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Script pour configurer le domaine personnalisé farorudy.fr sur Azure Static Web Apps

.DESCRIPTION
    Ce script aide à configurer et vérifier la configuration du domaine personnalisé.

.PARAMETER ResourceGroup
    Nom du groupe de ressources Azure

.PARAMETER StaticWebAppName
    Nom de la ressource Static Web Apps (par défaut: rufamir)

.PARAMETER Domain
    Domaine personnalisé à ajouter (par défaut: farorudy.fr)

.EXAMPLE
    .\setup-custom-domain.ps1 -ResourceGroup "my-resource-group" -Domain "farorudy.fr"
#>

param(
    [string]$ResourceGroup = "default-resource-group",
    [string]$StaticWebAppName = "rufamir",
    [string]$Domain = "farorudy.fr"
)

Write-Host "🔧 Configuration du Domaine Personnalisé" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier la connexion Azure
Write-Host "1️⃣  Vérification de la connexion Azure..." -ForegroundColor Yellow
$account = az account show 2>$null

if (-not $account) {
    Write-Host "❌ Pas connecté à Azure. Connexion en cours..." -ForegroundColor Red
    az login
} else {
    $email = ($account | ConvertFrom-Json).user.name
    Write-Host "✅ Connecté en tant que: $email" -ForegroundColor Green
}

Write-Host ""

# 2. Vérifier la ressource Static Web Apps
Write-Host "2️⃣  Vérification de la ressource Static Web Apps..." -ForegroundColor Yellow
$swaExists = az staticwebapp show `
    --name $StaticWebAppName `
    --resource-group $ResourceGroup `
    2>$null

if (-not $swaExists) {
    Write-Host "❌ Erreur: Ressource Static Web Apps '$StaticWebAppName' non trouvée dans '$ResourceGroup'" -ForegroundColor Red
    Write-Host "   Utilisez: az staticwebapp list" -ForegroundColor Gray
    exit 1
}

$swaInfo = $swaExists | ConvertFrom-Json
Write-Host "✅ Ressource trouvée: $($swaInfo.name)" -ForegroundColor Green
Write-Host "   URL: $($swaInfo.defaultHostname)" -ForegroundColor Gray

Write-Host ""

# 3. Vérifier les domaines actuels
Write-Host "3️⃣  Domaines actuels configurés:" -ForegroundColor Yellow
$domains = az staticwebapp custom-domain list `
    --name $StaticWebAppName `
    --resource-group $ResourceGroup `
    2>$null | ConvertFrom-Json

if ($domains) {
    $domains | ForEach-Object {
        Write-Host "   • $($_.name)" -ForegroundColor Green
    }
} else {
    Write-Host "   (Aucun domaine personnalisé configuré)" -ForegroundColor Gray
}

Write-Host ""

# 4. Ajouter le domaine personnalisé
Write-Host "4️⃣  Ajout du domaine personnalisé: $Domain" -ForegroundColor Yellow

$confirm = Read-Host "Êtes-vous sûr de vouloir ajouter '$Domain' ? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "❌ Opération annulée" -ForegroundColor Red
    exit 1
}

try {
    $result = az staticwebapp custom-domain add `
        --name $StaticWebAppName `
        --resource-group $ResourceGroup `
        --domain-name $Domain `
        2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Domaine ajouté avec succès" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
        Write-Host "   1. Copier l'identifiant de validation fourni par Azure"
        Write-Host "   2. Configurer les enregistrements DNS chez votre registraire:"
        Write-Host "      • CNAME: $Domain → $($swaInfo.defaultHostname)"
        Write-Host "      • TXT: _acm-validations.$Domain → [code validation]"
        Write-Host "   3. Attendre la propagation DNS (5-15 minutes)"
        Write-Host "   4. Vérifier avec: nslookup $Domain"
    } else {
        Write-Host "❌ Erreur: $result" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 5. Tester la résolution DNS
Write-Host "5️⃣  Test de résolution DNS..." -ForegroundColor Yellow
Write-Host "   Exécutez: nslookup $Domain" -ForegroundColor Gray
Write-Host "   ou: dig $Domain" -ForegroundColor Gray

Write-Host ""
Write-Host "✨ Configuration du domaine personnalisé en cours..." -ForegroundColor Green
Write-Host "   Consultez: https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade" -ForegroundColor Gray
