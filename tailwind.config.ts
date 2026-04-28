import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F2",
          200: "#F2EDE3",
          300: "#E8E2D8",
          400: "#D8CFC0",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          900: "#1A1A1A",
          700: "#3A3733",
          500: "#6B6358",
          300: "#A39B8E",
        },
        gold: {
          50: "#FBF7EE",
          100: "#F4ECD7",
          200: "#E8D9B0",
          300: "#D9BF82",
          400: "#C9A961",
          500: "#B89244",
          600: "#8B6F3C",
          700: "#6E5630",
        },
        rose: {
          50: "#FBF1EC",
          100: "#F2DDD2",
          200: "#E2BBA9",
        },
        background: "#FAF7F2",
        foreground: "#1A1A1A",
        muted: { DEFAULT: "#F2EDE3", foreground: "#6B6358" },
        accent: { DEFAULT: "#C9A961", foreground: "#1A1A1A" },
        border: "#E8E2D8",
        input: "#E8E2D8",
        ring: "#C9A961",
        primary: { DEFAULT: "#1A1A1A", foreground: "#FAF7F2" },
        secondary: { DEFAULT: "#F2EDE3", foreground: "#1A1A1A" },
        destructive: { DEFAULT: "#9B2C2C", foreground: "#FAF7F2" },
        card: { DEFAULT: "#FFFFFF", foreground: "#1A1A1A" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 5.75rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        "section": "clamp(4rem, 9vw, 7.5rem)",
        "section-sm": "clamp(2.5rem, 6vw, 4.5rem)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,26,26,0.04), 0 8px 24px -12px rgba(26,26,26,0.08)",
        "card-hover": "0 2px 4px rgba(26,26,26,0.06), 0 16px 40px -16px rgba(26,26,26,0.16)",
        soft: "0 1px 0 rgba(26,26,26,0.04)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
