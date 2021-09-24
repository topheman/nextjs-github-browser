/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { NextWindowType } from "../types";
import {
  Repository,
  SearchRepositoriesQueryResult,
} from "../../src/libs/graphql";

type NavigationInfosType = {
  firstRepoInfos: Repository;
  graphqlVariables: {
    query: string;
    after?: string;
    before?: string;
    first?: number;
  };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      clientRepositoryPaginationNavigate: typeof clientRepositoryPaginationNavigate;
    }
  }
}

function ssrAssertDefaultpage() {
  cy.visit("/topheman?tab=repositories");
  cy.url().should(
    "eq",
    `${Cypress.config().baseUrl}/topheman?tab=repositories`
  );
  cy.window().then((win: NextWindowType) => {
    const searchPayload =
      win?.__NEXT_DATA__.props.pageProps.__APOLLO_STATE__.ROOT_QUERY?.[
        'search({"first":30,"query":"user:topheman sort:updated-desc fork:true","type":"REPOSITORY"})'
      ];
    expect(searchPayload.edges).to.have.length(30);
    const firstRepoInfos = searchPayload.edges[0].node as Repository;
    cy.findByText(firstRepoInfos.name).should("exist");
    cy.get("[data-testid=repository-list] > li").should("have.length", 30);
  });
}

function clientRepositoryPaginationNavigate(
  action: {
    direction?: "next" | "previous";
    query?: string;
    type?: string;
    sort?: string;
  },
  isCached = false,
  key: string,
  requestAssertion?: (variable: Record<string, unknown>) => void
): void {
  // click Previous or Next according to direction
  if (action.direction) {
    cy.get(
      `[data-testid=search-pagination-top] [data-${
        action.direction === "previous" ? "start" : "end"
      }-cursor]`
    ).click();
  }
  if (!isCached) {
    cy.get(
      "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
    ).should("be.visible");
  } else {
    cy.get(
      "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
    ).should("not.exist");
  }
  if (!isCached) {
    cy.wait("@graphql").then((result) => {
      const graphqlVariables = result.request.body
        .variables as NavigationInfosType["graphqlVariables"];
      // run the callback passed if a custom assertion is needed to be done on the graphqlVariables
      requestAssertion(graphqlVariables);
      const body = (result.response
        .body as unknown) as SearchRepositoriesQueryResult;
      expect(body.data.searchRepos.edges).to.have.lengthOf.above(0);
      const firstRepoInfos = body.data.searchRepos.edges[0].node as Repository;
      // ensure the loading spinner is not here anymore (the request is done)
      cy.get(
        "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
      ).should("not.exist");
      // check the render is up to date with the data passed
      cy.findByText(firstRepoInfos.name).should("exist");
      // check the url is up to date
      const { after, before } = graphqlVariables;
      if (after) {
        cy.url().should("contain", `after=${after}`);
      }
      if (before) {
        cy.url().should("contain", `before=${before}`);
      }
      // store the data from the request intercepted to do the checks in apollo cached mode
      cy.wrap({ firstRepoInfos, graphqlVariables }).as(key);
    });
  } else {
    // apollo cached mode
    cy.get(`@${key}`).then((infos) => {
      cy.findByText(
        ((infos as unknown) as NavigationInfosType).firstRepoInfos.name
      ).should("exist");
      const {
        after,
        before,
      } = ((infos as unknown) as NavigationInfosType).graphqlVariables;
      if (after) {
        cy.url().should("contain", `after=${after}`);
      }
      if (before) {
        cy.url().should("contain", `before=${before}`);
      }
    });
  }
}

Cypress.Commands.add(
  "clientRepositoryPaginationNavigate",
  clientRepositoryPaginationNavigate
);

describe("useSearchRepos", () => {
  describe("/[owner]?tab=repositories", () => {
    it("[SSR] should correctly render /topheman?tab=repositories", () => {
      ssrAssertDefaultpage();
    });
    it("[Client] should correctly use client-side pagination with apollo cache", () => {
      // todo check Pagination infos when component done (total found, etc ...)
      ssrAssertDefaultpage();
      cy.intercept("/api/github/graphql").as("graphql");
      // without hitting cache
      cy.clientRepositoryPaginationNavigate(
        { direction: "next" },
        false,
        "all|last-updated|page2-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "next" },
        false,
        "all|last-updated|page3-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "previous" },
        false,
        "all|last-updated|page2-with-before",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "previous" },
        false,
        "all|last-updated|page1-with-before",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      // hitting cache
      cy.clientRepositoryPaginationNavigate(
        { direction: "next" },
        true,
        "all|last-updated|page2-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "next" },
        true,
        "all|last-updated|page3-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "previous" },
        true,
        "all|last-updated|page2-with-before"
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "previous" },
        true,
        "all|last-updated|page1-with-before"
      );
    });
  });
});
