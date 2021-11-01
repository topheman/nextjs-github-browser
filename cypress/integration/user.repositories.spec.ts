import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/topheman?tab=repositories", "topheman", {
  searchQuery: "react",
  skipCheckForwardButton: true, // this case fails on cypress (works manual testing)
});
