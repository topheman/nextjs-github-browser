import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
} from "../libs/graphql";
import {
  useDebounce,
  useStateReducer,
  StateReducerActionType,
  useEffectSkipFirst,
} from "./hooks";
import {
  getSearchRepoGraphqlVariables,
  SearchUrlParamsType,
  SearchParamsType,
  PaginationParamsType,
} from "./github";

type ParsedUrlQueryInput = Record<
  string,
  | string
  | undefined
  | number
  | boolean
  | ReadonlyArray<string>
  | ReadonlyArray<number>
  | ReadonlyArray<boolean>
  | null
>;

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

function getNewRouterQuery(
  searchUrlParams: Record<string, unknown>,
  { noPaginationInfos = false } = {}
): ParsedUrlQueryInput {
  const result = cleanupPaginationParams(
    searchUrlParams
  ) as ParsedUrlQueryInput;
  if (noPaginationInfos) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { after, before, ...rest } = result;
    return rest;
  }
  return result;
}

export type SetReducerStateType<T> = React.Dispatch<StateReducerActionType<T>>;

export default function useSearchRepos(
  user: string,
  searchUrlParams: SearchUrlParamsType
): {
  searchBarState: SearchParamsType;
  setSearchBarState: React.Dispatch<StateReducerActionType<SearchParamsType>>;
  paginationState: PaginationParamsType;
  setPaginationState: React.Dispatch<
    StateReducerActionType<PaginationParamsType>
  >;
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
  // manage reset location when pagination should be ignored (changing type/sort/query)
  const [
    nextLocationWithoutPagination,
    setNextLocationWithoutPagination,
  ] = useState(false);
  // manage pagination fields state
  const [
    paginationState,
    setPaginationState,
  ] = useStateReducer<PaginationParamsType>({
    ...onlyParams<PaginationParamsType>(searchUrlParams, "pagination"),
  });
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
  // reset local state if not in sync with searchUrlParams (from the router)
  useEffectSkipFirst(() => {
    setNextLocationWithoutPagination(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  useEffectSkipFirst(
    () => {
      const routerQuery = getNewRouterQuery(
        {
          ...router.query,
          ...searchBarState,
          ...paginationState,
        },
        { noPaginationInfos: !!nextLocationWithoutPagination }
      );
      // wait for the graphql request to be finished to update the location (rely on networkStatus instead of loading for cache support)
      if (rawResult.networkStatus === NetworkStatus.ready) {
        // shallow mode because we don't want to run any server-side hooks
        setTimeout(() => {
          router
            .push(
              {
                pathname: router.pathname,
                query: { ...routerQuery },
              },
              undefined,
              { shallow: true }
            )
            .then(() => {
              setNextLocationWithoutPagination(false);
            });
        }, 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [rawResult.networkStatus, after, before, query],
    () => {
      // do not change location on first mount
      if (searchUrlParams.after || searchUrlParams.before) {
        setPaginationState({
          after: searchUrlParams.after,
          before: searchUrlParams.before,
        });
      }
    }
  );
  return {
    searchBarState,
    setSearchBarState,
    paginationState,
    setPaginationState,
    loading: rawResult.loading,
    data: rawResult.data || rawResult.previousData, // keep the previous data while requesting
    rawResult,
  };
}
