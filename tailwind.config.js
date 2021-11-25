/**
 * When customising color in tailwind, use the following in order to
 * benefit from the opacity utility.
 * Declare your colors like:
 * ```
:root {
  --color-primary: 37, 99, 235;
  --color-secondary: 253, 224, 71;
}
 *
 * Source : https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo
 *
 * However, colors that are declared that way won't pass the linter,
 * - so you have to add them to the whitelist in .eslintrc.js
 * - only use them on background (since it's mainly here you need opacity)
 * - override the colors on textColor/borderColor with the raw color so
 *   it will be recognized by linter
 */
const makeColorWithOpacity = (cssVarname) => ({
  opacityVariable,
  opacityValue,
}) => {
  if (opacityValue !== undefined) {
    return `rgba(var(${cssVarname}), ${opacityValue})`;
  }
  if (opacityVariable !== undefined) {
    return `rgba(var(${cssVarname}), var(${opacityVariable}, 1))`;
  }
  return `rgb(var(${cssVarname}))`;
};

const brandColors = {
  white: makeColorWithOpacity("--color-rgb-white"),
  "white-always": makeColorWithOpacity("--color-rgb-white-always"),
  "brand-primary": makeColorWithOpacity("--color-rgb-brand-primary"),
  "brand-secondary": makeColorWithOpacity("--color-rgb-brand-secondary"),
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
    // only targetting Roboto:300,400,700 in google fonts
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 700,
    },
    textColor: {
      ...brandColors,
      white: "var(--color-text-white)",
      "white-always": "var(--color-text-white-always)",
      "brand-primary": "var(--color-text-brand-primary)",
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
    },
    backgroundColor: {
      ...brandColors,
      canvas: makeColorWithOpacity("--color-bg-canvas"),
      "canvas-inverted": makeColorWithOpacity("--color-bg-canvas-inverted"),
      primary: makeColorWithOpacity("--color-bg-primary"),
    },
    borderColor: {
      ...brandColors,
      "brand-primary": "var(--color-border-brand-primary)",
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
