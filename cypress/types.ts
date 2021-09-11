export type NextWindowType = Cypress.AUTWindow & {
  __NEXT_DATA__: {
    props: {
      pageProps: {
        __APOLLO_STATE__: Record<string, unknown>;
      };
    };
  };
};
