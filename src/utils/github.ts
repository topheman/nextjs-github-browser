import { useRouter } from "next/router";
import React, { useReducer, useEffect, useState } from "react";

import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
} from "../libs/graphql";
import { useDebounce } from "./hooks";

export const DEFAULT_REPOS_PER_PAGE = 30;

export type SearchParamsType = Partial<Record<"sort" | "type" | "q", string>>;
export type PaginationParamsType = Partial<
  Record<"before" | "after" | "page", string>
>;
export type SearchUrlParamsType = SearchParamsType & PaginationParamsType;

const SELECT_TYPE_OPTIONS = Object.freeze([
  { value: "", label: "All" },
  { value: "source", label: "Sources" },
  { value: "fork", label: "Forks" },
  { value: "archived", label: "Archived" },
  { value: "mirror", label: "Mirrors" },
]);

const SELECT_SORT_OPTIONS = Object.freeze([
  { value: "", label: "Last updated" },
  { value: "name", label: "Name" },
  { value: "stargazers", label: "Stars" },
]);

const TYPE_MAPPING = Object.freeze({
  default: "fork:true",
  source: "fork:false",
  fork: "fork:only",
  archived: "archived:true",
  mirror: "mirror:true",
});

const SORT_MAPPING = Object.freeze({
  default: "sort:updated-desc",
  stargazers: "sort:stars-desc",
  name: "sort:name-asc",
});

function decodeCursor(cursor?: string): string | undefined {
  if (cursor) {
    if (typeof window === "undefined") {
      return Buffer.from(cursor, "base64").toString();
    }
    return atob(cursor);
  }
  return undefined;
}

export function getSearchRepoGraphqlVariables(
  user: string,
  searchParams: SearchUrlParamsType,
  options?: { perPage?: number }
): {
  query: string;
  before?: string;
  after?: string;
  last?: number;
  first?: number;
} {
  return {
    ...getPaginationInfos(searchParams, options),
    query: makeGraphqlSearchQuery(user, searchParams),
  };
}

export function getPaginationInfos(
  paginationParams: PaginationParamsType,
  { perPage = DEFAULT_REPOS_PER_PAGE }: { perPage?: number } = {}
): {
  before?: string;
  after?: string;
  last?: number;
  first?: number;
} {
  let before;
  let after;
  const decodedBefore = decodeCursor(paginationParams.before);
  const decodeAfter = decodeCursor(paginationParams.after);
  // convert "page" into graphql cursor - will be overriden by before/after if passed
  if (paginationParams.page) {
    const pageNumber = Number(paginationParams.page) || 1; // get rid of NaN
    after = `cursor:${(pageNumber - 1) * perPage}`;
  }
  // check for before/after cursor passed (github website uses v2, which is unsupported in the API)
  if (decodedBefore && /cursor:\d+/.test(decodedBefore)) {
    before = paginationParams.before;
  } else if (paginationParams.before) {
    console.warn(
      `"before" cursor not supported - decoded : "${decodedBefore}", falling back`
    );
  }
  if (paginationParams.after && decodeAfter && /cursor:\d+/.test(decodeAfter)) {
    after = paginationParams.after;
  } else if (paginationParams.after) {
    console.warn(
      `"after" cursor not supported - decoded : "${decodeAfter}", falling back`
    );
  }
  // after should override before
  if (before && after) {
    before = undefined;
  }
  // when you use before, ask for `last`
  const last = before && !after ? perPage : undefined;
  // when you use after, ask for `first` - should be default
  const first = after || !last ? perPage : undefined;
  console.log("getCursor", { after, before });
  return {
    before,
    after,
    last,
    first,
  };
}

export function getSearchFieldOptions(
  fieldName: "sort" | "type"
): {
  value: string;
  label: string;
}[] {
  switch (fieldName) {
    case "type":
      return [...SELECT_TYPE_OPTIONS];
    case "sort":
      return [...SELECT_SORT_OPTIONS];
    default:
      throw new Error(`Unsupported fieldname: ${fieldName}`);
  }
}

export function extractSearchParams(url: string): Record<string, string> {
  const searchQueryMatch = url.match(/\?(.*)/);
  let searchParamsFromUrl: URLSearchParams;
  if (searchQueryMatch) {
    searchParamsFromUrl = new URLSearchParams(searchQueryMatch[0]);
  } else {
    searchParamsFromUrl = new URLSearchParams();
  }
  return Object.fromEntries(searchParamsFromUrl.entries());
}

