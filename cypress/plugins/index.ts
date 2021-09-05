/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

import { loadMock } from "../../src/mocks/node";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = (on) => {
  const options = {
    // eslint-disable-next-line global-require
    webpackOptions: require("../webpack.config"),
  };
  console.log(process.cwd());
  on("file:preprocessor", webpackPreprocessor(options));
  on("task", {
    loadMock: ([operationName, variables, loadMockOptions]) => {
      console.log("loadMock", [operationName, variables, loadMockOptions]);
      return loadMock(operationName, variables, {
        ...loadMockOptions,
        endpoint: "https://api.github.com/graphql", // must specify - we dont share .env
      });
    },
  });
};
