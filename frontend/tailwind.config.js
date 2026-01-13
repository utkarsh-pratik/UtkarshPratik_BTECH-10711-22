import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- Add this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Main Primary Color (Indigo 500)
          600: "#4f46e5", // Hover
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9", // Lightest background
          200: "#e2e8f0", // Borders
          300: "#cbd5e1",
          400: "#94a3b8", // Muted text
          500: "#64748b",
          600: "#475569",
          700: "#334155", // Body text
          800: "#1e293b", // Headings
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};