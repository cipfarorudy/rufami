import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CRUDList from './components/CRUDList';
import { useLanguage } from './context/LanguageContext';
import { t } from './i18n/translations';
import { unlockAndMigrate, persistV2 } from './security/vaultCrypto';

// Stockage chiffré (clé unique)
const ENCRYPTED_KEY = 'coffreFortEnc';
const LEGACY_KEY = 'coffreFort';

function CoffreFort({ showToast }) {
  const { lang } = useLanguage();
  const [masterPass, setMasterPass] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function doUnlock() {
      if (!unlocked) return;
      setLoading(true);
      const result = await unlockAndMigrate(masterPass, { legacyKey: LEGACY_KEY, encryptedKey: ENCRYPTED_KEY });
      if (cancelled) return;
      setLoading(false);
      if (result.error) {
        setError(result.error);
        setUnlocked(false);
        return;
      }
      setItems(result.items || []);
      setMigrated(!!result.migrated);
      if (result.migrated && showToast) showToast('Migration vers chiffrement PBKDF2 v2 effectuée.');
    }
    doUnlock();
    return () => { cancelled = true; };
  }, [unlocked, masterPass, showToast]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!masterPass) return;
    setError('');
    setUnlocked(true);
  };

  const persist = async (newItems) => {
    await persistV2(newItems, masterPass, ENCRYPTED_KEY);
    setItems(newItems);
    if (showToast) showToast(t('vault.updated_enc', lang));
  };

  if (!unlocked) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow max-w-md">
        <h3 className="text-xl font-bold mb-2" id="vault-heading">{t('vault.locked', lang)}</h3>
        <p className="text-sm mb-4">{t('vault.desc', lang)}</p>
        <form onSubmit={handleUnlock} className="flex flex-col gap-2" aria-labelledby="vault-heading">
          <label className="text-sm font-semibold" htmlFor="master-pass">{t('vault.masterPass', lang)}</label>
          <input 
            id="master-pass" 
            type="password" 
            value={masterPass} 
            onChange={e => setMasterPass(e.target.value)} 
            className="border rounded px-2 py-1"
            placeholder={t('vault.masterPass', lang)}
            aria-describedby="master-pass-desc"
            required 
          />
          <p id="master-pass-desc" className="text-xs text-gray-600 dark:text-gray-300">
            {lang === 'fr' 
              ? 'Mot de passe pour accéder à vos identifiants chiffrés (PBKDF2 + AES-256)' 
              : lang === 'es' 
              ? 'Contraseña para acceder a sus credenciales encriptadas (PBKDF2 + AES-256)' 
              : 'Password to access your encrypted credentials (PBKDF2 + AES-256)'}
          </p>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors" 
            disabled={!masterPass}
            aria-label={t('vault.unlock', lang)}
          >
            {t('vault.unlock', lang)}
          </button>
        </form>
        {error && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded" role="alert" aria-live="polite">
            <p className="text-red-700 dark:text-red-300 text-sm font-semibold">{error}</p>
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">
              {lang === 'fr' 
                ? '💡 Conseil: Vérifiez que le mot de passe est correct (majuscules/minuscules comptent)' 
                : lang === 'es' 
                ? '💡 Consejo: Verifica que la contraseña sea correcta (mayúsculas/minúsculas importan)' 
                : '💡 Tip: Make sure the password is correct (case-sensitive)'}
            </p>
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600">
          <Link to="/vault-diagnostics" className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-semibold">
            🔍 {lang === 'fr' ? 'Aide - Problèmes de déverrouillage?' : lang === 'es' ? 'Ayuda - ¿Problemas de desbloqueo?' : 'Help - Unlock issues?'}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow max-w-md" role="status">
        <p className="font-semibold mb-2">{t('vault.decrypting', lang)}</p>
        <p className="text-sm opacity-70">Veuillez patienter.</p>
      </div>
    );
  }

  return (
    <CRUDList
      storageKey={null}
      controlledItems={items}
      onItemsChange={persist}
      initialItems={[]}
      title={t('vault.title', lang)}
      fields={[
        { name: 'site', label: t('vault.site', lang) },
        { name: 'login', label: t('vault.login', lang) },
        { name: 'password', label: t('vault.password', lang), type: 'password' }
      ]}
      itemRender={(item) => (
        <>
          <span className="font-semibold">{item.site}</span> - <span>{item.login}</span> - <span className="font-mono">••••••••</span>
        </>
      )}
      showToast={showToast}
      itemTestId="coffre-item"
      lang={lang}
      footer={<p className="text-xs opacity-70 mt-2">{t('vault.footer', lang)} {migrated && t('vault.migrated', lang)}</p>}
    />
  );
}

export default CoffreFort;
