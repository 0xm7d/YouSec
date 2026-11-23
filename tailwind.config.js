/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yousec: {
          bg: "#090909",
          surface: "#121212",
          card: "#181818",
          cardHover: "#202020",
          border: "#292929",
          borderSubtle: "#1f1f1f",
          borderHover: "#3d3d3d",
          accent: "#DC2626",
          accentHover: "#EF4444",
          accentDark: "#991B1B",
          text: "#F5F5F5",
          muted: "#A3A3A3",
          dimmed: "#737373",
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-crimson': '0 0 25px -5px rgba(220, 38, 38, 0.35)',
        'glow-subtle': '0 0 15px -3px rgba(220, 38, 38, 0.18)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
