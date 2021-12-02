import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import NextNprogress from "nextjs-progressbar";
import { useApollo } from "../libs/apollo-client";

import "tailwindcss/tailwind.css";
import "react-toggle/style.css";
import "../styles/globals.css";
import "github-markdown-css";
import TheHeader from "../components/TheHeader/TheHeader";
import TheFooter from "../components/TheFooter/TheFooter";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <NextNprogress color="#ffcdcd" />
      <TheHeader />
      <Component {...pageProps} />
      <TheFooter
        fromFullYear={2021}
        toFullYear={new Date().getFullYear()}
        className="pt-5 pb-6 mx-auto mt-9 max-w-screen-xl border-t border-light"
      />
    </ApolloProvider>
  );
}

export default MyApp;
