import { encodeBase64, decodeBase64 } from "./common";

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
