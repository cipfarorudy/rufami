import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID_ICI'; // Remplacez par votre client_id Google

const GoogleAuth = ({ onSuccess, onError }) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-lg font-semibold mb-4">Connexion Google</h2>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  </GoogleOAuthProvider>
);

export default GoogleAuth;
