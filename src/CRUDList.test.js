import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CoffreFort from "./CoffreFort.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

describe("CRUDList via CoffreFort", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Ajout entrée coffre-fort", async () => {
    render(
      <LanguageProvider>
        <CoffreFort />
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Mot de passe maître|Master password/i),
      {
        target: { value: "testpw" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Déverrouiller|Unlock/i })
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/Déchiffrement en cours|Decrypting/i)
      ).not.toBeInTheDocument()
    );
    fireEvent.change(
      screen.getByLabelText(/Site ou service|Site or service/i),
      {
        target: { value: "MonSite" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Identifiant|Username/i), {
      target: { value: "utilisateur" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe|Password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByText(/Ajouter|Add/i));
    await waitFor(() =>
      expect(screen.getAllByTestId("coffre-item").length).toBeGreaterThan(0)
    );
    expect(
      screen
        .getAllByTestId("coffre-item")
        .some((li) => li.textContent.includes("MonSite"))
    ).toBe(true);
  });

  test("Modification entrée coffre-fort", async () => {
    render(
      <LanguageProvider>
        <CoffreFort />
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Mot de passe maître|Master password/i),
      {
        target: { value: "testpw" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Déverrouiller|Unlock/i })
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/Déchiffrement en cours|Decrypting/i)
      ).not.toBeInTheDocument()
    );
    fireEvent.change(
      screen.getByLabelText(/Site ou service|Site or service/i),
      {
        target: { value: "SiteA" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Identifiant|Username/i), {
      target: { value: "loginA" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe|Password/i), {
      target: { value: "pwA" },
    });
    fireEvent.click(screen.getByText(/Ajouter|Add/i));
    await waitFor(() =>
      expect(screen.getAllByTestId("coffre-item").length).toBeGreaterThan(0)
    );
    fireEvent.click(screen.getAllByText(/Modifier|Edit/i)[0]);
    fireEvent.change(screen.getByLabelText(/Identifiant|Username/i), {
      target: { value: "loginB" },
    });
    fireEvent.click(screen.getAllByText(/Modifier|Edit/i)[0]);
    await waitFor(() =>
      expect(
        screen
          .getAllByTestId("coffre-item")
          .some((li) => li.textContent.includes("loginB"))
      ).toBe(true)
    );
  });

  test("Suppression entrée coffre-fort", async () => {
    render(
      <LanguageProvider>
        <CoffreFort />
      </LanguageProvider>
    );
    fireEvent.change(
      screen.getByLabelText(/Mot de passe maître|Master password/i),
      {
        target: { value: "testpw" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Déverrouiller|Unlock/i })
    );
    await waitFor(() =>
      expect(
        screen.queryByText(/Déchiffrement en cours|Decrypting/i)
      ).not.toBeInTheDocument()
    );
    fireEvent.change(
      screen.getByLabelText(/Site ou service|Site or service/i),
      {
        target: { value: "SiteX" },
      }
    );
    fireEvent.change(screen.getByLabelText(/Identifiant|Username/i), {
      target: { value: "loginX" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe|Password/i), {
      target: { value: "pwX" },
    });
    fireEvent.click(screen.getByText(/Ajouter|Add/i));
    await waitFor(() =>
      expect(screen.getAllByTestId("coffre-item").length).toBeGreaterThan(0)
    );
    const item = screen.getAllByTestId("coffre-item")[0];
    expect(item.textContent).toMatch(/SiteX/);
    fireEvent.click(screen.getByText(/Supprimer|Delete/i));
    await waitFor(() => expect(screen.queryByTestId("coffre-item")).toBeNull());
  });
});
