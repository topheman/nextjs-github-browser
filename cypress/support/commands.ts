/* eslint-disable no-underscore-dangle */
import {
  Repository,
  SearchRepositoriesQueryResult,
} from "../../src/libs/graphql";

import { NextWindowType } from "../types";

function dataTestidRepositoryName(name) {
  return `repository-item-link:${name}`;
}

Cypress.Commands.add(
  "clientRepositoryAssertDefaultPage",
  (url: string, login: string) => {
    cy.visit(url);
    cy.url().should("eq", `${Cypress.config().baseUrl}${url}`);
    cy.window().then((win: NextWindowType) => {
      const searchPayload =
        win?.__NEXT_DATA__.props.pageProps.__APOLLO_STATE__.ROOT_QUERY?.[
          `search({"first":30,"query":"user:${login} sort:updated-desc fork:true","type":"REPOSITORY"})`
        ];
      expect(searchPayload.edges).to.have.length(30);
      const firstRepoInfos = searchPayload.edges[0].node as Repository;
      cy.findByTestId(dataTestidRepositoryName(firstRepoInfos.name)).should(
        "exist"
      ); // todo don't use findByText - use dataTestid
      cy.get("[data-testid=repository-list] > li").should("have.length", 30);
      cy.wrap({
        firstRepoInfos,
        graphqlVariables: {
          query: `user:${login} sort:updated-desc fork:true`,
        },
      }).as("all|last-updated|page1-with-after");
    });
  }
);

export type NavigationInfosType = {
  firstRepoInfos: Repository;
  graphqlVariables: {
    query: string;
    after?: string;
    before?: string;
    first?: number;
  };
};

function clientRepositoryPaginationNavigate(
  action: {
    direction?: "next" | "previous";
    query?: string;
    type?: "all" | "source" | "fork" | "archived" | "mirror";
    sort?: "last-updated" | "name" | "stargazers";
    custom?: () => void;
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
  if (action.type) {
    const typeTextMapping = {
      all: "All",
      source: "Sources",
      fork: "Forks",
      archived: "Archived",
      mirror: "Mirrors",
    };
    cy.findByText("Type").click();
    cy.findByText(typeTextMapping[action.type]).click();
  }
  if (action.sort) {
    const typeTextMapping = {
      "last-updated": "Last updated",
      name: "Name",
      stargazers: "Stars",
    };
    cy.findByText("Sort").click();
    cy.findByText(typeTextMapping[action.sort]).click();
  }
  if (action.query) {
    cy.findByPlaceholderText("Find a repository...").type(action.query);
  }
  if (action.custom && typeof action.custom === "function") {
    action.custom();
  }
  if (!isCached) {
    // todo something wrong - some tests are failing, even if the spinner is visible
    // temporary commenting
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
      cy.findByTestId(dataTestidRepositoryName(firstRepoInfos.name)).should(
        "exist"
      );
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
      cy.findByTestId(
        dataTestidRepositoryName(
          ((infos as unknown) as NavigationInfosType).firstRepoInfos.name
        )
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

export type ClientRepositoryPaginationNavigateType = typeof clientRepositoryPaginationNavigate;

Cypress.Commands.add(
  "clientRepositoryPaginationNavigate",
  clientRepositoryPaginationNavigate
);

Cypress.Commands.add("waitBetweenNavigation", () => {
  const WAIT_BETWEEN_NAVIGATION = 100;
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(WAIT_BETWEEN_NAVIGATION);
});
