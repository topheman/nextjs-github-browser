import { useRouter } from "next/router";
import type { NextPageContext } from "next";
import { gql, useQuery } from "@apollo/client";
import type { ApolloClient, ApolloQueryResult } from "@apollo/client";

import { initializeApollo, addApolloState } from "../libs/apollo-client";
import TheHeader from "../components/TheHeader";

function extractInfosFromQuery(query: NextPageContext["query"]) {
  const { slug } = query;
  if (slug && slug.length === 1) {
    return {
      renderingMode: "USER",
      graphqlQuery: "GetFullUser",
      graphqlVariables: {
        login: slug[0],
      },
    };
  }
  return null;
}

const SIMPLE_USER_QUERY = gql`
  query GetSimpleUser($login: String!) {
    user(login: $login) {
      websiteUrl
    }
  }
`;

const SIMPLE_ORGANIZATION_QUERY = gql`
  query GetSimpleOrganization($login: String!) {
    organization(login: $login) {
      websiteUrl
    }
  }
`;

async function retrieveUserOrOrganization(client: ApolloClient<any>, login) {
  const userQuery = {
    query: SIMPLE_USER_QUERY,
    variables: {
      login,
    },
  };
  const organizationQuery = {
    query: SIMPLE_ORGANIZATION_QUERY,
    variables: {
      login,
    },
  };
  const allResults = await Promise.allSettled([
    client.query(userQuery),
    client.query(organizationQuery),
  ]);
  const successResults = allResults
    .filter((result) => result.status === "fulfilled" && result.value)
    .map(
      (result) =>
        (result as PromiseFulfilledResult<ApolloQueryResult<any>>).value.data
    );
  if (successResults.length === 0) {
    throw new Error(`No User nor Organization found for "${login}"`);
  }
  return successResults[0] || {};
}

export async function getServerSideProps({ query }: NextPageContext) {
  const apolloClient = initializeApollo();
  const preparedInfos = extractInfosFromQuery(query);
  if (preparedInfos) {
    const result = await retrieveUserOrOrganization(
      apolloClient,
      preparedInfos.graphqlVariables.login
    );
    console.log("getServerSideProps", {
      user: result.user || null,
      organization: result.organization || null,
    });
    return addApolloState(apolloClient, {
      props: {
        user: result.user
          ? {
              login: preparedInfos.graphqlVariables.login,
            }
          : null,
        organization: result.organization
          ? {
              login: preparedInfos.graphqlVariables.login,
            }
          : null,
      },
    });
  }
  console.log("getServerSideProps", {
    user: null,
    organization: null,
  });
  return {
    props: {
      user: null,
      organization: null,
    },
  };
}

const GenericHandler = (props) => {
  console.log("page render", props);
  const { user, organization } = props;
  const userResult = useQuery(SIMPLE_USER_QUERY, {
    variables: {
      login: props.user?.login,
    },
  });
  console.log(userResult);
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <TheHeader />
      <p>Route: /{((slug || []) as string[]).join("/")}</p>
      {userResult?.data?.user && (
        <div className="bg-red-100">
          <p>{userResult?.data.user?.websiteUrl}</p>
        </div>
      )}
    </>
  );
};

export default GenericHandler;
