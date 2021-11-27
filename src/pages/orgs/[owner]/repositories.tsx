import { useRouter } from "next/router";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import type { ParseQuery } from "../../../types";
import { initializeApollo, addApolloState } from "../../../libs/apollo-client";
import { getSearchRepoGraphqlVariables } from "../../../utils/github/searchRepos";
import {
  GetOrganizationWithRepositoriesQuery,
  GetOrganizationWithRepositoriesDocument,
  useGetOrganizationWithRepositoriesQuery,
  Organization,
} from "../../../libs/graphql";
import AppMainLayout from "../../../components/AppMainLayout/AppMainLayout";
import AppProfileNavTab from "../../../components/AppNavBarProfile/AppNavBarProfile";
import AppProfileRepositories from "../../../components/AppProfileRepositories/AppProfileRepositories";
import AppOrganizationCardMini from "../../../components/AppOrganizationCardMini/AppOrganizationCardMini";
import { addHttpCacheHeader } from "../../../utils/server";

// necessary typeguard as query.owner is of type string | string[]
const parseQuery: ParseQuery<unknown> = (query) => {
  const { owner, ...searchUrlParams } = query;
  return {
    owner: typeof owner === "string" ? owner : "",
    ...searchUrlParams,
  };
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  addHttpCacheHeader(context.res);
  const { owner, ...searchUrlParams } = parseQuery(context.query);
  // create a new ApolloClient instance on each request server-side
  const apolloClient = initializeApollo();
  await apolloClient.query<GetOrganizationWithRepositoriesQuery>({
    query: GetOrganizationWithRepositoriesDocument,
    variables: {
      owner,
      ...getSearchRepoGraphqlVariables(owner, searchUrlParams),
    },
  });
  return addApolloState(apolloClient, { props: {} });
};

export default function PageOrganizationRepositories(): JSX.Element {
  const router = useRouter();
  const { owner, ...searchUrlParams } = parseQuery(router.query);
  const result = useGetOrganizationWithRepositoriesQuery({
    variables: {
      owner,
      ...getSearchRepoGraphqlVariables(owner, searchUrlParams),
    },
  });
  return (
    <AppMainLayout>
      {() => ({
        topNav: result.data?.repositoryOwner ? (
          <AppOrganizationCardMini
            organisation={result.data?.repositoryOwner as Organization}
          />
        ) : null,
        nav: (
          <AppProfileNavTab
            owner={owner}
            currentTab="repositories"
            reposTotalCount={result.data?.searchRepos.repositoryCount}
            mode="organization"
          />
        ),
        main: <AppProfileRepositories mode="organization" />,
      })}
    </AppMainLayout>
  );
}
