import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/topheman?tab=repositories", "topheman", {
  searchQuery: "react",
  skipCheckBackButton:
    Cypress.env("IS_CI") && Cypress.env("SKIP_FAILING_TESTS_ON_CI"), // doesn't work on CI 🙁
  skipCheckForwardButton:
    Cypress.env("IS_CI") && Cypress.env("SKIP_FAILING_TESTS_ON_CI"), // doesn't work on CI 🙁
});
