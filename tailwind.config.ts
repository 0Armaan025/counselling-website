import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: { 50: "#FAF8F3", 100: "#F3F0E8", 200: "#E9E4D7", 300: "#D8D1C0" },
        ink: { 900: "#1B1814", 700: "#3E3931", 500: "#6E665A", 300: "#B3AC9E" },
        clay: { 600: "#B34724", 500: "#C8552E", 100: "#F5E0D3" },
        pine: { 700: "#14424A", 800: "#0E343B", 100: "#DDE8E7" },
        royal: { 600: "#2E42E8", 700: "#2536C9", 800: "#1B2999" },
        sun: { 400: "#FFD24A", 500: "#FFB800", 600: "#F59E0B" },
        coral: { 400: "#FF8A7D", 500: "#FF6B5E" },
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(27,24,20,0.06), 0 8px 24px -12px rgba(27,24,20,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
