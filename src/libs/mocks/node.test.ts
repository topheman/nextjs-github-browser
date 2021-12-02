/* eslint-disable global-require,@typescript-eslint/no-var-requires */
import { getMockFilePath, saveMock, loadMock, loadAllMocks } from "./node";

function rootMockDirectory() {
  return require("path").join(__dirname, "..", "..", "..", ".tmp/.mock-test");
}

const baseOptions = {
  rootMockDirectory,
  endpoint: "https://www.example.com/graphql",
};

describe("libs/mocks/node", () => {
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
        ".tmp/.mock-test/www.example.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484_response.json"
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
        ".tmp/.mock-test/www.example.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484_response.json"
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
        ".tmp/.mock-test/www.example.com/graphql/MyQueryName_1246ca6d7128858e2b3f2d3ee06cde329cc20697e146355fd62af214af3b2484_response.json"
      );
    });
  });
  describe("saveMock", () => {
    beforeAll(async () => {
      await require("fs/promises").rm(rootMockDirectory(), {
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
        JSON.stringify({ someRequest: "foo" }),
        JSON.stringify({ someResponse: "bar" }),
        baseOptions
      );
    });
  });
  describe("loadMock", () => {
    beforeAll(async () => {
      await require("fs/promises").rm(rootMockDirectory(), {
        recursive: true,
      });
      await saveMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        JSON.stringify({ someRequest: "foo" }),
        JSON.stringify({ someResponse: "bar" }),
        baseOptions
      );
    });
    it("should load mock (response) in proper folder (with parsing)", async () => {
      const result = await loadMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        baseOptions
      );
      expect(result).toStrictEqual({ someResponse: "bar" });
    });
    it("should load mock (response) in proper folder (without parsing) - return a buffer", async () => {
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
      expect(result).toBe('{"someResponse":"bar"}');
    });
    it("should load mock (request) in proper folder (with parsing)", async () => {
      const result = await loadMock(
        "MyQueryName",
        {
          foo: "other variable",
          query: "some variable",
          someUndefinedVar: undefined,
        },
        {
          ...baseOptions,
          isRequest: true,
        }
      );
      expect(result).toStrictEqual({ someRequest: "foo" });
    });
    it("should load mock (request) in proper folder (without parsing) - return a buffer", async () => {
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
          isRequest: true,
        }
      );
      expect(result).toBe('{"someRequest":"foo"}');
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
  describe("loadAllMocks & Mocks Map", () => {
    beforeAll(async () => {
      await require("fs/promises").rm(rootMockDirectory(), {
        recursive: true,
      });
      // create a bunch of files
      const promise = Promise.all([
        saveMock(
          "MyQueryName",
          {
            foo: "toto",
            bar: "tata",
          },
          JSON.stringify({ someRequest: "foo/toto" }),
          JSON.stringify({ someResponse: "bar/tata" }),
          baseOptions
        ),
        saveMock(
          "MyQueryName",
          {
            foo: "titi",
            bar: "tutu",
          },
          JSON.stringify({ someRequest: "foo/titi" }),
          JSON.stringify({ someResponse: "bar/tutu" }),
          baseOptions
        ),
        saveMock(
          "MyQueryName",
          {
            foo: "toto",
            bar: "tete",
          },
          JSON.stringify({ someRequest: "foo/toto" }),
          JSON.stringify({ someResponse: "bar/tete" }),
          baseOptions
        ),
      ]);
      await promise;
    });
    it("should load all mocks from fs", async () => {
      const result = await loadAllMocks(baseOptions);
      expect(result).toBeInstanceOf(Map);
      expect(result?.size).toBe(6);
      expect(Object.fromEntries(result?.entries() || [])).toStrictEqual({
        "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_request.json": {
          someRequest: "foo/toto",
        },
        "MyQueryName_505bd18c7cb74e0cd370b1583b0b2490da2a272ab723f0ab15e2e8581af795a0_response.json": {
          someResponse: "bar/tata",
        },
        "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_request.json": {
          someRequest: "foo/titi",
        },
        "MyQueryName_725cb2851d5c78393fb6051e9790f1f73f1aaac1e4f05577c4a49aa45e96f28a_response.json": {
          someResponse: "bar/tutu",
        },
        "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_request.json": {
          someRequest: "foo/toto",
        },
        "MyQueryName_f07db4edccb7c81d2a4b7439f6c1e01553560b5558b3a0b4339451d88afcb4a2_response.json": {
          someResponse: "bar/tete",
        },
      });
    });
  });
});
