// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

export {};

describe("test", () => {
  const mocks = [];
  before(() => {
    cy.task("loadMock", [
      "GetRepositoryOwnerWithRepositories",
      {
        owner: "topheman",
        first: 30,
        query: "user:topheman sort:updated-desc fork:true",
      },
    ]).then((result) => {
      mocks.push(result);
    });
  });
  it("displays home page", () => {
    console.log(mocks);
    cy.log("cursor", mocks[0].data.searchRepos.edges[0].cursor);
    cy.log("decodedCursor", atob(mocks[0].data.searchRepos.edges[0].cursor));
    cy.log("repositoryName", mocks[0].data.searchRepos.edges[0].node.name);
    cy.visit("/");
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get("main").should("have.length", 1);
    cy.url().should("eq", "http://localhost:3000/");
    expect("toto").to.be.equal("toto");
    cy.get("main").within(() => {
      cy.findByText("nextjs-github-browser").should("exist");
    });
  });
});
