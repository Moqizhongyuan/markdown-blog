const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#111827",
            primary: {
              DEFAULT: "#3B82F6",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#6B7280",
              foreground: "#FFFFFF",
            },
            focus: "#3B82F6",
          },
        },
        dark: {
          colors: {
            background: "#111827",
            foreground: "#F9FAFB",
            primary: {
              DEFAULT: "#3B82F6",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#9CA3AF",
              foreground: "#FFFFFF",
            },
            focus: "#3B82F6",
          },
        },
        fantasy: {
          extend: "dark", // 继承自暗色主题
          colors: {
            background: "#0F172A",
            foreground: "#E2E8F0",
            primary: {
              DEFAULT: "#8B5CF6",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#A78BFA",
              foreground: "#FFFFFF",
            },
            focus: "#8B5CF6",
          },
        },
      },
    }),
  ],
}