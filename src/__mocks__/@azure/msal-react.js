const React = require("react");
const mockInstance = new (class {
  loginRedirect() {}
  logoutRedirect() {}
  acquireTokenSilent() {
    return Promise.resolve({ accessToken: "test-token" });
  }
  acquireTokenRedirect() {
    return Promise.resolve();
  }
})();

function useMsal() {
  return { instance: mockInstance, accounts: [] };
}
function useIsAuthenticated() {
  return false;
}
function AuthenticatedTemplate({ children }) {
  return null;
}
function UnauthenticatedTemplate({ children }) {
  return React.createElement(React.Fragment, null, children);
}
function MsalProvider({ children }) {
  return React.createElement(React.Fragment, null, children);
}

module.exports = {
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  MsalProvider,
};
