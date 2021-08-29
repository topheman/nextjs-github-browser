/* eslint-disable global-require,@typescript-eslint/no-var-requires */
import { getMockFilePath, saveMock, loadMock } from "./mocks";

// only for tests
function rootMockDirectory() {
  return require("path").join(__dirname, "..", ".tmp/.mock-test");
}

describe("utils/mocks", () => {
  describe("getMockFilePath", () => {
    it("should correctly hash variables", () => {
      const result = getMockFilePath(
        "MyQueryName",
        {
          query: "some variable",
          foo: "other variable",
        },
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
      expect(result).toContain(
        ".tmp/.mock-test/api.github.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484.json"
      );
    });
    it("should give the same hash with variables passed in other order", () => {
      const result = getMockFilePath(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
        },
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
      expect(result).toContain(
        ".tmp/.mock-test/api.github.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484.json"
      );
    });
    it("should give the same hash with undefined variables", () => {
      const result = getMockFilePath(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
      expect(result).toContain(
        ".tmp/.mock-test/api.github.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484.json"
      );
    });
  });
  describe("saveMock", () => {
    beforeAll(async () => {
      await require("fs/promises").rmdir(rootMockDirectory(), {
        recursive: true,
      });
    });
    it("should save mock in proper folder", async () => {
      await saveMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        JSON.stringify({ foo: "bar" }),
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
    });
  });
  describe("loadMock", () => {
    beforeAll(async () => {
      await require("fs/promises").rmdir(rootMockDirectory(), {
        recursive: true,
      });
    });
    it("should load mock in proper folder", async () => {
      await saveMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        JSON.stringify({ foo: "bar" }),
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
      const result = loadMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        "http://api.github.com/graphql",
        { rootMockDirectory }
      );
      expect(result).toStrictEqual({ foo: "bar" });
    });
  });
});
