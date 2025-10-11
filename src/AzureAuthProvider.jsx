import React from 'react';

// Ce composant ne gère plus l’authentification Azure AD.
export default function AzureAuthProvider({ children }) {
  return <>{children}</>;
}
