import React from "react";

export const BrowserRouter = ({ children }) => (
  <div data-testid="mock-router">{children}</div>
);
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ element }) => element;
export const Link = ({ to, children, ...rest }) => (
  <a href={to} {...rest}>
    {children}
  </a>
);
