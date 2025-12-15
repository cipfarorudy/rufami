#!/usr/bin/env node

/**
 * Script de test pour diagnostiquer les problèmes de déverrouillage du Coffre-Fort
 * Exécution: node test-vault-unlock.js
 */

const crypto = require("crypto");
const fs = require("fs");

// Polyfill Web Crypto pour Node.js
global.crypto = require("crypto").webcrypto;

// Simuler TextEncoder/TextDecoder
if (!global.TextEncoder) {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Importer les fonctions de chiffrement
const CryptoJS = require("crypto-js");

// ========================
// Fonctions de chiffrement v2 (PBKDF2 + AES-GCM)
// ========================
const ITERATIONS = 150000;
const V2_VERSION = 2;

function toBase64(buf) {
  return Buffer.from(buf).toString("base64");
}

function fromBase64(b64) {
  return new Uint8Array(Buffer.from(b64, "base64"));
}

async function deriveKeyPBKDF2(passphrase, salt, iterations = ITERATIONS) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptItemsV2(items, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyPBKDF2(passphrase, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(items));
  const cipherBuf = await crypto.subtle.encrypt(
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

async function decryptItemsV2(serialized, passphrase) {
  try {
    const record = JSON.parse(serialized);
    if (record.version !== V2_VERSION) {
      console.error("❌ Version incompatible:", record.version);
      return null;
    }
    const salt = fromBase64(record.salt);
    const iv = fromBase64(record.iv);
    const data = fromBase64(record.ciphertext);
    const key = await deriveKeyPBKDF2(
      passphrase,
      salt,
      record.iterations || ITERATIONS
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    const text = new TextDecoder().decode(plainBuf);
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Erreur de déchiffrement:", err.message);
    return null;
  }
}

// ========================
// Tests
// ========================
async function runTests() {
  console.log("🔐 Test du Coffre-Fort - Diagnostic de déverrouillage\n");

  const testItems = [
    { site: "GitHub", login: "user@example.com", password: "secret123" },
    { site: "Gmail", login: "myemail@gmail.com", password: "pass456" },
  ];

  const masterPass = "MonMotDePasseSecurise!";

  try {
    // Test 1: Chiffrement
    console.log("📝 Test 1: Chiffrement des données...");
    const encrypted = await encryptItemsV2(testItems, masterPass);
    console.log("✅ Chiffrement réussi");
    console.log(`   Taille encrypted: ${encrypted.length} caractères`);
    const parsed = JSON.parse(encrypted);
    console.log(`   Version: ${parsed.version}`);
    console.log(`   Salt: ${parsed.salt.substring(0, 20)}...`);
    console.log(`   IV: ${parsed.iv.substring(0, 20)}...`);
    console.log(`   Ciphertext: ${parsed.ciphertext.substring(0, 20)}...\n`);

    // Test 2: Déchiffrement avec bon mot de passe
    console.log("📝 Test 2: Déchiffrement avec bon mot de passe...");
    const decrypted = await decryptItemsV2(encrypted, masterPass);
    if (decrypted && decrypted.length === testItems.length) {
      console.log("✅ Déchiffrement réussi");
      console.log(`   Items récupérés: ${decrypted.length}`);
      console.log(`   Premier item: ${JSON.stringify(decrypted[0])}\n`);
    } else {
      console.log("❌ Déchiffrement échoué - pas de données");
    }

    // Test 3: Déchiffrement avec mauvais mot de passe
    console.log("📝 Test 3: Déchiffrement avec mauvais mot de passe...");
    const wrongPass = await decryptItemsV2(encrypted, "WrongPassword123");
    if (wrongPass === null) {
      console.log("✅ Détection correcte du mauvais mot de passe\n");
    } else {
      console.log(
        "❌ PROBLÈME: Le mauvais mot de passe a déchiffré les données!\n"
      );
    }

    // Test 4: Stockage simulé localStorage
    console.log("📝 Test 4: Simulation du stockage localStorage...");
    const mockStorage = {};
    mockStorage["coffreFortEnc"] = encrypted;

    // Simpler le déverrouillage
    const stored = mockStorage["coffreFortEnc"];
    if (!stored) {
      console.log("❌ Aucune donnée stockée");
    } else if (stored.startsWith("{")) {
      console.log("✅ Format détecté: JSON (v2)");
      const items = await decryptItemsV2(stored, masterPass);
      if (items) {
        console.log(`✅ Déverrouillage réussi: ${items.length} items\n`);
      } else {
        console.log("❌ Déverrouillage échoué - mot de passe incorrect\n");
      }
    }

    // Test 5: Web Crypto API disponibilité
    console.log("📝 Test 5: Vérification de Web Crypto API...");
    if (crypto && crypto.subtle) {
      console.log("✅ Web Crypto API disponible");
      console.log(
        `   crypto.getRandomValues: ${typeof crypto.getRandomValues}`
      );
      console.log(`   crypto.subtle.encrypt: ${typeof crypto.subtle.encrypt}`);
      console.log(
        `   crypto.subtle.decrypt: ${typeof crypto.subtle.decrypt}\n`
      );
    } else {
      console.log("❌ Web Crypto API non disponible\n");
    }

    console.log("🎉 Tous les tests de diagnostic sont terminés!");
  } catch (err) {
    console.error("💥 Erreur critique:", err);
    process.exit(1);
  }
}

runTests();
