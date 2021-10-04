import { useRouter } from "next/router";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import type { ParseQuery } from "../types";
import { initializeApollo, addApolloState } from "../libs/apollo-client";
import { getSearchRepoGraphqlVariables } from "../utils/github";
import TheOwnerProfile from "../components/TheOwnerProfile/TheOwnerProfile";
import {
  GetRepositoryOwnerWithPinnedItemsQuery,
  GetRepositoryOwnerWithPinnedItemsDocument,
  GetRepositoryOwnerWithRepositoriesQuery,
  GetRepositoryOwnerWithRepositoriesDocument,
  GetProfileReadmeQuery,
  GetProfileReadmeDocument,
} from "../libs/graphql";
import type { TheOwnerProfileProps } from "../components/TheOwnerProfile/TheOwnerProfile";

type MyPageProps = {
  skipProfileReadme: boolean;
};

function normalizeTab(tab: string): TheOwnerProfileProps["tab"] {
  if (tab === "repositories") {
    return tab;
  }
  return "default";
}

// necessary typeguard as query.owner is of type string | string[]
const parseQuery: ParseQuery<{ tab: TheOwnerProfileProps["tab"] }> = (
  query
) => {
  const { owner, tab, ...searchUrlParams } = query;
  return {
    owner: typeof owner === "string" ? owner : "",
    tab: normalizeTab(tab as string),
    ...searchUrlParams,
  };
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const { owner, tab, ...searchUrlParams } = parseQuery(context.query);
  const baseProps: MyPageProps = {
    skipProfileReadme: tab === "repositories",
  };
  // bug specific in development
  if (
    process.env.NODE_ENV === "development" &&
    (!owner || owner === "<no source>")
  ) {
    return {
      props: {
        ...baseProps,
      },
    };
  }
  // create a new ApolloClient instance on each request server-side
  const apolloClient = initializeApollo();
  let { skipProfileReadme } = baseProps;
  if (tab === "default") {
    await apolloClient.query<GetRepositoryOwnerWithPinnedItemsQuery>({
      query: GetRepositoryOwnerWithPinnedItemsDocument,
      variables: { owner },
    });
  } else {
    await apolloClient.query<GetRepositoryOwnerWithRepositoriesQuery>({
      query: GetRepositoryOwnerWithRepositoriesDocument,
      variables: {
        owner,
        ...getSearchRepoGraphqlVariables(owner, searchUrlParams),
      },
    });
  }
  // todo now we can do it in parallel
  if (!skipProfileReadme) {
    // if it errors, tell `useQuery` to skip it clientSide (otherwise the query will be played as there won't be anything in cache)
    try {
      await apolloClient.query<GetProfileReadmeQuery>({
        query: GetProfileReadmeDocument,
        variables: { owner },
        errorPolicy: "ignore",
      });
    } catch (e) {
      skipProfileReadme = true;
    }
  } else {
    skipProfileReadme = true;
  }
  // extract the cache from the Apollo client and inject it into the base state that will be serialized
  // this slice of state will be used client-side by `useApollo` in order to start from a populated cache
  return addApolloState(apolloClient, {
    props: {
      ...baseProps,
      skipProfileReadme,
    },
  });
};

export default function PageOwner({
  skipProfileReadme,
}: MyPageProps): JSX.Element {
  const router = useRouter();
  const { owner, tab, ...searchUrlParams } = parseQuery(router.query);
  return (
    <>
      <TheOwnerProfile
        owner={owner}
        tab={tab}
        skipProfileReadme={skipProfileReadme}
        searchUrlParams={searchUrlParams}
      />
    </>
  );
}
