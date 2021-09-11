/* eslint-disable no-underscore-dangle */
import { NextWindowType } from "../types";
import {
  Repository,
  SearchRepositoriesQueryResult,
} from "../../src/libs/graphql";

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

function clientAssertDefaultPageNavigation() {
  cy.url().should(
    "eq",
    `${Cypress.config().baseUrl}/topheman?tab=repositories`
  );
  cy.intercept("/api/github/graphql").as("graphql");
  cy.get("[data-testid=search-pagination-top] [data-end-cursor]").click();
  cy.get(
    "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
  ).should("be.visible");
  cy.wait("@graphql").then((result) => {
    const body = (result.response
      .body as unknown) as SearchRepositoriesQueryResult;
    expect(body.data.searchRepos.edges).to.have.length(30);
    const firstRepoInfos = body.data.searchRepos.edges[0].node as Repository;
    cy.get(
      "[data-testid=search-pagination-top] [data-testid=pagination-spinner]"
    ).should("not.exist");
    cy.findByText(firstRepoInfos.name).should("exist");
  });
}

describe("useSearchRepos", () => {
  describe("/[owner]?tab=repositories", () => {
    it("[SSR] should correctly render /topheman?tab=repositories", () => {
      ssrAssertDefaultpage();
    });
    it("[Client] should correctly use client-side pagination", () => {
      ssrAssertDefaultpage();
      clientAssertDefaultPageNavigation();
    });
  });
});
