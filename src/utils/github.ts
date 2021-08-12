import { useRouter } from "next/router";
import { useReducer, useEffect, useState } from "react";

import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
} from "../libs/graphql";
import { useDebounce } from "./hooks";

export type SearchParamsType = Partial<Record<"sort" | "type" | "q", string>>;

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

function getNewLocation(searchParams: SearchParamsType): string {
  if (typeof window === "undefined") {
    throw new Error("Only use client side");
  }
  const newSearchParams = new URLSearchParams({
    ...Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    ),
    ...searchParams,
  });
  const url = `${window.location.pathname}?${newSearchParams.toString()}`;
  return url;
}

export function useSearchRepos(
  user: string,
  searchParams: SearchParamsType
): {
  searchBarState: SearchParamsType;
  setSearchBarState: React.Dispatch<SearchParamsType>;
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
      ...searchParams,
    }
  );
  // generate graphql query string
  const debouncedQ = useDebounce(searchBarState.q, 1000);
  const graphqlSearchQuery = makeGraphqlSearchQuery(user, {
    ...searchBarState,
    q: debouncedQ,
  });
  // call graphql API
  const searchRepositoriesResult = useSearchRepositoriesQuery({
    variables: { query: graphqlSearchQuery },
  });
  // update url
  const router = useRouter();
  const [bypassFirstEffect, setBypassFirstEffect] = useState(true);
  const { loading } = searchRepositoriesResult;
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // do not change location on first mount
    if (bypassFirstEffect) {
      return setBypassFirstEffect(false);
    }
    const newLocation = getNewLocation(searchBarState);
    // wait for the graphql request to be finished to update the location
    if (!loading) {
      // shallow mode because we don't want to run any server-side hooks
      router.push(newLocation, newLocation, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return {
    searchBarState,
    setSearchBarState,
    searchRepositoriesResult,
  };
}
