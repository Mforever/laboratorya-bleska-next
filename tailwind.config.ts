import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050505",
        "bg-secondary": "#0F0F0F",
        "bg-element": "#1A1A1A",
        "bg-element-hover": "#262626",
        "bg-overlay": "rgba(0, 0, 0, 0.85)",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A3A3A3",
        "text-muted": "#737373",
        "text-inverse": "#050505",
        accent: {
          DEFAULT: "#91CB7D",
          hover: "#A8E090",
          light: "rgba(145, 203, 125, 0.1)",
          dark: "#6BAF52",
          glow: "rgba(145, 203, 125, 0.25)",
        },
        error: "#FF4444",
        success: "#00C851",
        warning: "#FFAA00",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          light: "rgba(255, 255, 255, 0.05)",
          accent: "rgba(145, 203, 125, 0.2)",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-up": "scaleUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(145, 203, 125, 0.1)",
        "glow-md": "0 0 20px rgba(145, 203, 125, 0.15)",
        "glow-lg": "0 0 30px rgba(145, 203, 125, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-premium": "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
        "gradient-card": "linear-gradient(135deg, #1A1A1A 0%, #141414 100%)",
        "gradient-accent": "linear-gradient(135deg, rgba(145, 203, 125, 0.15) 0%, rgba(145, 203, 125, 0.05) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;