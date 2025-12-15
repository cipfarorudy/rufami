import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

describe("Barre de navigation", () => {
  test("Présence des liens principaux", () => {
    render(<App />);
    [
      "nav-dashboard",
      "nav-collaboratif",
      "nav-agenda",
      "nav-calendrier",
      "nav-blocnote",
      "nav-annuaire",
      "nav-coffrefort",
      "nav-citoyenaction",
      "nav-formations",
      "nav-liens",
    ].forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
  });
});
