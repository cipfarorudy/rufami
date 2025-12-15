import React, { useState } from "react";
import { useLanguage } from "./context/LanguageContext";

/**
 * Composant Formulaire de Devis intégré
 * Permet aux utilisateurs de créer et soumettre des demandes de devis
 */
function FormadevisIntegration() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
    budget: "",
    deadline: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Intégration avec le backend formadevis
      const apiUrl = process.env.REACT_APP_FORMADEVIS_API || "https://formadevis-api.example.com";
      const response = await fetch(`${apiUrl}/api/devis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: lang,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          projectType: "",
          projectDescription: "",
          budget: "",
          deadline: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    fr: {
      title: "Demande de Devis",
      description: "Remplissez le formulaire ci-dessous pour demander un devis personnalisé",
      fullName: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      projectType: "Type de projet",
      projectDescription: "Description du projet",
      budget: "Budget estimé (€)",
      deadline: "Délai souhaité",
      submit: "Envoyer la demande",
      success: "Devis demandé avec succès !",
      select: "-- Sélectionner --",
      webDevelopment: "Développement web",
      mobileApp: "Application mobile",
      ecommerce: "E-commerce",
      consulting: "Conseil",
      other: "Autre",
    },
    en: {
      title: "Quote Request",
      description: "Fill out the form below to request a personalized quote",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      projectType: "Project Type",
      projectDescription: "Project Description",
      budget: "Estimated Budget (€)",
      deadline: "Desired Timeline",
      submit: "Submit Request",
      success: "Quote request submitted successfully!",
      select: "-- Select --",
      webDevelopment: "Web Development",
      mobileApp: "Mobile App",
      ecommerce: "E-commerce",
      consulting: "Consulting",
      other: "Other",
    },
    es: {
      title: "Solicitud de Presupuesto",
      description: "Complete el formulario a continuación para solicitar un presupuesto personalizado",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      projectType: "Tipo de Proyecto",
      projectDescription: "Descripción del Proyecto",
      budget: "Presupuesto Estimado (€)",
      deadline: "Plazo Deseado",
      submit: "Enviar Solicitud",
      success: "¡Solicitud de presupuesto enviada con éxito!",
      select: "-- Seleccionar --",
      webDevelopment: "Desarrollo Web",
      mobileApp: "Aplicación Móvil",
      ecommerce: "Comercio Electrónico",
      consulting: "Consultoría",
      other: "Otro",
    },
  };

  const currentLabels = labels[lang] || labels.fr;

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{currentLabels.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{currentLabels.description}</p>

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          ✓ {currentLabels.success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.fullName}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.phone}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.projectType}</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
              required
            >
              <option value="">{currentLabels.select}</option>
              <option value="web">{currentLabels.webDevelopment}</option>
              <option value="mobile">{currentLabels.mobileApp}</option>
              <option value="ecommerce">{currentLabels.ecommerce}</option>
              <option value="consulting">{currentLabels.consulting}</option>
              <option value="other">{currentLabels.other}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">{currentLabels.projectDescription}</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.budget}</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">{currentLabels.deadline}</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:border-gray-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "En envoi..." : currentLabels.submit}
        </button>
      </form>
    </div>
  );
}

export default FormadevisIntegration;
