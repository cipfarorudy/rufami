import {
  encryptItems,
  decryptItems,
  deriveKey,
  unlockAndMigrate,
  encryptItemsV2,
  decryptItemsV2,
} from "./security/vaultCrypto";

/**
 * Test d'intégration : Migration v1 → v2
 * Simule :
 * 1. Données plaintext stockées
 * 2. Données v1 (AES CryptoJS)
 * 3. Premier déverrouillage déclenche migration auto vers v2 (PBKDF2 + AES-GCM)
 */

describe("Migration Vault v1 → v2", () => {
  const ENCRYPTED_KEY = "coffreFortEnc";
  const LEGACY_KEY = "coffreFort";
  const MASTER_PASS = "testPassword123";

  const sampleItems = [
    { site: "Gmail", login: "user@gmail.com", password: "pwd123" },
    { site: "GitHub", login: "devuser", password: "ghtoken456" },
  ];

  beforeEach(() => {
    // Nettoyer les deux clés avant chaque test
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(ENCRYPTED_KEY);
      localStorage.removeItem(LEGACY_KEY);
    }
  });

  test("Migration plaintext → v2", async () => {
    // Simuler données legacy plaintext (ancien format non chiffré)
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LEGACY_KEY, JSON.stringify(sampleItems));
    }

    // Appeler unlockAndMigrate : doit détecter plaintext et migrer vers v2
    const result = await unlockAndMigrate(MASTER_PASS, {
      legacyKey: LEGACY_KEY,
      encryptedKey: ENCRYPTED_KEY,
    });

    expect(result.items).toEqual(sampleItems);
    expect(result.migrated).toBe(true);
    expect(result.version).toBe(2);

    // Vérifier que données sont maintenant en v2 dans localStorage
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(ENCRYPTED_KEY);
      expect(stored).toBeTruthy();
      const record = JSON.parse(stored);
      expect(record.version).toBe(2);
      expect(record.salt).toBeTruthy();
      expect(record.iterations).toBe(150000);
      expect(record.iv).toBeTruthy();
      expect(record.ciphertext).toBeTruthy();
      // Aucune donnée en clair
      expect(stored).not.toContain("Gmail");
      expect(stored).not.toContain("user@gmail.com");
    }
  });

  test("Migration v1 (AES CryptoJS) → v2 (PBKDF2 + AES-GCM)", async () => {
    // Créer données v1 : chiffrer avec ancienne méthode SHA-256 + AES
    const keyV1 = deriveKey(MASTER_PASS);
    const cipherV1 = encryptItems(sampleItems, keyV1);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(ENCRYPTED_KEY, cipherV1);
    }

    // Appeler unlockAndMigrate : doit détecter v1 et migrer vers v2
    const result = await unlockAndMigrate(MASTER_PASS, {
      legacyKey: LEGACY_KEY,
      encryptedKey: ENCRYPTED_KEY,
    });

    expect(result.items).toEqual(sampleItems);
    expect(result.migrated).toBe(true);
    expect(result.version).toBe(2);

    // Vérifier que données sont maintenant en v2
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(ENCRYPTED_KEY);
      const record = JSON.parse(stored);
      expect(record.version).toBe(2);
      expect(record.ciphertext).toBeTruthy();
      // Décrypter v2 pour valider contenu
      const decrypted = await decryptItemsV2(stored, MASTER_PASS);
      expect(decrypted).toEqual(sampleItems);
    }
  });

  test("Déverrouillage répété v2 ne re-chiffre pas", async () => {
    // Pré-remplir v2
    if (typeof localStorage !== "undefined") {
      const serialized = await encryptItemsV2(sampleItems, MASTER_PASS);
      localStorage.setItem(ENCRYPTED_KEY, serialized);
    }

    const result = await unlockAndMigrate(MASTER_PASS, {
      legacyKey: LEGACY_KEY,
      encryptedKey: ENCRYPTED_KEY,
    });

    expect(result.items).toEqual(sampleItems);
    expect(result.migrated).toBe(false); // déjà v2, pas de migration
    expect(result.version).toBe(2);
  });

  test("Mot de passe incorrect → erreur explicite", async () => {
    if (typeof localStorage !== "undefined") {
      const serialized = await encryptItemsV2(sampleItems, MASTER_PASS);
      localStorage.setItem(ENCRYPTED_KEY, serialized);
    }

    const result = await unlockAndMigrate("wrongPassword", {
      legacyKey: LEGACY_KEY,
      encryptedKey: ENCRYPTED_KEY,
    });

    expect(result.items).toBeNull();
    expect(result.error).toBeTruthy();
    expect(result.error).toMatch(/mot de passe|incorrect/i);
  });

  test("Données vides → liste vide sans erreur", async () => {
    // Aucune donnée pré-existante
    const result = await unlockAndMigrate(MASTER_PASS, {
      legacyKey: LEGACY_KEY,
      encryptedKey: ENCRYPTED_KEY,
    });

    expect(result.items).toEqual([]);
    expect(result.migrated).toBe(false);
    expect(result.error).toBeUndefined();
  });
});
