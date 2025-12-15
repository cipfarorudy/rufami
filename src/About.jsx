import React from "react";
import { useLanguage } from "./context/LanguageContext";
import translations from "./i18n/translations";

/**
 * Page À Propos / About
 * Présente les informations sur l'application Rufami
 */
export default function About() {
  const { language } = useLanguage();

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.["fr"] || key;
  };

  const features = [
    "about.feature1",
    "about.feature2",
    "about.feature3",
    "about.feature4",
    "about.feature5",
    "about.feature6",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation("about.title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Rufami - {getTranslation("nav.collaboratif")}
          </p>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {getTranslation("about.description")}
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {getTranslation("about.features")}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((featureKey) => (
              <div
                key={featureKey}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-gradient-to-r from-blue-600 to-purple-600"
              >
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {getTranslation(featureKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {language === "fr"
              ? "Stack Technologique"
              : language === "es"
              ? "Stack Tecnológico"
              : "Tech Stack"}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {language === "fr"
                  ? "Frontend"
                  : language === "es"
                  ? "Frontend"
                  : "Frontend"}
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  React 19
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  React Router v7
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  Tailwind CSS 3.x
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  FontAwesome Icons
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {language === "fr"
                  ? "Infrastructure & Sécurité"
                  : language === "es"
                  ? "Infraestructura y Seguridad"
                  : "Infrastructure & Security"}
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  Azure Static Web Apps
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  PBKDF2 + AES-GCM
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  GitHub Actions CI/CD
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  Jest + React Testing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: language === "fr" ? "Modules" : language === "es" ? "Módulos" : "Modules",
              value: "11",
            },
            {
              label:
                language === "fr"
                  ? "Langues"
                  : language === "es"
                  ? "Idiomas"
                  : "Languages",
              value: "3",
            },
            {
              label:
                language === "fr"
                  ? "Tests"
                  : language === "es"
                  ? "Pruebas"
                  : "Tests",
              value: "14+",
            },
            {
              label:
                language === "fr"
                  ? "Régions"
                  : language === "es"
                  ? "Regiones"
                  : "Regions",
              value: "Global",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm font-semibold opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>
            {language === "fr"
              ? "© 2024 Rufami. Tous droits réservés."
              : language === "es"
              ? "© 2024 Rufami. Todos los derechos reservados."
              : "© 2024 Rufami. All rights reserved."}
          </p>
          <p className="mt-2 text-sm">
            {language === "fr"
              ? "Construit avec ❤️ pour la collaboration moderne"
              : language === "es"
              ? "Construido con ❤️ para la colaboración moderna"
              : "Built with ❤️ for modern collaboration"}
          </p>
        </div>
      </div>
    </div>
  );
}
