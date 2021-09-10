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
import { loadEnvConfig } from "@next/env";

import { loadMock } from "../../src/mocks/node";

const { GITHUB_GRAPHQL_API_ROOT_ENDPOINT } = loadEnvConfig(
  "./",
  true
).combinedEnv;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = (on) => {
  const options = {
    // eslint-disable-next-line global-require
    webpackOptions: require("../webpack.config"),
  };
  on("file:preprocessor", webpackPreprocessor(options));
  on("task", {
    loadMock: ([operationName, variables, loadMockOptions]) => {
      const resolvedOptions = {
        endpoint: GITHUB_GRAPHQL_API_ROOT_ENDPOINT,
        ...loadMockOptions,
      };
      // eslint-disable-next-line no-console
      console.log("loadMock", [operationName, variables, resolvedOptions]);
      return loadMock(operationName, variables, resolvedOptions);
    },
  });
};
