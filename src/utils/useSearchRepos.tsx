import Router, { useRouter } from "next/router";
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
  const [replayHistory, setReplayHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // todo manage error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const router = useRouter();
  useEffect(() => {
    /**
     * In order not to break back/forward history button, we must sync url and state
     * when they change after user clicks on back button for example.
     * We also want to prevent NextJS router to call the getServerSideProps endpoint `_next/data/*`
     * We make our own requests directly to the graphql endpoint if needed (triggered by state change)
     */
    Router.beforePopState(({ url }) => {
      const [, searchUrlQueryString] = url.split("?");
      const searchUrlParamsFromHistory = Object.fromEntries(
        new URLSearchParams(searchUrlQueryString).entries()
      );
      // Do not override router if not on the repositories tab
      if (searchUrlParamsFromHistory.tab !== "repositories") {
        return true;
      }
      console.log("manageHistory", url, searchUrlParamsFromHistory, {
        after: searchUrlParamsFromHistory.after
          ? atob(searchUrlParamsFromHistory.after)
          : searchUrlParamsFromHistory.after,
        before: searchUrlParamsFromHistory.before
          ? atob(searchUrlParamsFromHistory.before)
          : searchUrlParamsFromHistory.before,
      });
      // flag the following state changes as triggered by history change
      // (in order not to add any new entry with `history.pushState`)
      setReplayHistory(true);
      // sync hook state with router
      setSearchBarState(() =>
        onlyParams<SearchParamsType>(searchUrlParamsFromHistory, "search")
      );
      setPaginationState(() =>
        onlyParams<PaginationParamsType>(
          searchUrlParamsFromHistory,
          "pagination"
        )
      );
      // prevent next router from calling getServerSideProps hook
      return false;
    });
    function onRouteChangeComplete(url: string) {
      // cleanup state when going back to default page
      if (typeof url === "string" && url.endsWith("?tab=repositories")) {
        setSearchBarState({ q: "", type: "", sort: "" });
        setPaginationState({ before: "", after: "", page: "" });
      }
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      // reset Router events
      Router.beforePopState(() => true);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
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
    const result = await apolloClient.current.query({
      query: SearchRepositoriesDocument,
      variables: graphqlVariables,
    });
    setData(result.data);
    setLoading(false);
    // if state change is comming from a history change (e.g. back button), don't add a new entry
    if (!replayHistory) {
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
    }
    setReplayHistory(false);
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
