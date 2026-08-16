import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // semantic, theme-aware tokens
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        contrast: "rgb(var(--c-contrast) / <alpha-value>)",
        "contrast-2": "rgb(var(--c-contrast-2) / <alpha-value>)",
        fg: "rgb(var(--c-fg) / <alpha-value>)",
        fgm: "rgb(var(--c-fgm) / <alpha-value>)",
        onc: "rgb(var(--c-onc) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        // always-dark, used only for scrims over film and photography
        scrim: "#0A0908",
        ink: "#14100E",
        umber: "#241C17",
        bark: "#3A2E26",
        stone: "#6B5C4F",
        clay: "#8A6C55",
        sand: "#C7B49B",
        oat: "#E4DACB",
        bone: "#F5F0E8",
        paper: "#FBF8F3",
        sage: "#77836E",
        gold: "#B08D57",
        light: {
          1: "#8C4A44",
          2: "#B0703F",
          3: "#BE9A4E",
          4: "#6E8663",
          5: "#4E7183",
          6: "#4B527B",
          7: "#6D5578",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.2rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.6rem, 7.2vw, 6.4rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4.4vw, 3.6rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.2rem)", { lineHeight: "1.16", letterSpacing: "-0.02em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.22em" }],
        lede: ["clamp(1.0625rem, 1.45vw, 1.375rem)", { lineHeight: "1.62", letterSpacing: "-0.005em" }],
      },
      maxWidth: {
        shell: "88rem",
        prose: "38rem",
      },
      spacing: {
        gutter: "clamp(1.25rem, 5vw, 5rem)",
        section: "clamp(5rem, 11vw, 11rem)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.06)", opacity: "0.9" },
        },
        grainShift: {
          "0%,100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-2%,1%)" },
          "50%": { transform: "translate(1%,-2%)" },
          "75%": { transform: "translate(2%,2%)" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        breathe: "breathe 7s ease-in-out infinite",
        grain: "grainShift 8s steps(4) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
