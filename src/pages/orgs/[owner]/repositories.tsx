import { useRouter } from "next/router";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import type { ParseQuery } from "../../../types";
import { initializeApollo, addApolloState } from "../../../libs/apollo-client";
import { getSearchRepoGraphqlVariables } from "../../../utils/github";
import {
  GetOrganizationWithRepositoriesQuery,
  GetOrganizationWithRepositoriesDocument,
  useGetOrganizationWithRepositoriesQuery,
  Organization,
} from "../../../libs/graphql";
import AppProfileLayout from "../../../components/AppProfileLayout/AppProfileLayout";
import AppProfileNavTab from "../../../components/AppProfileNavTab/AppProfileNavTab";
import AppProfileRepositories from "../../../components/AppProfileRepositories/AppProfileRepositories";
import AppOrganizationCardMini from "../../../components/AppOrganizationCardMini/AppOrganizationCardMini";

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
    <AppProfileLayout>
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
        main: <AppProfileRepositories />,
      })}
    </AppProfileLayout>
  );
}
