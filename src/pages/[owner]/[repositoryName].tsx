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
import AppMainLayout from "../../components/AppMainLayout/AppMainLayout";
import AppNavBarRepository from "../../components/AppNavBarRepository/AppNavBarRepository";
import AppRepositoryHeader from "../../components/AppRepositoryHeader/AppRepositoryHeader";
import AppRepositoryInfos from "../../components/AppRepositoryInfos/AppRepositoryInfos";
import AppRepositoryInfosAbout from "../../components/AppRepositoryInfosAbout/AppRepositoryInfosAbout";

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const { owner, repositoryName } = parseQuery(context.query);
  const apolloClient = initializeApollo();
  await apolloClient.query<GetRepositoryInfosOverviewQuery>({
    query: GetRepositoryInfosOverviewDocument,
    variables: getRepositoryVariables({ owner, repositoryName }),
  });
  return addApolloState(apolloClient, {
    props: {
      owner,
      repositoryName,
    },
  });
};

export default function PageRepository({
  owner,
  repositoryName,
}: {
  owner: string;
  repositoryName: string;
}): JSX.Element | null {
  const repositoryResult = useGetRepositoryInfosOverviewQuery({
    variables: getRepositoryVariables({ owner, repositoryName }),
  });
  if (repositoryResult.data && repositoryResult.data.repository) {
    return (
      <AppMainLayout reverse>
        {() => ({
          topNav: (
            <>
              <AppRepositoryHeader
                owner={owner}
                repositoryName={repositoryName}
                stargazerCount={
                  repositoryResult.data?.repository?.stargazerCount
                }
                forkCount={repositoryResult.data?.repository?.forkCount}
              />
              <AppRepositoryInfosAbout
                repository={repositoryResult.data?.repository}
                className="md:hidden mt-4 md:mt-0"
              />
            </>
          ),
          nav: (
            <AppNavBarRepository
              currentTab="code"
              owner={owner}
              repositoryName={repositoryName}
            />
          ),
          main: <div>Main</div>,
          sidebar: (
            <AppRepositoryInfos
              className=""
              repository={repositoryResult.data?.repository}
            />
          ),
        })}
      </AppMainLayout>
    );
  }
  return null;
}