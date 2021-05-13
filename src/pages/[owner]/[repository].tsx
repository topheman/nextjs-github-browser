import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { gql, useQuery } from "@apollo/client";

import type { PageBaseProps } from "../../types";
import { initializeApollo, addApolloState } from "../../libs/apollo-client";
import TheHeader from "../../components/TheHeader";

const REPOSITORY_QUERY = gql`
  query GetSpecificRepo($owner: String!, $repository: String!) {
    repository(name: $repository, owner: $owner) {
      primaryLanguage {
        name
      }
      description
      owner {
        avatarUrl
      }
      forkCount
      stargazerCount
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner, repository } = context.query;
  const baseProps = {
    graphQLVariables: {
      owner,
      repository,
    },
  };
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: REPOSITORY_QUERY,
    variables: baseProps.graphQLVariables,
  });
  return addApolloState(apolloClient, {
    props: { ...baseProps },
  });
};

export default function PageRepository({
  graphQLVariables,
}: PageBaseProps<{}>) {
  const repositoryResult = useQuery(REPOSITORY_QUERY, {
    variables: graphQLVariables,
  });
  const router = useRouter();
  const { owner, repository } = router.query;
  return (
    <>
      <h1>
        Owner: "{owner}" / Repository: "{repository}"
      </h1>
      <TheHeader />
      <ul>
        <li>{repositoryResult?.data?.repository.description}</li>
        <li>{repositoryResult?.data?.repository.primaryLanguage.name}</li>
      </ul>
    </>
  );
}
