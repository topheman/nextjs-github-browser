import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import {
  SearchRepositoriesQueryResult,
  useSearchRepositoriesQuery,
  SearchRepositoriesDocument,
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // todo manage error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const router = useRouter();
  useEffect(() => {
    router.events.on("beforeHistoryChange", (...args) => {
      // eslint-disable-next-line no-console
      console.log("beforeHistoryChange", ...args);
    });
    router.events.on("routeChangeComplete", (...args) => {
      // eslint-disable-next-line no-console
      console.log("routeChangeComplete", ...args);
    });
    router.events.on("routeChangeStart", (...args) => {
      // eslint-disable-next-line no-console
      console.log("routeChangeStart", ...args);
    });
    return () => {
      // todo router.events.off()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  let graphqlVariables = getSearchRepoGraphqlVariables(user, {
    ...searchBarState,
    ...paginationState,
    q: debouncedQ,
  });
  useEffectSkipFirst(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner, after, before, ...routerQuery } = getNewRouterQuery({
      ...router.query,
      ...searchBarState,
      ...paginationState,
    });
    const resetPagination =
      previousState.q !== debouncedQ ||
      previousState.type !== searchBarState.type ||
      previousState.sort !== searchBarState.sort;
    graphqlVariables = getSearchRepoGraphqlVariables(
      user,
      {
        ...searchBarState,
        ...paginationState,
        q: debouncedQ,
      },
      { resetPagination }
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newRouterQuery = {
      ...(resetPagination
        ? {}
        : cleanupPaginationParams({ after, before } as {
            [key: string]: string | undefined;
          })),
      ...(routerQuery as Record<string, string>),
    };
    const newUrl = `${window.location.pathname}?${new URLSearchParams(
      newRouterQuery
    ).toString()}`;
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const result = await apolloClient.current.query({
      query: SearchRepositoriesDocument,
      variables: graphqlVariables,
    });
    setData(result.data);
    setLoading(false);
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
  const rawResult = useSearchRepositoriesQuery({
    variables: graphqlVariables,
    skip: mounted,
  });
  const apolloClient = useRef(rawResult.client);
  return {
    searchBarState,
    setSearchBarState,
    paginationState,
    setPaginationState,
    loading, // rawResult.loading,
    data: data || rawResult.data || rawResult.previousData, // keep the previous data while requesting
    rawResult,
  };
}
