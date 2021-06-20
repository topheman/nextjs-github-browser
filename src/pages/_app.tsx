import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apollo-client";
import { parseBooleanEnvVar } from "../../utils";
import type { PageProps } from "../types";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import TheHeader from "../components/TheHeader/TheHeader";

if (parseBooleanEnvVar(process.env.NEXT_PUBLIC_API_MOCKS_ENABLED, false)) {
  // eslint-disable-next-line no-console
  console.log(
    "Mocks can't be enabled for the moment on NextJS due to : https://github.com/mswjs/msw/issues/642"
  );
  // require("../mocks");
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
      <div className="mx-auto max-w-screen-xl">
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
