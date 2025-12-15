// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Web Crypto API et TextEncoder/TextDecoder pour les tests (Node.js env)
if (typeof globalThis !== "undefined" && !globalThis.crypto) {
  try {
    const { webcrypto } = require("crypto");
    globalThis.crypto = webcrypto;
  } catch (_) {
    // Si webcrypto n'est pas disponible, ignorer
  }
}

// Mock TextEncoder/TextDecoder si non disponibles
if (typeof globalThis !== "undefined") {
  if (typeof globalThis.TextEncoder === "undefined") {
    try {
      const { TextEncoder } = require("util");
      globalThis.TextEncoder = TextEncoder;
    } catch (_) {
      // ignore
    }
  }
  if (typeof globalThis.TextDecoder === "undefined") {
    try {
      const { TextDecoder } = require("util");
      globalThis.TextDecoder = TextDecoder;
    } catch (_) {
      // ignore
    }
  }
}

// Filtrer les warnings React liés à Suspense/act qui polluent la sortie de test.
// On conserve les autres erreurs pour ne pas masquer des régressions.
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    /suspended resource finished loading/i.test(args[0])
  ) {
    return; // ignore pingSuspendedRoot warnings
  }
  originalError(...args);
};