function cleanupPaginationParams(
  searchUrlParams: SearchUrlParamsType
): SearchUrlParamsType {
  const { after, before, page, ...searchParams } = searchUrlParams;
  if (after) {
    return { after, ...searchParams };
  }
  if (before) {
    return { before, ...searchParams };
  }
  if (page) {
    return { page, ...searchParams };
  }
  return { ...searchParams };
}

export function makeGraphqlSearchQuery(
  user: string,
  searchParams: SearchParamsType
): string {
  const queries = [`user:${user}`];
  queries.push(
    SORT_MAPPING[searchParams.sort as keyof typeof SORT_MAPPING] ||
      SORT_MAPPING.default
  );
  queries.push(
    TYPE_MAPPING[searchParams.type as keyof typeof TYPE_MAPPING] ||
      TYPE_MAPPING.default
  );
  if (searchParams.q) {
    queries.push(searchParams.q);
  }
  return queries.join(" ");
}

// todo merge with `makeGraphqlSearchQuery` and return `{query, after, before}` ?
export function extractPaginationInfo(
  searchUrlParams: SearchUrlParamsType
): PaginationParamsType {
  return Object.fromEntries(
    Object.entries(searchUrlParams).filter(([key]) =>
      ["after", "before"].includes(key)
    )
  );
}

function getNewLocation(searchUrlParams: SearchUrlParamsType): string {
  if (typeof window === "undefined") {
    throw new Error("Only use client side");
  }
  const newSearchUrlParams = new URLSearchParams(
    cleanupPaginationParams({
      ...Object.fromEntries(
        new URLSearchParams(window.location.search).entries()
      ),
      ...searchUrlParams,
    })
  );
  const url = `${window.location.pathname}?${newSearchUrlParams.toString()}`;
  return url;
}

export function useSearchRepos(
  user: string,
  searchUrlParams: SearchUrlParamsType
): {
  searchBarState: SearchParamsType;
  setSearchBarState: React.Dispatch<SearchParamsType>;
  paginationState: PaginationParamsType;
  setPaginationState: React.Dispatch<PaginationParamsType>;
  searchRepositoriesResult: SearchRepositoriesQueryResult;
} {
  // manage searchBar fields state
  const [searchBarState, setSearchBarState] = useReducer<
    (state: SearchParamsType, newState: SearchParamsType) => SearchParamsType
  >(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      ...searchUrlParams,
    }
  );
  // manage pagination fields state
  const [paginationState, setPaginationState] = useReducer<
    (
      state: PaginationParamsType,
      newState: PaginationParamsType
    ) => PaginationParamsType
  >(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {}
  );
  // generate graphql query string
  const debouncedQ = useDebounce(searchBarState.q, 1000);
  const { query, before, after, first, last } = getSearchRepoGraphqlVariables(
    user,
    {
      ...searchBarState,
      ...paginationState,
      q: debouncedQ,
    }
  );
  // call graphql API
  const searchRepositoriesResult = useSearchRepositoriesQuery({
    variables: {
      query,
      before,
      after,
      first,
      last,
    },
  });
  // update url
  const router = useRouter();
  const [bypassFirstEffect, setBypassFirstEffect] = useState(true);
  const { loading } = searchRepositoriesResult;
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // do not change location on first mount
    if (bypassFirstEffect) {
      console.log("first", query, searchUrlParams);
      if (searchUrlParams.after || searchUrlParams.before) {
        setPaginationState({
          after: searchUrlParams.after,
          before: searchUrlParams.before,
        });
      }
      return setBypassFirstEffect(false);
    }
    console.log({ paginationState });
    const newLocation = getNewLocation({
      ...searchBarState,
      ...paginationState,
    });
    console.log(newLocation);
    // wait for the graphql request to be finished to update the location
    if (!loading) {
      // shallow mode because we don't want to run any server-side hooks
      router.push(newLocation, newLocation, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]); // todo warn - what if it is in cache ?
  return {
    searchBarState,
    setSearchBarState,
    paginationState,
    setPaginationState,
    searchRepositoriesResult,
  };
}
