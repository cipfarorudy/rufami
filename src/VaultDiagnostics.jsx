import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { t } from './i18n/translations';

/**
 * Page de diagnostic pour les problèmes de Coffre-Fort
 * Aide à identifier et résoudre les problèmes de déverrouillage
 */
function VaultDiagnostics() {
  const { lang } = useLanguage();
  const [diagnostics, setDiagnostics] = useState({
    hasData: false,
    dataSize: 0,
    webCryptoAvailable: false,
    localStorageAvailable: false,
    vaultVersion: null,
    testDecryptSuccess: false,
    testPassword: '',
    showResults: false,
  });

  const runDiagnostics = async () => {
    const results = { ...diagnostics };

    // Check 1: localStorage disponible?
    results.localStorageAvailable = typeof localStorage !== 'undefined';

    // Check 2: Web Crypto disponible?
    results.webCryptoAvailable = !!(
      typeof crypto !== 'undefined' &&
      crypto.subtle &&
      crypto.subtle.decrypt
    );

    // Check 3: Données dans localStorage?
    const stored = localStorage.getItem('coffreFortEnc');
    results.hasData = !!stored;
    results.dataSize = stored ? stored.length : 0;

    // Check 4: Format et version
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        results.vaultVersion = parsed.version || 'unknown';
      } catch (e) {
        results.vaultVersion = 'legacy (not JSON)';
      }
    }

    // Capture les logs
    console.log('[Vault Diagnostics] Results:', results);
    console.log('[Vault Diagnostics] Stored data size:', results.dataSize, 'bytes');
    console.log('[Vault Diagnostics] Web Crypto available:', results.webCryptoAvailable);
    console.log('[Vault Diagnostics] localStorage available:', results.localStorageAvailable);

    setDiagnostics({ ...results, showResults: true });
  };

  const clearAndReset = () => {
    if (window.confirm('⚠️ Êtes-vous sûr? Cela supprimera TOUTES vos données du Coffre-Fort chiffré.')) {
      localStorage.removeItem('coffreFortEnc');
      localStorage.removeItem('coffreFort');
      alert('✅ Données du Coffre-Fort supprimées. Vous pouvez maintenant créer un nouveau Coffre-Fort avec un nouveau mot de passe.');
      setDiagnostics({ ...diagnostics, hasData: false, showResults: false });
    }
  };

  const exportData = () => {
    const stored = localStorage.getItem('coffreFortEnc');
    const dataStr = `Données exportées le ${new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}:\n\n${stored || '(Aucune donnée)'}`;
    const dataBlob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coffre-fort-backup-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border border-blue-200 dark:border-blue-700 mb-6">
        <h2 className="text-2xl font-bold mb-2">🔍 Diagnostic - Coffre-Fort</h2>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Cette page vous aide à diagnostiquer et résoudre les problèmes de déverrouillage du Coffre-Fort.
        </p>
      </div>

      {/* Bouton diagnostic */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow mb-6">
        <button
          onClick={runDiagnostics}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          🔧 Lancer le diagnostic
        </button>
      </div>

      {/* Résultats */}
      {diagnostics.showResults && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded shadow mb-6 space-y-4">
          <h3 className="text-xl font-bold mb-4">Résultats du diagnostic:</h3>

          {/* Storage */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="font-semibold">💾 localStorage</p>
            <p className={diagnostics.localStorageAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {diagnostics.localStorageAvailable ? '✅ Disponible' : '❌ Non disponible'}
            </p>
          </div>

          {/* Web Crypto */}
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="font-semibold">🔐 Web Crypto API</p>
            <p className={diagnostics.webCryptoAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {diagnostics.webCryptoAvailable ? '✅ Disponible' : '❌ Non disponible'}
            </p>
            {!diagnostics.webCryptoAvailable && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                ⚠️ Votre navigateur ne supporte pas le chiffrement. Utilisez une version récente de Chrome, Firefox, Safari ou Edge.
              </p>
            )}
          </div>

          {/* Données */}
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="font-semibold">📊 Données stockées</p>
            <p className={diagnostics.hasData ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
              {diagnostics.hasData ? '✅ Données trouvées' : '⚠️ Aucune donnée'}
            </p>
            {diagnostics.hasData && (
              <>
                <p className="text-sm mt-2">
                  Taille: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{diagnostics.dataSize} caractères</code>
                </p>
                <p className="text-sm">
                  Version: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{diagnostics.vaultVersion}</code>
                </p>
              </>
            )}
          </div>

          {/* Solutions */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-bold mb-3">💡 Solutions possibles:</h4>

            {!diagnostics.hasData && (
              <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded text-sm mb-3 border border-yellow-200 dark:border-yellow-700">
                <p className="font-semibold mb-2">1️⃣ Aucune donnée trouvée</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Votre Coffre-Fort est vide - c'est normal si c'est votre première utilisation</li>
                  <li>Si vous aviez des données, elles ont peut-être été supprimées</li>
                  <li>Essayez de choisir un mot de passe et d'ajouter vos premières entrées</li>
                </ul>
              </div>
            )}

            {diagnostics.hasData && !diagnostics.webCryptoAvailable && (
              <div className="bg-red-50 dark:bg-red-900 p-3 rounded text-sm mb-3 border border-red-200 dark:border-red-700">
                <p className="font-semibold mb-2">2️⃣ Web Crypto non disponible</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Votre navigateur ne supporte pas le déchiffrement AES-GCM</li>
                  <li>Solution: Utilisez Chrome, Firefox, Safari ou Edge (versions récentes)</li>
                </ul>
              </div>
            )}

            {diagnostics.hasData && diagnostics.webCryptoAvailable && (
              <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded text-sm mb-3 border border-orange-200 dark:border-orange-700">
                <p className="font-semibold mb-2">3️⃣ Mauvais mot de passe?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Les données sont chiffrées et nécessitent le bon mot de passe pour déverrouiller</li>
                  <li>Essayez le mot de passe exact que vous aviez défini (majuscules/minuscules important)</li>
                  <li>Si vous oubliez le mot de passe, vous devrez réinitialiser</li>
                </ul>
              </div>
            )}

            {diagnostics.hasData && !diagnostics.webCryptoAvailable && (
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded text-sm mb-3 border border-blue-200 dark:border-blue-700">
                <p className="font-semibold mb-2">4️⃣ Réinitialiser le Coffre-Fort</p>
                <p className="mb-2">⚠️ Cette action supprimera toutes les données actuelles:</p>
                <button
                  onClick={clearAndReset}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  🗑️ Réinitialiser
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          {diagnostics.hasData && (
            <div className="border-t pt-4 mt-4 flex gap-2">
              <button
                onClick={exportData}
                className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 text-sm"
                title="Exporte vos données chiffrées (ne peut être déchiffré sans le mot de passe)"
              >
                💾 Exporter données
              </button>
              <button
                onClick={clearAndReset}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
              >
                🗑️ Réinitialiser
              </button>
            </div>
          )}
        </div>
      )}

      {/* Guide de troubleshooting */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-3">📋 Guide de troubleshooting</h3>
        <div className="space-y-3 text-sm">
          <details className="border rounded p-2">
            <summary className="cursor-pointer font-semibold">
              Q: J'oublie toujours mon mot de passe du Coffre-Fort
            </summary>
            <div className="mt-2 text-xs opacity-75">
              <p>R: Le mot de passe est utilisé uniquement pour chiffrer/déchiffrer vos données. Il n'est stocké nulle part.</p>
              <p className="mt-1">💡 Conseil: Utilisez un gestionnaire de mots de passe externe pour stocker le mot de passe du Coffre-Fort lui-même!</p>
            </div>
          </details>

          <details className="border rounded p-2">
            <summary className="cursor-pointer font-semibold">
              Q: Mes données du Coffre-Fort ont disparu
            </summary>
            <div className="mt-2 text-xs opacity-75">
              <p>R: Vérifiez les causes possibles:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>localStorage a été effacé (vider le cache navigateur le supprime)</li>
                <li>Vous êtes en mode navigation privée/incognito (données supprimées à la fermeture)</li>
                <li>Vous avez changé de navigateur (les données sont locales)</li>
              </ul>
            </div>
          </details>

          <details className="border rounded p-2">
            <summary className="cursor-pointer font-semibold">
              Q: Le diagnostic montre que tout est OK mais ça ne marche toujours pas
            </summary>
            <div className="mt-2 text-xs opacity-75">
              <p>R: Essayez:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Rafraîchir la page (Ctrl+F5 ou Cmd+Shift+R)</li>
                <li>Vider le cache et les cookies du navigateur</li>
                <li>Essayer dans une fenêtre de navigation privée</li>
                <li>Essayer dans un autre navigateur</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default VaultDiagnostics;
