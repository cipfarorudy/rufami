import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: 'VOTRE_CLIENT_ID_AZURE_AD', // Remplacez par votre clientId
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:3000',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function LoginButton() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup();
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md">Déconnexion Azure</button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded-md">Connexion Azure AD</button>
      )}
    </div>
  );
}

export default function AzureAuthProvider({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      <LoginButton />
      {children}
    </MsalProvider>
  );
}
