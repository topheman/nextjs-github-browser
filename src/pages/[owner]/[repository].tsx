import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import {
  parseQuery,
  getRepositoryVariables,
} from "../../utils/github/repository";
import { initializeApollo, addApolloState } from "../../libs/apollo-client";
import {
  useGetRepositoryInfosOverviewQuery,
  GetRepositoryInfosOverviewQuery,
  GetRepositoryInfosOverviewDocument,
} from "../../libs/graphql";
import AppProfileLayout from "../../components/AppProfileLayout/AppProfileLayout";

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const { owner, repository } = parseQuery(context.query);
  const apolloClient = initializeApollo();
  await apolloClient.query<GetRepositoryInfosOverviewQuery>({
    query: GetRepositoryInfosOverviewDocument,
    variables: getRepositoryVariables({ owner, repository }),
  });
  return addApolloState(apolloClient, {
    props: {
      owner,
      repository,
    },
  });
};

export default function PageRepository({
  owner,
  repository,
}: {
  owner: string;
  repository: string;
}): JSX.Element | null {
  const repositoryResult = useGetRepositoryInfosOverviewQuery({
    variables: getRepositoryVariables({ owner, repository }),
  });
  if (repositoryResult.data && repositoryResult.data.repository) {
    return (
      <AppProfileLayout>
        {() => ({
          topNav: <div>TOP NAV</div>,
          nav: <div>nav bar</div>,
          main: <div>Main</div>,
          sidebar: <div>side bar</div>,
        })}
      </AppProfileLayout>
    );
  }
  return null;
}
