import type { GetServerSideProps, GetServerSidePropsResult } from "next";

import {
  parseQuery,
  getRepositoryVariables,
  resolveCurrentRef,
} from "../../../../utils/github/repository";
import {
  initializeApollo,
  addApolloState,
} from "../../../../libs/apollo-client";
import {
  useGetRepositoryInfosBlobQuery,
  GetRepositoryInfosBlobQuery,
  GetRepositoryInfosBlobDocument,
  Blob,
} from "../../../../libs/graphql";
import BaseMetaTags, {
  commonMetaTagsExtractProps,
} from "../../../../components/BaseMetaTags/BaseMetaTags";
import AppMainLayout from "../../../../components/AppMainLayout/AppMainLayout";
import AppNavBarRepository from "../../../../components/AppNavBarRepository/AppNavBarRepository";
import AppRepositoryHeader from "../../../../components/AppRepositoryHeader/AppRepositoryHeader";
import AppRepositoryMainHeader from "../../../../components/AppRepositoryMainHeader/AppRepositoryMainHeader";
import AppNotFound from "../../../../components/AppNotFound/AppNotFound";
import AppBlobDisplay from "../../../../components/AppBlobDisplay/AppBlobDisplay";
import { addHttpCacheHeader } from "../../../../utils/server";

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
  addHttpCacheHeader(context.res);
  const { owner, repositoryName, branchName, path } = parseQuery(
    context.query
  ) as {
    owner: string;
    repositoryName: string;
    branchName: string;
    path: string;
  };
  const apolloClient = initializeApollo();
  const graphqlVariables = getRepositoryVariables({
    owner,
    repositoryName,
    branchName,
    path,
  });
  try {
    await apolloClient.query<GetRepositoryInfosBlobQuery>({
      query: GetRepositoryInfosBlobDocument,
      variables: graphqlVariables,
    });
  } catch (e) {
    return { props: { notFound: true } };
  }
  const resultProps: PageProps = {
    owner,
    repositoryName,
    notFound: false,
    branchName,
    path,
  };
  return addApolloState(apolloClient, {
    props: resultProps,
  });
};

type PageProps = {
  owner: string;
  repositoryName: string;
  branchName: string;
  path: string;
  notFound: boolean;
};

export default function PageRepositoryBlob({
  owner,
  repositoryName,
  branchName,
  path,
  notFound,
}: PageProps): JSX.Element | null {
  const variables = getRepositoryVariables({
    owner,
    repositoryName,
    branchName,
    path,
  }) as {
    owner: string;
    name: string;
    ref: string;
    refPath: string;
    path: string;
  };
  const repositoryResult = useGetRepositoryInfosBlobQuery({
    variables,
  });
  if (notFound) {
    return <AppNotFound type="repository" className="mx-auto max-w-lg" />;
  }
  if (repositoryResult.data && repositoryResult.data.repository) {
    const metaTagsProps = commonMetaTagsExtractProps({
      pathname: path,
    });
    const resolvedCurrentRef = resolveCurrentRef({
      currentRef: repositoryResult.data.repository.currentRef as {
        name: string;
        prefix: "refs/heads/" | "refs/tags/";
      },
      defaultBranchName: repositoryResult.data.repository.defaultBranchRef
        ?.name as string,
    });
    return (
      <>
        <BaseMetaTags
          {...metaTagsProps}
          description={repositoryResult.data.repository.description}
          image={repositoryResult.data.repository.openGraphImageUrl}
          title={`${metaTagsProps.siteName} - ${repositoryResult.data.repository.nameWithOwner}`}
          twitterCard="summary_large_image"
          type="object"
        />
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
              <>
                <AppRepositoryMainHeader
                  repository={repositoryResult.data?.repository}
                  currentPath={path}
                  currentRef={resolvedCurrentRef}
                />
                {repositoryResult.data?.repository?.file ? (
                  <AppBlobDisplay
                    code={
                      (repositoryResult.data?.repository?.file as Blob).text ||
                      ""
                    }
                    fileName={path}
                    byteSize={
                      (repositoryResult.data?.repository?.file as Blob).byteSize
                    }
                    rawHref={{
                      pathname: `/${repositoryResult.data?.repository.nameWithOwner}/raw/${branchName}`,
                      query: {
                        path,
                      },
                    }}
                    className="mt-2"
                  />
                ) : (
                  <div>File not found</div>
                )}
              </>
            ),
          })}
        </AppMainLayout>
      </>
    );
  }
  return null;
}
