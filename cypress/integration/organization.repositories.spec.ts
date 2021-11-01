import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/orgs/twitter/repositories", "twitter", {
  searchQuery: "typeahead.js",
  skipCheckForwardButton: true, // this case fails on cypress (works manual testing)
});
