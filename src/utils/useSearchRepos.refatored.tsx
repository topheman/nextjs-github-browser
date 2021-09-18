import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
  GetRepositoryOwnerWithRepositoriesQuery,
} from "../libs/graphql";
import {
  useDebounce,
  useStateReducer,
  StateReducerActionType,
  useEffectSkipFirst,
  usePrevious,
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
  const router = useRouter();
  useEffect(() => {
    router.events.on("beforeHistoryChange", (...args) => {
      console.log("beforeHistoryChange", ...args);
    });
    router.events.on("routeChangeComplete", (...args) => {
      console.log("routeChangeComplete", ...args);
    });
    router.events.on("routeChangeStart", (...args) => {
      console.log("routeChangeStart", ...args);
    });
  }, []);
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
  const debouncedQ = useDebounce(searchBarState.q, 1000);
  const previousState = usePrevious({
    type: searchBarState.type,
    sort: searchBarState.sort,
    q: debouncedQ,
  });
  let computedGraphqlVariables = getSearchRepoGraphqlVariables(user, {
    ...searchBarState,
    ...paginationState,
    q: debouncedQ,
  });
  useEffectSkipFirst(() => {
    console.log(router);
    const { owner, after, before, ...routerQuery } = getNewRouterQuery({
      ...router.query,
      ...searchBarState,
      ...paginationState,
    });
    const resetPagination =
      previousState.q !== debouncedQ ||
      previousState.type !== searchBarState.type ||
      previousState.sort !== searchBarState.sort;
    const graphqlVariables = getSearchRepoGraphqlVariables(user, {
      ...searchBarState,
      ...paginationState,
      q: debouncedQ,
    });
    computedGraphqlVariables = {
      query: graphqlVariables.query,
      first: graphqlVariables.first,
      last: graphqlVariables.last,
      ...(resetPagination
        ? {}
        : cleanupPaginationParams({
            after: graphqlVariables.after,
            before: graphqlVariables.before,
          })),
    };
    console.log(
      "effect computedGraphqlVariables",
      computedGraphqlVariables,
      "resetPagination",
      resetPagination
    );
    const newRouterQuery = {
      ...(resetPagination ? {} : cleanupPaginationParams({ after, before })),
      ...(routerQuery as Record<string, string>),
    };
    const newUrl = `${window.location.pathname}?${new URLSearchParams(
      newRouterQuery
    ).toString()}`;
    window.history.pushState(
      {
        ...window.history.state,
        as: newUrl,
        // url: newUrl.replace("topheman", "[owner]"),
        url: newUrl.replace("topheman", "[owner]"),
        options: {
          ...window.history.state.options,
          shallow: true,
        },
      },
      "",
      newUrl
    );
    // router.push({ pathname: router.pathname, query: routerQuery }, undefined, {
    //   shallow: true,
    // });
  }, [
    searchBarState.sort,
    searchBarState.type,
    debouncedQ,
    paginationState.after,
    paginationState.before,
    paginationState.page,
  ]);
  // const { query, before, after, first, last } = getSearchRepoGraphqlVariables(
  //   user,
  //   {
  //     ...searchBarState,
  //     ...paginationState,
  //     q: debouncedQ,
  //   }
  // );
  // console.log({ query, before, after, first, last });
  const resetPagination =
    previousState?.q !== debouncedQ ||
    previousState?.type !== searchBarState.type ||
    previousState?.sort !== searchBarState.sort;
  console.log(
    "render computedGraphqlVariables",
    computedGraphqlVariables,
    "resetPagination",
    resetPagination
  );
  const rawResult = useSearchRepositoriesQuery({
    variables: computedGraphqlVariables,
  });
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
