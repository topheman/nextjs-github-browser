import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/topheman?tab=repositories", "topheman", {
  searchQuery: "react",
  skipCheckBackButton: Cypress.env("IS_CI"), // doesn't work on CI 🙁
  skipCheckForwardButton: Cypress.env("IS_CI"), // doesn't work on CI 🙁
});
