/* eslint-disable global-require,@typescript-eslint/no-var-requires */
import { getMockFilePath, saveMock, loadMock } from "./mocks";

function rootMockDirectory() {
  return require("path").join(__dirname, "..", ".tmp/.mock-test");
}

const baseOptions = {
  rootMockDirectory,
  endpoint: "http://api.github.com/graphql",
};

describe("utils/mocks", () => {
  describe("getMockFilePath", () => {
    it("should correctly hash variables", () => {
      const result = getMockFilePath(
        "MyQueryName",
        {
          query: "some variable",
          foo: "other variable",
        },
        baseOptions
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
        baseOptions
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
        baseOptions
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
        baseOptions
      );
    });
  });
  describe("loadMock", () => {
    beforeAll(async () => {
      await require("fs/promises").rmdir(rootMockDirectory(), {
        recursive: true,
      });
      await saveMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        JSON.stringify({ foo: "bar" }),
        baseOptions
      );
    });
    it("should load mock in proper folder (with parsing)", async () => {
      const result = await loadMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        baseOptions
      );
      expect(result).toStrictEqual({ foo: "bar" });
    });
    it("should load mock in proper folder (without parsing) - return a buffer", async () => {
      const result = await loadMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        {
          ...baseOptions,
          parse: false,
        }
      );
      expect(result).toBe('{"foo":"bar"}');
    });
    it("should return null if not found", async () => {
      const result = await loadMock(
        "MyQueryThatDoesntExist",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        baseOptions
      );
      expect(result).toBeNull();
    });
  });
});
