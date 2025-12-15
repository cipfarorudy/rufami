import React, { createContext, useContext, useMemo } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { msalConfig, loginRequest } from './authConfig';

// Instance MSAL unique (redirect flow choisi)
const msalInstance = new PublicClientApplication(msalConfig);

const AuthContext = createContext(null);

function AuthInner({ children }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = accounts[0] || null;

  const value = useMemo(() => ({
    account,
    isAuthenticated,
    login: () => instance.loginRedirect(loginRequest),
    logout: () => instance.logoutRedirect({ account }),
    getToken: async (scopes = loginRequest.scopes) => {
      if (!account) throw new Error('Utilisateur non connecté');
      try {
        const result = await instance.acquireTokenSilent({ ...loginRequest, account });
        return result.accessToken;
      } catch (e) {
        // Fallback interaction (redirect)
        await instance.acquireTokenRedirect(loginRequest);
        return null; // Le token sera récupéré après retour
      }
    }
  }), [account, isAuthenticated, instance]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default function AzureAuthProvider({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthInner>{children}</AuthInner>
    </MsalProvider>
  );
}
