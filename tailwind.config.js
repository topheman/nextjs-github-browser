const brandColors = {
  "brand-primary": {
    DEFAULT: "var(--color-brand-primary)",
    light: "var(--color-brand-primary-light)",
  },
  "brand-secondary": "var(--color-brand-secondary)",
};

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...brandColors,
    },
    textColor: {
      ...brandColors,
      "brand-primary": "var(--color-text-brand-primary)",
      white: "white",
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
    },
    backgroundColor: {
      ...brandColors,
      canvas: "var(--color-bg-canvas)",
      primary: "var(--color-bg-primary)",
      "primary-active": "var(--color-bg-primary-active)",
      "primary-hover": "var(--color-bg-primary-hover)",
      "primary-focus": "var(--color-bg-primary-focus)",
    },
    borderColor: {
      ...brandColors,
      primary: "var(--color-border-primary)",
      "primary-active": "var(--color-border-primary-active)",
      "primary-hover": "var(--color-border-primary-hover)",
      "primary-focus": "var(--color-border-primary-focus)",
      secondary: "var(--color-border-secondary)",
      light: "var(--color-border-light)",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
