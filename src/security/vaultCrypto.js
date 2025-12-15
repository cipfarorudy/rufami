import CryptoJS from "crypto-js";
// Polyfill TextEncoder/TextDecoder pour environnement test (jsdom / Node)
// Ne pas importer 'util' ou 'crypto' en production (cause webpack breaking change)
if (typeof globalThis !== "undefined" && typeof window === "undefined") {
  // Environnement Node (test)
  try {
    if (typeof TextEncoder === "undefined") {
      // eslint-disable-next-line no-undef
      globalThis.TextEncoder = require("util").TextEncoder;
    }
    if (typeof TextDecoder === "undefined") {
      // eslint-disable-next-line no-undef
      globalThis.TextDecoder = require("util").TextDecoder;
    }
  } catch (_) {
    // ignore
  }
}

// ========================
// V1 (legacy) - AES (CryptoJS) avec clé dérivée SHA-256
// ========================
export function deriveKey(passphrase) {
  return CryptoJS.SHA256(passphrase).toString();
}

export function encryptItems(items, key) {
  const plaintext = JSON.stringify(items);
  return CryptoJS.AES.encrypt(plaintext, key).toString();
}

export function decryptItems(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (!plaintext) return null;
    return JSON.parse(plaintext);
  } catch (_) {
    return null;
  }
}

export function migrateIfNeeded(legacyKey, encryptedKey, key) {
  const legacyRaw = storage.getItem(legacyKey);
  const encryptedRaw = storage.getItem(encryptedKey);
  if (legacyRaw && !encryptedRaw) {
    try {
      const legacyItems = JSON.parse(legacyRaw);
      const cipher = encryptItems(legacyItems, key);
      storage.setItem(encryptedKey, cipher);
    } catch (_) {
      // ignore
    }
  }
}

// ========================
// V2 - AES-GCM + PBKDF2 (Web Crypto) avec salt & itérations
// Format stockage JSON:
// { version:2, salt:"base64", iterations:150000, iv:"base64", ciphertext:"base64" }
// ========================

const ITERATIONS = 150000;
const V2_VERSION = 2;

// Fallback Web Crypto (navigateur ou Node test env)
// eslint-disable-next-line no-undef
let webCrypto = null;
if (
  typeof globalThis !== "undefined" &&
  // eslint-disable-next-line no-undef
  globalThis.crypto &&
  // eslint-disable-next-line no-undef
  globalThis.crypto.subtle
) {
  // eslint-disable-next-line no-undef
  webCrypto = globalThis.crypto;
}
// En test (Node), tenter d'utiliser require('crypto').webcrypto
if (!webCrypto && typeof window === "undefined") {
  try {
    const { webcrypto } = require("crypto");
    if (webcrypto && webcrypto.subtle) webCrypto = webcrypto;
  } catch (_) {
    /* ignore */
  }
}

// Initialize webCrypto or throw error only when actually needed
if (!webCrypto) {
  throw new Error("Web Crypto API non disponible");
}

function toBase64(u8) {
  return btoa(String.fromCharCode(...u8));
}

function fromBase64(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function deriveKeyPBKDF2(passphrase, salt, iterations = ITERATIONS) {
  const enc = new TextEncoder();
  const keyMaterial = await webCrypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return webCrypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptItemsV2(items, passphrase) {
  const salt = webCrypto.getRandomValues(new Uint8Array(16));
  const iv = webCrypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyPBKDF2(passphrase, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(items));
  const cipherBuf = await webCrypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );
  const record = {
    version: V2_VERSION,
    salt: toBase64(salt),
    iterations: ITERATIONS,
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(cipherBuf)),
  };
  return JSON.stringify(record);
}

export async function decryptItemsV2(serialized, passphrase) {
  try {
    const record = JSON.parse(serialized);
    if (record.version !== V2_VERSION) return null;
    const salt = fromBase64(record.salt);
    const iv = fromBase64(record.iv);
    const data = fromBase64(record.ciphertext);
    const key = await deriveKeyPBKDF2(
      passphrase,
      salt,
      record.iterations || ITERATIONS
    );
    const plainBuf = await webCrypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    const text = new TextDecoder().decode(plainBuf);
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

// Fonction de déverrouillage abstraite: gère legacy plaintext -> v1 -> migration v2
export async function unlockAndMigrate(
  passphrase,
  { legacyKey, encryptedKey }
) {
  // Étape 1: migrer éventuel plaintext vers v1
  migrateIfNeeded(legacyKey, encryptedKey, deriveKey(passphrase));

  const stored = storage.getItem(encryptedKey);
  if (!stored) {
    return { items: [], migrated: false, version: null };
  }

  // Si JSON => potentiellement v2
  if (stored.startsWith("{")) {
    const itemsV2 = await decryptItemsV2(stored, passphrase);
    if (itemsV2)
      return { items: itemsV2, migrated: false, version: V2_VERSION };
    return {
      items: null,
      error: "Données chiffrées v2 corrompues ou mot de passe incorrect.",
    };
  }

  // Sinon v1 (cipher string AES CryptoJS). Déchiffrer puis migrer vers v2
  const keyV1 = deriveKey(passphrase);
  const itemsV1 = decryptItems(stored, keyV1);
  if (itemsV1) {
    try {
      const serializedV2 = await encryptItemsV2(itemsV1, passphrase);
      storage.setItem(encryptedKey, serializedV2);
      return { items: itemsV1, migrated: true, version: V2_VERSION };
    } catch (_) {
      return { items: itemsV1, migrated: false, version: 1 };
    }
  }
  return {
    items: null,
    error: "Mot de passe incorrect ou données legacy corrompues.",
  };
}

export async function persistV2(items, passphrase, encryptedKey) {
  const serialized = await encryptItemsV2(items, passphrase);
  storage.setItem(encryptedKey, serialized);
}

// ========================
// Fallback mémoire pour tests sans localStorage (ex: Node crypto context)
// ========================
const memoryStorage = (() => {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => {
      store[k] = v;
    },
    removeItem: (k) => {
      delete store[k];
    },
    clear: () => {
      store = {};
    },
  };
})();

const storage =
  typeof localStorage !== "undefined" ? localStorage : memoryStorage;
