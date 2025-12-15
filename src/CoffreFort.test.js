import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CoffreFort from "./CoffreFort.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

// Nettoyage localStorage avant chaque test
beforeEach(() => {
  localStorage.clear();
});

describe("CoffreFort chiffré", () => {
  test("Déverrouillage (PBKDF2 v2) et ajout entrée stockée chiffrée", async () => {
    render(
      <LanguageProvider>
        <CoffreFort />
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Mot de passe maître|Master password/i),
      {
        target: { value: "secret123" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Déverrouiller|Unlock/i })
    );

    // Attendre la disparition de l'état de chargement et présence du formulaire d'ajout
    await waitFor(() => {
      expect(
        screen.queryByText(/Déchiffrement en cours|Decrypting/i)
      ).not.toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByLabelText(/Site ou service|Site or service/i),
      {
        target: { value: "exemple.com" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Identifiant|Username/i), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe|Password/i), {
      target: { value: "SuperPass!" },
    });
    fireEvent.click(screen.getByText(/Ajouter|Add/i));

    await waitFor(() =>
      expect(screen.getAllByTestId("coffre-item").length).toBeGreaterThan(0)
    );
    expect(screen.getByText(/exemple.com/i)).toBeInTheDocument();

    const stored = localStorage.getItem("coffreFortEnc");
    expect(stored).toBeTruthy();
    // Format JSON version 2
    const obj = JSON.parse(stored);
    expect(obj.version).toBe(2);
    expect(obj.ciphertext).toBeTruthy();
    // Aucune donnée en clair
    const serialized = JSON.stringify(obj);
    expect(serialized).not.toContain("SuperPass!");
    expect(serialized).not.toContain("alice");
  });
});
