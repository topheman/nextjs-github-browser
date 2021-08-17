import fetch from "cross-fetch";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

export const GRAPHQL_URI = "http://localhost:3000/api/github/graphql";

const makeApolloClient = () =>
  new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: GRAPHQL_URI,
      credentials: "same-origin",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

export const makeApolloProviderWrapper: () => React.FunctionComponent<{
  children: React.ReactChild | React.ReactChild[];
  // eslint-disable-next-line react/display-name
}> = () => ({ children }): JSX.Element => {
  return (
    <ApolloProvider client={makeApolloClient()}>{children}</ApolloProvider>
  );
};
