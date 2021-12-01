export {};

describe("misc", () => {
  it("[Home] search input should land you to a user page", () => {
    cy.visit("/");
    cy.findByPlaceholderText("Type a username ...").type("topheman{enter}");
    cy.url().should("eq", `${Cypress.config().baseUrl}/topheman`);
  });
  it('[Repository][Mobile] "View code" should be visible / file list should be hidden', () => {
    cy.viewport("iphone-8");
    cy.visit("/topheman/topheman");
    cy.findByTestId("app-files-file-list").should("not.be.visible");
    cy.findByTestId("app-files-view-code-button")
      .should("be.visible")
      .click()
      .should("not.be.visible");
    cy.findByTestId("app-files-file-list").should("be.visible");
  });
  it('[Repository][Desktop] "View code" should NOT be visible / file list should NOT be hidden', () => {
    cy.visit("/topheman/topheman");
    cy.findByTestId("app-files-file-list").should("be.visible");
    cy.findByTestId("app-files-view-code-button").should("not.be.visible");
  });
});
