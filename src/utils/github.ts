import isEqual from "lodash/isEqual";
import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { encodeBase64, decodeBase64 } from "./common";
import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
} from "../libs/graphql";
import { useDebounce, useStateReducer, StateReducerActionType } from "./hooks";

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

function cleanupUndefinedValues<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (_) {
    return obj;
  }
}

export function getSearchRepoGraphqlVariables(
  user: string,
  searchUrlParams: SearchUrlParamsType,
  options?: { perPage?: number }
): {
  query: string;
  before?: string;
  after?: string;
  last?: number;
  first?: number;
} {
  return {
    ...getPaginationInfos(searchUrlParams, options),
    query: makeGraphqlSearchQuery(user, searchUrlParams),
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
  const decodedBefore = decodeBase64(paginationParams.before);
  const decodeAfter = decodeBase64(paginationParams.after);
  // convert "page" into graphql cursor - will be overriden by before/after if passed
  if (paginationParams.page) {
    const pageNumber = Number(paginationParams.page) || 1; // get rid of NaN
    after = encodeBase64(`cursor:${(pageNumber - 1) * perPage}`);
  }
  // check for before/after cursor passed (github website uses v2, which is unsupported in the API)
  if (decodedBefore && /cursor:\d+/.test(decodedBefore)) {
    before = paginationParams.before;
  } else if (paginationParams.before) {
    // eslint-disable-next-line no-console
    console.warn(
      `"before" cursor not supported - decoded : "${decodedBefore}", falling back`
    );
  }
  if (paginationParams.after && decodeAfter && /cursor:\d+/.test(decodeAfter)) {
    after = paginationParams.after;
  } else if (paginationParams.after) {
    // eslint-disable-next-line no-console
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

export function extractSearchUrlParams(url: string): SearchUrlParamsType {
  const searchQueryMatch = url.match(/\?(.*)/);
  let searchParamsFromUrl: URLSearchParams;
  if (searchQueryMatch) {
    searchParamsFromUrl = new URLSearchParams(searchQueryMatch[0]);
  } else {
    searchParamsFromUrl = new URLSearchParams();
  }
  return Object.fromEntries(
    [...searchParamsFromUrl.entries()].filter(([key]) => {
      if (
        (["after", "before", "page", "q", "sort", "type"] as Array<
          keyof SearchUrlParamsType
        >).includes(<keyof SearchUrlParamsType>key)
      ) {
        return true;
      }
      return false;
    })
  );
}

const onlyParams = <T extends SearchUrlParamsType>(
  searchUrlParams: SearchUrlParamsType,
  mode: "search" | "pagination"
): T => {
  const mapping = {
    search: ["q", "sort", "type"],
    pagination: ["after", "before", "page"],
  };
  const result = Object.fromEntries(
    Object.entries(searchUrlParams).filter(([key]) => {
      if (mapping[mode].includes(key)) {
        return true;
      }
      return false;
    })
  ) as T;
  return result;
};

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

export type SetReducerStateType<T> = React.Dispatch<StateReducerActionType<T>>;

export function useSearchRepos(
  user: string,
  searchUrlParams: SearchUrlParamsType
): {
  searchBarState: SearchParamsType;
  setSearchBarState: React.Dispatch<StateReducerActionType<SearchParamsType>>;
  paginationState: PaginationParamsType;
  setPaginationState: React.Dispatch<
    StateReducerActionType<PaginationParamsType>
  >;
  clearPaginationFilter: () => void;
  loading: boolean;
  data:
    | SearchRepositoriesQueryResult["data"]
    | SearchRepositoriesQueryResult["previousData"];
  rawResult: SearchRepositoriesQueryResult;
} {
  // manage searchBar fields state
  const [searchBarState, setSearchBarState] = useStateReducer<SearchParamsType>(
    {
      ...onlyParams<SearchParamsType>(searchUrlParams, "search"),
    }
  );
  // manage pagination fields state
  const [
    paginationState,
    setPaginationState,
  ] = useStateReducer<PaginationParamsType>({
    ...onlyParams<PaginationParamsType>(searchUrlParams, "pagination"),
  });
  const clearPaginationFilter = () => {
    // todo
    console.log("clearPaginationFilter", paginationState, searchBarState);
    const newLocation = getNewLocation({
      ...searchBarState,
    });
    console.log("newLocation", newLocation);
  };
  // reset local state if not in sync with searchUrlParams (from the router)
  useEffect(() => {
    if (
      !isEqual(
        cleanupUndefinedValues({ ...searchUrlParams, ...paginationState }),
        cleanupUndefinedValues({ ...searchBarState, ...paginationState })
      )
    ) {
      const newSearchBarState = onlyParams<SearchParamsType>(
        searchUrlParams,
        "search"
      );
      const newPaginationState = onlyParams<PaginationParamsType>(
        searchUrlParams,
        "pagination"
      );
      setSearchBarState(() => newSearchBarState);
      setPaginationState(() => newPaginationState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchUrlParams.q,
    searchUrlParams.type,
    searchUrlParams.sort,
    searchUrlParams.after,
    searchUrlParams.before,
    searchUrlParams.page,
  ]);
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
  console.log({ query, before, after, first, last });
  // call graphql API
  const rawResult = useSearchRepositoriesQuery({
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
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // do not change location on first mount
    if (bypassFirstEffect) {
      if (searchUrlParams.after || searchUrlParams.before) {
        setPaginationState({
          after: searchUrlParams.after,
          before: searchUrlParams.before,
        });
      }
      return setBypassFirstEffect(false);
    }
    const newLocation = getNewLocation({
      ...searchBarState,
      ...paginationState,
    });
    // wait for the graphql request to be finished to update the location (rely on networkStatus instead of loading for cache support)
    // console.log(rawResult);
    if (rawResult.networkStatus === NetworkStatus.ready) {
      // shallow mode because we don't want to run any server-side hooks
      router.push(newLocation, newLocation, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawResult.networkStatus, after, before, query]);
  return {
    searchBarState,
    setSearchBarState,
    paginationState,
    setPaginationState,
    clearPaginationFilter,
    loading: rawResult.loading,
    data: rawResult.data || rawResult.previousData, // keep the previous data while requesting
    rawResult,
  };
}
