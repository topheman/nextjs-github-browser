import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

import type { ParseQuery } from "../types";
import { initializeApollo, addApolloState } from "../libs/apollo-client";
import TheHeader from "../components/TheHeader/TheHeader";
import TheOwnerProfile, {
  REPOSITORY_OWNER_QUERY,
  PROFILE_README_QUERY,
} from "../components/TheOwnerProfile/TheOwnerProfile";

type MyPageProps = {
  skipProfileReadme: boolean;
};

// necessary typeguard as query.owner is of type string | string[]
const parseQuery: ParseQuery = (query) => ({
  owner: typeof query.owner === "string" ? query.owner : "",
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner } = parseQuery(context.query);
  const baseProps: MyPageProps = {
    skipProfileReadme: false,
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
  let skipProfileReadme = false;
  const repositoryOwnerResult = await apolloClient.query({
    query: REPOSITORY_OWNER_QUERY,
    variables: { owner },
  });
  // this query needs to be done conditionally (not to raise a "NOT FOUND" error) - organizations dont have README profiles
  if (repositoryOwnerResult.data.repositoryOwner.__typename === "User") {
    // if it errors, tell `useQuery` to skip it clientSide (otherwise the query will be played as there won't be anything in cache)
    try {
      await apolloClient.query({
        query: PROFILE_README_QUERY,
        variables: { owner },
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

export default function PageOwner({ skipProfileReadme }: MyPageProps) {
  const router = useRouter();
  const { owner } = parseQuery(router.query);
  return (
    <>
      <h1>Owner: "{owner}"</h1>
      <TheHeader />
      <TheOwnerProfile owner={owner} skipProfileReadme={skipProfileReadme} />
    </>
  );
}
