// Client API générique avec support token (MSAL) optionnel
export function createApiClient({ baseUrl, getToken, scopes }) {
  async function buildHeaders(extra) {
    const headers = { "Content-Type": "application/json", ...(extra || {}) };
    if (getToken) {
      try {
        const token = await getToken(scopes);
        if (token) headers["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        // On ignore l'erreur de token pour continuer en mode non authentifié
      }
    }
    return headers;
  }

  async function request(method, path, body) {
    const headers = await buildHeaders();
    const res = await fetch(baseUrl + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Erreur API (${res.status})`);
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return res.text();
  }

  return {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    put: (path, body) => request("PUT", path, body),
    delete: (path) => request("DELETE", path),
  };
}
