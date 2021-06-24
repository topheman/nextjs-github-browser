import "../src/styles/globals.css";
import "github-markdown-css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: false,
  },
  themes: {
    default: "default",
    list: [
      { name: "default", class: ["default-mode"], color: "#F8F8F8" },
      { name: "dark", class: ["dark-mode"], color: "black" },
    ],
  },
};
