import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/orgs/twitter/repositories", "twitter", {
  searchQuery: "typeahead.js",
  skipCheckBackButton: false,
  skipCheckForwardButton: false,
});
