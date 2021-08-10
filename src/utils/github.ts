import { useReducer } from "react";

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

export function useSearchBar(
  user: string,
  searchParams: SearchParamsType
): {
  searchBarState: SearchParamsType;
  setSearchBarState: React.Dispatch<SearchParamsType>;
  graphqlSearchQuery: string;
} {
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
  const debouncedQ = useDebounce(searchBarState.q, 1000);
  const graphqlSearchQuery = makeGraphqlSearchQuery(user, {
    ...searchBarState,
    q: debouncedQ,
  });
  return {
    searchBarState,
    setSearchBarState,
    graphqlSearchQuery,
  };
}
