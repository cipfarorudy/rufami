// Configuration MSAL (placeholders à remplacer par vos valeurs réelles)
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID || "YOUR_CLIENT_ID",
    authority:
      process.env.REACT_APP_AZURE_AD_AUTHORITY ||
      "https://login.microsoftonline.com/common",
    redirectUri: "/",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// Scopes de base (Graph User.Read en exemple) à ajuster selon APIs
export const loginRequest = {
  scopes: ["User.Read"],
};
