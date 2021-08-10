import { extractSearchParams, makeGraphqlSearchQuery } from "./github";

describe("utils/github", () => {
  describe("extractSearchParams", () => {
    it("should extract searchParams from `/topheman?tab=repositories&type=fork`", () => {
      const result = extractSearchParams(
        "/topheman?tab=repositories&type=fork"
      );
      expect(result).toStrictEqual({
        tab: "repositories",
        type: "fork",
      });
    });
    it("should accept empty params `/topheman?`", () => {
      expect(extractSearchParams("/topheman?")).toStrictEqual({});
    });
    it("should accept url with no trailing `?` : `/topheman`", () => {
      expect(extractSearchParams("/topheman")).toStrictEqual({});
    });
  });
  describe("makeGraphqlSearchQuery", () => {
    it("default query", () => {
      const result = makeGraphqlSearchQuery("topheman", {});
      expect(result).toBe("user:topheman sort:updated-desc fork:true");
    });
    it("specific type", () => {
      const result = makeGraphqlSearchQuery("topheman", { type: "fork" });
      expect(result).toBe("user:topheman sort:updated-desc fork:only");
    });
    it("specific sort", () => {
      const result = makeGraphqlSearchQuery("topheman", { sort: "stargazers" });
      expect(result).toBe("user:topheman sort:stars-desc fork:true");
    });
    it("specific type and sort", () => {
      const result = makeGraphqlSearchQuery("topheman", {
        sort: "name",
        type: "archived",
      });
      expect(result).toBe("user:topheman sort:name-asc archived:true");
    });
    it("add search query", () => {
      const result = makeGraphqlSearchQuery("topheman", {
        q: "my awesome repo",
      });
      expect(result).toBe(
        "user:topheman sort:updated-desc fork:true my awesome repo"
      );
    });
  });
});
