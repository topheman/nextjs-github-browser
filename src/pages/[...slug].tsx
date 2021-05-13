import { useRouter } from "next/router";
import type { NextPageContext } from "next";

import { parseQuery } from "../utils";
import { initializeApollo, addApolloState } from "../libs/apollo-client";
import TheHeader from "../components/TheHeader";

export async function getServerSideProps({ query }: NextPageContext) {
  const parsedQuery = parseQuery(query);
  console.log(parsedQuery);
  const baseProps = {
    graphqlVariables: parsedQuery.variables,
    componentName: null,
  };
  if (parsedQuery) {
    const apolloClient = initializeApollo();
    const {
      fetchServerSideGraphQLQuery,
    } = require(`../components/${parsedQuery.componentName}`);
    /**
     * Fetch GraphQL query server-side then populate pageProps
     * in order that `useApollo` will initilize with this state
     */
    await fetchServerSideGraphQLQuery(apolloClient, {
      variables: parsedQuery.variables,
    });
    return addApolloState(apolloClient, {
      props: {
        ...baseProps,
        componentName: parsedQuery.componentName,
      },
    });
  }
  return {
    props: {
      ...baseProps,
    },
  };
}

const GenericHandler = (props) => {
  const {
    default: Component,
  } = require(`../components/${props.componentName}`);
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <TheHeader />
      <p>Route: /{((slug || []) as string[]).join("/")}</p>
      <Component {...props} />
    </>
  );
};

export default GenericHandler;
