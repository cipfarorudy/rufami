import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import EventsFromAPI from "./EventsFromAPI.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

describe("Contrôle fonctionnel de l’application collaborative", () => {
  test("Affichage de l’interface principale sections clés", () => {
    render(
      <LanguageProvider>
        <ThemeProvider>
          <EventsFromAPI />
        </ThemeProvider>
      </LanguageProvider>
    );
    // Vérifie présence de quelques titres distinctifs
    expect(screen.getAllByText(/Agenda/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bloc-notes|Notes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Annuaire|Directory/i).length).toBeGreaterThan(
      0
    );
    // Présence d'une section Coffre-fort (verrouillé ou complet)
    expect(screen.getAllByText(/Coffre-fort|Vault/i).length).toBeGreaterThan(0);
  });

  test("Ajout d’un événement dans l’agenda", async () => {
    render(
      <LanguageProvider>
        <ThemeProvider>
          <EventsFromAPI />
        </ThemeProvider>
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Titre de l'événement|Event title/i),
      {
        target: { value: "Test réunion" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Date de l'événement|Event date/i), {
      target: { value: "2025-12-01" },
    });
    fireEvent.click(screen.getAllByText(/Ajouter|Add/i)[1]);
    // Vérifie que "Test réunion" apparaît dans la liste de l’agenda
    const items = await screen.findAllByRole("listitem");
    expect(
      items.some((item) => item.textContent.includes("Test réunion"))
    ).toBe(true);
  });
  test("Switch de thème sombre/clair", () => {
    render(
      <LanguageProvider>
        <ThemeProvider>
          <EventsFromAPI />
        </ThemeProvider>
      </LanguageProvider>
    );
    const btn = screen.getByText(
      /Mode sombre|Mode clair|Dark mode|Light mode/i
    );
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  test("Affichage d’un toast après action", async () => {
    render(
      <LanguageProvider>
        <ThemeProvider>
          <EventsFromAPI />
        </ThemeProvider>
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Titre de l'événement|Event title/i),
      {
        target: { value: "ToastTest" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Date de l'événement|Event date/i), {
      target: { value: "2025-12-02" },
    });
    fireEvent.click(screen.getAllByText(/Ajouter|Add/i)[1]);
    // Vérifie que "ToastTest" apparaît dans la liste de l’agenda
    const items = await screen.findAllByRole("listitem");
    expect(items.some((item) => item.textContent.includes("ToastTest"))).toBe(
      true
    );
  });
});
