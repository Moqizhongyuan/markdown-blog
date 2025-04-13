/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      },
      colors: {
        // 主题色
        primary: {
          light: "#3B82F6",
          dark: "#3B82F6",
          fantasy: "#8B5CF6",
        },
        secondary: {
          light: "#6B7280",
          dark: "#9CA3AF",
          fantasy: "#A78BFA",
        },
        // 背景色
        background: {
          light: "#FFFFFF",
          dark: "#111827",
          fantasy: "#0F172A",
        },
        // 文本色
        foreground: {
          light: "#111827",
          dark: "#F9FAFB",
          fantasy: "#E2E8F0",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
