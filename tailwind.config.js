/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        accent: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
      },
      backgroundImage: {
        "gradient-header":
          "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #8b5cf6 100%)",
        "gradient-hover":
          "linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".8" },
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.05)",
        "card-hover":
          "0 10px 15px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.08)",
      },
      typography: {
        DEFAULT: {
          css: {
            "max-width": "none",
          },
        },
      },
    },
  },
  plugins: [],
};
