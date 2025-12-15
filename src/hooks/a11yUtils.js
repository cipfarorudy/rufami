/**
 * Utilities pour l'accessibilité WCAG
 * @file hooks/a11yUtils.js
 */

/**
 * Crée des attributs ARIA pour les erreurs de formulaire
 */
export function createFormErrorAttrs(fieldId, error) {
  if (!error) return {};
  return {
    "aria-invalid": "true",
    "aria-describedby": `${fieldId}-error`,
  };
}

/**
 * Crée une classe de focus accessible pour le clavier
 */
export const focusRingClasses =
  "focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800";

/**
 * Calcule le contraste accessible (WCAG AA/AAA)
 * Retourne true si le contraste est bon
 */
export function isAccessibleContrast(bgColor, textColor) {
  // Implémentation simplifiée
  // En production, utiliser une librarie comme polished ou tinycolor2
  return true; // À implémenter en détail
}

/**
 * Classes Tailwind pour les boutons accessibles
 */
export const accessibleButtonClasses = `
  px-3 py-2 rounded font-semibold
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  dark:focus:ring-offset-gray-800
  active:transform active:scale-95
`;

/**
 * Classes pour les inputs accessibles
 */
export const accessibleInputClasses = `
  px-3 py-2 rounded border border-gray-300
  dark:bg-gray-700 dark:border-gray-600 dark:text-white
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2
  dark:focus:ring-offset-gray-800
  disabled:opacity-50 disabled:cursor-not-allowed
`;

/**
 * Hook pour gérer les annonces ARIA (pour lecteur d'écran)
 */
export function useAriaAnnouncement() {
  const announce = (message, priority = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1000);
  };

  return { announce };
}

/**
 * Utilitaire pour les labels cachés mais accessibles (sr-only)
 */
export const srOnlyClasses = "sr-only";

/**
 * Vérifie si le site respecte les critères WCAG de base
 */
export const wcagChecklist = {
  colourContrast: "Vérifiez le contraste des couleurs (WCAG AA minimum 4.5:1)",
  keyboardNav: "Testez la navigation au clavier (Tab, Shift+Tab, Enter)",
  ariaLabels:
    "Vérifiez les aria-label et aria-labelledby sur les éléments interactifs",
  focusIndicators: "Assurez-vous que les indicateurs de focus sont visibles",
  imageAlt: "Fournissez des alt textes pour toutes les images",
  formLabels: "Associez chaque input à un label via htmlFor",
  semanticHTML: "Utilisez les bons éléments HTML (<button> pas <div>, etc)",
  landmarks:
    "Utilisez <header>, <nav>, <main>, <footer> pour les zones principales",
};
