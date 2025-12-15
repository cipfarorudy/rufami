class MockPublicClientApplication {
  constructor() {}
  loginRedirect() {
    return Promise.resolve();
  }
  logoutRedirect() {
    return Promise.resolve();
  }
  acquireTokenSilent() {
    return Promise.resolve({ accessToken: "test-token" });
  }
  acquireTokenRedirect() {
    return Promise.resolve();
  }
}

module.exports = { PublicClientApplication: MockPublicClientApplication };
