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
      white: "white",
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
    },
    backgroundColor: {
      ...brandColors,
      primary: "var(--color-bg-primary)",
    },
    borderColor: {
      ...brandColors,
      primary: "var(--color-border-primary)",
      secondary: "var(--color-border-secondary)",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
