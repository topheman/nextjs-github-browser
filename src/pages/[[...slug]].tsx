import { useRouter } from "next/router";
import type { NextPageContext } from "next";
import { ApolloQueryResult, gql } from "@apollo/client";

import apolloClient from "../libs/apollo-client";
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

async function retrieveUserOrOrganization(login) {
  const userQuery = {
    query: gql`
      query GetSimpleUser($login: String!) {
        user(login: $login) {
          websiteUrl
        }
      }
    `,
    variables: {
      login,
    },
  };
  const organizationQuery = {
    query: gql`
      query GetSimpleOrganization($login: String!) {
        organization(login: $login) {
          websiteUrl
        }
      }
    `,
    variables: {
      login,
    },
  };
  const allResults = await Promise.allSettled([
    apolloClient.query(userQuery),
    apolloClient.query(organizationQuery),
  ]);
  const [successResult] = allResults
    .filter((result) => result.status === "fulfilled" && result.value)
    .map(
      (result) =>
        (result as PromiseFulfilledResult<ApolloQueryResult<any>>).value.data
    );
  return successResult || {};
}

export async function getServerSideProps({ query }: NextPageContext) {
  const preparedInfos = extractInfosFromQuery(query);
  if (preparedInfos) {
    const result = await retrieveUserOrOrganization(
      preparedInfos.graphqlVariables.login
    );
    console.log("getServerSideProps", {
      user: result.user || null,
      organization: result.organization || null,
    });
    return {
      props: {
        user: result.user || null,
        organization: result.organization || null,
      },
    };
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
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <TheHeader />
      <p>Route: /{((slug || []) as string[]).join("/")}</p>
      {(user || organization) && (
        <div className="bg-red-100">
          <p>{(user || organization).websiteUrl}</p>
        </div>
      )}
    </>
  );
};

export default GenericHandler;
