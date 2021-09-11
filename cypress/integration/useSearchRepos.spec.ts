/* eslint-disable no-underscore-dangle */
import { NextWindowType } from "../types";
import { Repository } from "../../src/libs/graphql";

describe("useSearchRepos", () => {
  describe("/[owner]?tab=repositories", () => {
    it("[SSR] should correctly render /topheman?tab=repositories", () => {
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
    });
  });
});
