import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import { parseQuery, getRepositoryVariables } from "../utils/github/repository";
import { initializeApollo, addApolloState } from "../libs/apollo-client";
import {
  useGetRepositoryInfosOverviewQuery,
  GetRepositoryInfosOverviewQuery,
  GetRepositoryInfosOverviewDocument,
} from "../libs/graphql";
import AppMainLayout from "../components/AppMainLayout/AppMainLayout";
import AppNavBarRepository from "../components/AppNavBarRepository/AppNavBarRepository";
import AppRepositoryHeader from "../components/AppRepositoryHeader/AppRepositoryHeader";
import AppRepositoryInfos from "../components/AppRepositoryInfos/AppRepositoryInfos";
import AppRepositoryInfosAbout from "../components/AppRepositoryInfosAbout/AppRepositoryInfosAbout";
import AppRepositoryOverview from "../components/AppRepositoryOverview/AppRepositoryOverview";

export const makeGetServerSideProps = (): GetServerSideProps => async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  const { owner, repositoryName, branchName, path } = parseQuery(context.query);
  const apolloClient = initializeApollo();
  await apolloClient.query<GetRepositoryInfosOverviewQuery>({
    query: GetRepositoryInfosOverviewDocument,
    variables: getRepositoryVariables({ owner, repositoryName, path }),
  });
  const resultProps: PageProps = {
    owner,
    repositoryName,
  };
  if (branchName) {
    resultProps.branchName = branchName;
  }
  if (path) {
    resultProps.path = path;
  }
  return addApolloState(apolloClient, {
    props: resultProps,
  });
};

type PageProps = {
  owner: string;
  repositoryName: string;
  // eslint-disable-next-line react/require-default-props
  branchName?: string;
  // eslint-disable-next-line react/require-default-props
  path?: string;
};

export const makePage = () => ({
  owner,
  repositoryName,
  branchName,
  path,
}: PageProps): JSX.Element | null => {
  const variables = getRepositoryVariables({
    owner,
    repositoryName,
    branchName,
    path,
  });
  const repositoryResult = useGetRepositoryInfosOverviewQuery({
    variables,
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
          main: (
            <AppRepositoryOverview
              repository={repositoryResult.data?.repository}
              currentPath={path}
            />
          ),
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
};
