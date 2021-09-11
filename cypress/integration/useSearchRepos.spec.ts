/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { NextWindowType } from "../types";
import {
  Repository,
  SearchRepositoriesQueryResult,
} from "../../src/libs/graphql";

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
  direction: "next" | "previous",
  isCached = false,
  key: string,
  requestAssertion?: (variable: Record<string, unknown>) => void
): void {
  // click Previous or Next according to direction
  cy.get(
    `[data-testid=search-pagination-top] [data-${
      direction === "previous" ? "start" : "end"
    }-cursor]`
  ).click();
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
      requestAssertion(result.request.body.variables);
      const body = (result.response
        .body as unknown) as SearchRepositoriesQueryResult;
      expect(body.data.searchRepos.edges).to.have.lengthOf.above(0);
      const firstRepoInfos = body.data.searchRepos.edges[0].node as Repository;
      cy.get(
        "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
      ).should("not.exist");
      cy.findByText(firstRepoInfos.name).should("exist");
      cy.wrap(firstRepoInfos).as(key);
    });
  } else {
    cy.get(`@${key}`).then((cachedFirstRepo) => {
      cy.findByText(((cachedFirstRepo as unknown) as Repository).name).should(
        "exist"
      );
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
        "next",
        false,
        "all|last-updated|page2-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        "next",
        false,
        "all|last-updated|page3-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        "previous",
        false,
        "all|last-updated|page2-with-before",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      cy.clientRepositoryPaginationNavigate(
        "previous",
        false,
        "all|last-updated|page1-with-before",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true")
      );
      // hitting cache
      cy.clientRepositoryPaginationNavigate(
        "next",
        true,
        "all|last-updated|page2-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        "next",
        true,
        "all|last-updated|page3-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        "previous",
        true,
        "all|last-updated|page2-with-before"
      );
      cy.clientRepositoryPaginationNavigate(
        "previous",
        true,
        "all|last-updated|page1-with-before"
      );
    });
  });
});
