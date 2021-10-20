describe("user/repositories", () => {
  describe("/[owner]?tab=repositories", () => {
    it("[SSR] should correctly render /topheman?tab=repositories", () => {
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
    });
    it("[Client] should correctly use client-side pagination with apollo cache", () => {
      // todo check Pagination infos when component done (total found, etc ...)
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
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
    it("[Client] should reset pagination when changing type", () => {
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
      cy.intercept("/api/github/graphql").as("graphql");
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
        { type: "source" },
        false,
        "source|last-updated|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:false") // <-
      );
    });
    it("[Client] should reset pagination when changing sort", () => {
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
      cy.intercept("/api/github/graphql").as("graphql");
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
        { sort: "name" },
        false,
        "all|name|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:name-asc fork:true") // <-
      );
    });
    it("[Client] should reset pagination when changing query", () => {
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
      cy.intercept("/api/github/graphql").as("graphql");
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
        { query: "react" },
        false,
        "all|last-updated|page1-with-after|q=react",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true react") // <-
      );
    });
    it("[Client] should load default page when clicking on Repositories tab", () => {
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
      cy.intercept("/api/github/graphql").as("graphql");
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
        {
          custom: () => {
            cy.get("[href='/topheman?tab=repositories']").first().click();
          },
        },
        true,
        "all|last-updated|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:true") // <-
      );
    });
    it("[Client] should not break back button", () => {
      // fill the history
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
      cy.intercept("/api/github/graphql").as("graphql");
      cy.get("[href='/topheman']").first().click();
      cy.waitBetweenNavigation();
      cy.url().should("eq", `${Cypress.config().baseUrl}/topheman`);
      cy.get("[href='/topheman?tab=repositories']").first().click();
      cy.waitBetweenNavigation();
      cy.url().should(
        "contain",
        `${Cypress.config().baseUrl}/topheman?tab=repositories`
      );
      cy.get("[href='/topheman']").first().click();
      cy.waitBetweenNavigation();
      cy.url().should("eq", `${Cypress.config().baseUrl}/topheman`);
      cy.get("[href='/topheman?tab=repositories']").first().click();
      cy.waitBetweenNavigation();
      cy.url().should(
        "contain",
        `${Cypress.config().baseUrl}/topheman?tab=repositories`
      );
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
        { type: "source" },
        false,
        "source|last-updated|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:false")
      );
      cy.clientRepositoryPaginationNavigate(
        { direction: "next" },
        false,
        "source|last-updated|page2-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:false")
      );
      cy.clientRepositoryPaginationNavigate(
        { type: "fork" },
        false,
        "fork|last-updated|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:only")
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "source|last-updated|page2-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "source|last-updated|page1-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page3-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page2-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page1-with-after"
      );
      cy.go("back");
      cy.waitBetweenNavigation();
      cy.url().should("eq", `${Cypress.config().baseUrl}/topheman`);
      cy.go("back");
      cy.waitBetweenNavigation();
      cy.url().should(
        "contain",
        `${Cypress.config().baseUrl}/topheman?tab=repositories`
      );
      cy.location();
    });
    it("[Client] should not break forward button", () => {
      // fill the history
      cy.clientRepositoryAssertDefaultPage(
        "/topheman?tab=repositories",
        "topheman"
      );
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
        { type: "source" },
        false,
        "source|last-updated|page1-with-after",
        ({ query }) =>
          expect(query).to.eq("user:topheman sort:updated-desc fork:false")
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page3-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("back");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page2-with-after"
      );
      // unfortunately, cypress seems not to be able to do more than 2 cy.go('forward')
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("forward");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "all|last-updated|page3-with-after"
      );
      cy.clientRepositoryPaginationNavigate(
        {
          custom: () => {
            cy.go("forward");
            cy.waitBetweenNavigation();
          },
        },
        true,
        "source|last-updated|page1-with-after"
      );
      cy.location();
    });
  });
});
