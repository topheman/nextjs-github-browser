import "../src/styles/globals.css";
import "github-markdown-css";
import { RouterContext } from "next/dist/shared/lib/router-context";

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
    default: "light",
    list: [
      { name: "light", class: ["default-mode"], color: "white" },
      { name: "dark", class: ["dark-mode"], color: "black" },
    ],
  },
  backgrounds: {
    disable: true,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
