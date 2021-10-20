import { runRepositoriesTests } from "../support/owner.repositories";

runRepositoriesTests("/topheman?tab=repositories", "topheman", {
  searchQuery: "react",
});
