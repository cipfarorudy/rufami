import { msalConfig, loginRequest } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";

// Singleton séparé si besoin hors React (n'utiliser que méthodes silencieuses).
const standaloneInstance = new PublicClientApplication(msalConfig);

export async function acquireToken(scopes = loginRequest.scopes, account) {
  if (!account) throw new Error("Aucun compte disponible");
  try {
    const result = await standaloneInstance.acquireTokenSilent({
      scopes,
      account,
    });
    return result.accessToken;
  } catch (e) {
    // Ne pas déclencher d'interaction ici (doit rester dans contexte React)
    throw e;
  }
}
