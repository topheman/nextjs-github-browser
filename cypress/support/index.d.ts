/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clientRepositoryAssertDefaultPage(url: string, login: string);
    clientRepositoryPaginationNavigate(
      action: {
        direction?: "next" | "previous";
        query?: string;
        type?: "all" | "source" | "fork" | "archived" | "mirror";
        sort?: "last-updated" | "name" | "stargazers";
        custom?: () => void;
      },
      isCached: boolean,
      key: string,
      requestAssertion?: (variable: Record<string, unknown>) => void
    );
    waitBetweenNavigation();
  }
}
