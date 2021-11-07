import { profileReadmeBaseUrl } from "./index";

// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));

describe("utils/github", () => {
  describe("profileReadmeBaseUrl", () => {
    it("check for organization", () => {
      expect(profileReadmeBaseUrl("microsoft", "main", "organization")).toBe(
        "https://github.com/microsoft/.github/raw/main"
      );
    });
    it("check for user", () => {
      expect(profileReadmeBaseUrl("topheman", "master", "user")).toBe(
        "https://github.com/topheman/topheman/raw/master"
      );
    });
    it("check for repository", () => {
      expect(
        profileReadmeBaseUrl(
          "topheman",
          "master",
          "repository",
          "nextjs-movie-browser"
        )
      ).toBe("https://github.com/topheman/nextjs-movie-browser/raw/master");
    });
  });
});
