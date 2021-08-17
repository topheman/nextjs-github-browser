import router from "next/router";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";

import { makeApolloProviderWrapper } from "./tests";
import { encodeBase64 } from "./common";
import { server } from "../mocks/server";
import {
  useSearchRepos,
  extractSearchUrlParams,
  makeGraphqlSearchQuery,
  getPaginationInfos,
} from "./github";
import { Repository } from "../libs/graphql";

// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));

describe("utils/github", () => {
  describe("useSearchRepos", () => {
    describe("basic render", () => {
      beforeEach(() => {
        server.listen();
      });
      afterEach(() => {
        server.close();
      });
      it("default case", async () => {
        const wrapper = makeApolloProviderWrapper();
        const { result } = renderHook(() => useSearchRepos("topheman", {}), {
          wrapper,
        });
        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeFalsy();
        expect(result.current.rawResult.variables).toStrictEqual({
          query: "user:topheman sort:updated-desc fork:true",
          first: 30,
          last: undefined,
          after: undefined,
          before: undefined,
        });
        await waitFor(() => {
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("rust-wasm-experiments");
        });
      });
      it("sort by name", async () => {
        const wrapper = makeApolloProviderWrapper();
        const { result } = renderHook(
          () => useSearchRepos("topheman", { sort: "name" }),
          {
            wrapper,
          }
        );
        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeFalsy();
        expect(result.current.rawResult.variables).toStrictEqual({
          query: "user:topheman sort:name-asc fork:true",
          first: 30,
          last: undefined,
          after: undefined,
          before: undefined,
        });
        await waitFor(() => {
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("angular-yeoman-sass-compass");
        });
      });
      it("sort by name & after Y3Vyc29yOjMw", async () => {
        const wrapper = makeApolloProviderWrapper();
        const { result } = renderHook(
          () =>
            useSearchRepos("topheman", { sort: "name", after: "Y3Vyc29yOjMw" }),
          {
            wrapper,
          }
        );
        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeFalsy();
        expect(result.current.rawResult.variables).toStrictEqual({
          query: "user:topheman sort:name-asc fork:true",
          first: 30,
          last: undefined,
          after: "Y3Vyc29yOjMw",
          before: undefined,
        });
        await waitFor(() => {
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("lite-router");
        });
      });
      it("sort by name & before Y3Vyc29yOjYx", async () => {
        const wrapper = makeApolloProviderWrapper();
        const { result } = renderHook(
          () =>
            useSearchRepos("topheman", {
              sort: "name",
              before: "Y3Vyc29yOjYx",
            }),
          {
            wrapper,
          }
        );
        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeFalsy();
        expect(result.current.rawResult.variables).toStrictEqual({
          query: "user:topheman sort:name-asc fork:true",
          first: undefined,
          last: 30,
          after: undefined,
          before: "Y3Vyc29yOjYx",
        });
        await waitFor(() => {
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("lite-router");
        });
      });
    });
    describe("behaviour", () => {
      beforeEach(() => {
        server.listen();
      });
      afterEach(() => {
        server.close();
      });
      it("should load next page + sync router state", async () => {
        const wrapper = makeApolloProviderWrapper();
        const { result } = renderHook(
          () => useSearchRepos("topheman", { sort: "name" }),
          {
            wrapper,
          }
        );
        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeFalsy();
        expect(result.current.rawResult.variables).toStrictEqual({
          query: "user:topheman sort:name-asc fork:true",
          first: 30,
          last: undefined,
          after: undefined,
          before: undefined,
        });
        await waitFor(() => {
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("angular-yeoman-sass-compass");
        });
        // update pagination via the hook
        act(() => {
          result.current.setPaginationState({ after: "Y3Vyc29yOjMw" });
        });
        // should now be loading
        expect(result.current.loading).toBeTruthy();
        // data should use previousData
        expect(result.current.data).toBeTruthy();
        // still loading, we shouldn't have change page yet
        expect(
          (result.current.data?.searchRepos.edges?.[0]?.node as Repository).name
        ).toBe("angular-yeoman-sass-compass");
        await waitFor(() => {
          // loading should be finished
          expect(result.current.loading).toBeFalsy();
          expect(result.current.data).toBeTruthy();
          // new data should now be available (next page)
          expect(
            (result.current.data?.searchRepos.edges?.[0]?.node as Repository)
              .name
          ).toBe("lite-router");
          // router should be synced
          expect(router.query).toEqual({
            after: "Y3Vyc29yOjMw",
            sort: "name",
          });
        });
      });
    });
  });
  describe("extractSearchUrlParams", () => {
    it("should extract only searchUrlParams from `/topheman?tab=repositories&type=fork`", () => {
      const result = extractSearchUrlParams(
        "/topheman?tab=repositories&type=fork"
      );
      expect(result).toStrictEqual({
        type: "fork",
      });
    });
    it("should accept empty params `/topheman?`", () => {
      expect(extractSearchUrlParams("/topheman?")).toStrictEqual({});
    });
    it("should accept url with no trailing `?` : `/topheman`", () => {
      expect(extractSearchUrlParams("/topheman")).toStrictEqual({});
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
  describe("getPaginationInfos", () => {
    it("default case", () => {
      const result = getPaginationInfos({});
      expect(result).toStrictEqual({
        after: undefined,
        before: undefined,
        first: 30,
        last: undefined,
      });
    });
    it("correct before cursor - should return `before` and `last`", () => {
      const before = encodeBase64("cursor:30"); // Y3Vyc29yOjMw
      const result = getPaginationInfos({ before });
      expect(result).toStrictEqual({
        after: undefined,
        before: "Y3Vyc29yOjMw",
        first: undefined,
        last: 30,
      });
    });
    it("correct after cursor - should return `after` and `first`", () => {
      const after = encodeBase64("cursor:30"); // Y3Vyc29yOjMw
      const result = getPaginationInfos({ after });
      expect(result).toStrictEqual({
        after: "Y3Vyc29yOjMw",
        before: undefined,
        first: 30,
        last: undefined,
      });
    });
    it("after should take precedence", () => {
      const after = encodeBase64("cursor:30"); // Y3Vyc29yOjMw
      const result = getPaginationInfos({ after, before: after });
      expect(result).toStrictEqual({
        after: "Y3Vyc29yOjMw",
        before: undefined,
        first: 30,
        last: undefined,
      });
    });
  });
});
