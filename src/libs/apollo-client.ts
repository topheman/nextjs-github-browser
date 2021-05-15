/* eslint-disable import/no-extraneous-dependencies */
/**
 * Inpired by https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
 * Well explained in this video: https://www.youtube.com/watch?v=y34ym0-KZ8A by Leigh Halliday
 */
import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import type { NormalizedCache, NormalizedCacheObject } from "@apollo/client";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient:
  | ApolloClient<NormalizedCache>
  | ApolloClient<NormalizedCacheObject>;

const makeHttpLink = (uri): HttpLink =>
  new HttpLink({
    uri,
    credentials: "same-origin",
  });

let link = null;
// ssr mode - calling the serverless endpoint with an absolute url
if (typeof window === "undefined") {
  link = makeHttpLink("http://localhost:3000/api/github/graphql");
} else {
  // client-side mode
  // Only generate this code in storybook mode (passing directly through google apis / not via /api/github/graphql proxy)
  // needs auth
  // eslint-disable-next-line no-lonely-if
  if (process.env.STORYBOOK) {
    const httpLink = makeHttpLink(process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT);
    const authlink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN}`,
        },
      };
    });
    link = authlink.concat(httpLink);
  } else {
    // nextjs dev/production mode client-side
    link = makeHttpLink("/api/github/graphql");
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge<any>(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
