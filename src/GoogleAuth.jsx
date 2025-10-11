import React from 'react';

// Ce composant ne gère plus l’authentification Google OAuth.
const GoogleAuth = ({ children }) => {
  return <>{children}</>;
};

export default GoogleAuth;
