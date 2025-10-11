import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Navigation par onglets/pages", () => {
  test("La barre d’onglets s’affiche", () => {
    render(<App />);
    expect(screen.getByTestId("nav-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-agenda")).toBeInTheDocument();
    expect(screen.getByTestId("nav-calendrier")).toBeInTheDocument();
    expect(screen.getByTestId("nav-blocnote")).toBeInTheDocument();
    expect(screen.getByTestId("nav-annuaire")).toBeInTheDocument();
  });

  test("Navigation et affichage des modules", async () => {
    render(<App />);
    // Agenda
    await userEvent.click(screen.getByTestId("nav-agenda"));
    expect(await screen.findByText("Agenda")).toBeInTheDocument();
    // Calendrier
    await userEvent.click(screen.getByTestId("nav-calendrier"));
    expect(await screen.findByText("Calendrier")).toBeInTheDocument();
    // Bloc-notes
    await userEvent.click(screen.getByTestId("nav-blocnote"));
    expect(await screen.findByText("Bloc-notes")).toBeInTheDocument();
    // Annuaire
    await userEvent.click(screen.getByTestId("nav-annuaire"));
    expect(await screen.findByText("Annuaire")).toBeInTheDocument();
    // Retour tableau de bord
    await userEvent.click(screen.getByTestId("nav-dashboard"));
    expect(
      await screen.findByText(/Tableau de bord|Rufami App/)
    ).toBeInTheDocument();
  });
});
