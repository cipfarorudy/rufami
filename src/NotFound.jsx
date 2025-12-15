import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import translations from "./i18n/translations";

/**
 * Page 404 - Not Found
 * Affichée pour toutes les routes non définies
 */
export default function NotFound() {
  const { language } = useLanguage();

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.["fr"] || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto animate-fadeIn">
        {/* Code 404 */}
        <h1 className="text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {getTranslation("404.title")}
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {getTranslation("404.message")}
        </p>

        {/* Animated Icon */}
        <div className="mb-8">
          <div className="inline-block text-6xl animate-bounce">🔍</div>
        </div>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {getTranslation("404.button")}
        </Link>

        {/* Quick Links */}
        <div className="mt-12 flex flex-col gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {language === "fr"
              ? "Ou visitez ces pages :"
              : language === "es"
              ? "O visite estas páginas:"
              : "Or visit these pages:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
            >
              {getTranslation("nav.dashboard")}
            </Link>
            <Link
              to="/collaboratif"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
            >
              {getTranslation("nav.collaboratif")}
            </Link>
            <Link
              to="/coffrefort"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
            >
              {getTranslation("vault.title")}
            </Link>
            <Link
              to="/devis"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
            >
              {getTranslation("nav.devis")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
