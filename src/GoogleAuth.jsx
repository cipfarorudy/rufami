import React from 'react';
import { useAuth } from './AzureAuthProvider';

// Composant affichant l'état d'authentification Azure AD (ancien GoogleAuth)
export default function GoogleAuth() {
  const { account, isAuthenticated, login, logout } = useAuth();
  return (
    <div className="flex items-center space-x-2" data-testid="auth-status">
      {isAuthenticated && account ? (
        <>
          <span className="text-sm text-gray-700" data-testid="auth-username">{account.username}</span>
          <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded" data-testid="auth-logout">Déconnexion</button>
        </>
      ) : (
        <button onClick={login} className="bg-blue-600 text-white px-3 py-1 rounded" data-testid="auth-login">Connexion</button>
      )}
    </div>
  );
}
