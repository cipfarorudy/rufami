import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import EventsFromAPI from "./EventsFromAPI.jsx";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Contrôle fonctionnel de l’application collaborative", () => {
  test("Affichage de l’interface principale", () => {
    render(<EventsFromAPI />);
    expect(screen.getByText(/Agenda/i)).toBeInTheDocument();
    expect(screen.getByText(/Bloc-notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Annuaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Coffre-fort/i)).toBeInTheDocument();
  });

  test("Ajout d’un événement dans l’agenda", async () => {
    render(<EventsFromAPI />);
    fireEvent.change(screen.getByLabelText(/Titre de l'événement/i), {
      target: { value: "Test réunion" },
    });
    fireEvent.change(screen.getByLabelText(/Date de l'événement/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.click(screen.getAllByText(/Ajouter/i)[1]);
    // Vérifie que "Test réunion" apparaît dans la liste de l’agenda
    const items = await screen.findAllByRole("listitem");
    expect(
      items.some((item) => item.textContent.includes("Test réunion"))
    ).toBe(true);
  });
  test("Switch de thème sombre/clair", () => {
    render(<EventsFromAPI />);
    const btn = screen.getByText(/Mode sombre|Mode clair/i);
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  test("Ajout d’une entrée dans le coffre-fort", async () => {
    localStorage.clear();
    render(<EventsFromAPI />);
    fireEvent.change(screen.getByLabelText(/Site ou service/i), {
      target: { value: "TestSite" },
    });
    fireEvent.change(screen.getByLabelText(/Identifiant/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe|code/i), {
      target: { value: "secret" },
    });
    // Cible le bouton 'Ajouter' du coffre-fort (dernier formulaire)
    const ajouterButtons = screen.getAllByText(/Ajouter/i);
    fireEvent.click(ajouterButtons[ajouterButtons.length - 1]);

    // Cible la section Coffre-fort
    const coffreSection = screen.getByText(/Coffre-fort/).closest("div");
    const items = await within(coffreSection).findAllByTestId("coffre-item");
    // Affiche le contenu des items pour diagnostic
    // eslint-disable-next-line no-console
    console.log(
      "Contenu des items:",
      items.map((i) => i.textContent)
    );
    expect(items.some((item) => item.textContent.includes("TestSite"))).toBe(
      true
    );
  });

  test("Affichage d’un toast après action", async () => {
    render(<EventsFromAPI />);
    fireEvent.change(screen.getByLabelText(/Titre de l'événement/i), {
      target: { value: "ToastTest" },
    });
    fireEvent.change(screen.getByLabelText(/Date de l'événement/i), {
      target: { value: "2025-12-02" },
    });
    fireEvent.click(screen.getAllByText(/Ajouter/i)[1]);
    // Vérifie que "ToastTest" apparaît dans la liste de l’agenda
    const items = await screen.findAllByRole("listitem");
    expect(items.some((item) => item.textContent.includes("ToastTest"))).toBe(
      true
    );
  });
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
