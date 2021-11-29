export {};

describe("misc", () => {
  it("[Home] search input should land you to a user page", () => {
    cy.visit("/");
    cy.findByPlaceholderText("Type a username ...").type("topheman{enter}");
    cy.url().should("eq", `${Cypress.config().baseUrl}/topheman`);
  });
});
