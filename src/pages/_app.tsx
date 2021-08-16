import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apollo-client";
import { parseBooleanEnvVar } from "../../utils";
import type { PageProps } from "../types";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "github-markdown-css";
import TheHeader from "../components/TheHeader/TheHeader";

if (parseBooleanEnvVar(process.env.NEXT_PUBLIC_API_MOCKS_ENABLED, false)) {
  // eslint-disable-next-line no-console
  console.log("Mocks enabled");
  // eslint-disable-next-line global-require
  require("../mocks");
}

function MyApp({
  Component,
  pageProps,
}: {
  Component:
    | React.FunctionComponent<PageProps>
    | React.ComponentClass<PageProps>;
  pageProps: PageProps;
}): JSX.Element {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <TheHeader />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
