export const tokens = {
  color: {
    bg: "#FAF7F2",
    bgElevated: "#FFFFFF",
    bgWarm: "#F2EDE3",
    fg: "#1A1A1A",
    fgMuted: "#6B6358",
    fgSubtle: "#A39B8E",
    border: "#E8E2D8",
    borderStrong: "#D8CFC0",
    gold: "#C9A961",
    goldDark: "#8B6F3C",
    rose: "#E2BBA9",
    success: "#2F6F4E",
    danger: "#9B2C2C",
  },
  font: {
    display: "var(--font-display)",
    sans: "var(--font-sans)",
  },
  type: {
    xl: "clamp(3rem, 7vw, 5.75rem)",
    lg: "clamp(2.25rem, 5vw, 4rem)",
    md: "clamp(1.75rem, 3.5vw, 2.75rem)",
    sm: "clamp(1.25rem, 2.4vw, 1.5rem)",
    body: "1rem",
    small: "0.875rem",
    eyebrow: "0.75rem",
  },
  space: {
    section: "clamp(4rem, 9vw, 7.5rem)",
    sectionSm: "clamp(2.5rem, 6vw, 4.5rem)",
  },
  radius: {
    none: "0",
    sm: "2px",
    md: "6px",
    lg: "10px",
    xl: "16px",
    pill: "9999px",
  },
  shadow: {
    card: "0 1px 2px rgba(26,26,26,0.04), 0 8px 24px -12px rgba(26,26,26,0.08)",
    cardHover: "0 2px 4px rgba(26,26,26,0.06), 0 16px 40px -16px rgba(26,26,26,0.16)",
  },
  motion: {
    fast: "150ms",
    base: "220ms",
    slow: "320ms",
    easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;

export type Tokens = typeof tokens;
