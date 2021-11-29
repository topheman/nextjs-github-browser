export {};

describe("repository", () => {
  describe("AppGitRefSwitch", () => {
    it("Default branch should be checked", () => {
      cy.visit("/topheman/docker-experiments");
      cy.get("button[label=master]").click();
      cy.get(
        "a[href='/topheman/docker-experiments/tree/master'][aria-checked=true]"
      ).should("exist");
      cy.get("a[href='/topheman/docker-experiments/tree/develop']").should(
        "exist"
      );
    });
    it("Changing path should adjust", () => {
      cy.visit("/topheman/docker-experiments");
      cy.get("[role=grid]").findByRole("link", { name: "api" }).click();
      cy.url().should(
        "eq",
        `${
          Cypress.config().baseUrl
        }/topheman/docker-experiments/tree/master?path=api`
      );
      cy.get("button[label=master]").click();
      cy.get(
        "a[href='/topheman/docker-experiments/tree/master?path=api'][aria-checked=true]"
      ).should("exist");
      cy.get(
        "a[href='/topheman/docker-experiments/tree/develop?path=api']"
      ).should("exist");
    });
    it("Changing branch should adjust", () => {
      cy.visit("/topheman/docker-experiments");
      cy.get("button[label=master]").click();
      cy.get("a[href='/topheman/docker-experiments/tree/develop']").click();
      cy.url().should(
        "eq",
        `${Cypress.config().baseUrl}/topheman/docker-experiments/tree/develop`
      );
      cy.get("button[label=develop]").should("exist");
      cy.get("a[href='/topheman/docker-experiments/tree/master']").should(
        "exist"
      );
      cy.get(
        "a[href='/topheman/docker-experiments/tree/develop'][aria-checked=true]"
      ).should("exist");
    });
    it("Changing path to blob should also adjust", () => {
      cy.visit("/topheman/docker-experiments");
      cy.get("[role=grid]").findByRole("link", { name: "api" }).click();
      cy.url().should(
        "eq",
        `${
          Cypress.config().baseUrl
        }/topheman/docker-experiments/tree/master?path=api`
      );
      cy.get("[role=grid]").findByRole("link", { name: "README.md" }).click();
      cy.url().should(
        "eq",
        `${
          Cypress.config().baseUrl
        }/topheman/docker-experiments/blob/master?path=api%2FREADME.md`
      );
      cy.get("button[label=master]").click();
      cy.get(
        "a[href='/topheman/docker-experiments/blob/master?path=api%2FREADME.md'][aria-checked=true]"
      ).should("exist");
      cy.get(
        "a[href='/topheman/docker-experiments/blob/develop?path=api%2FREADME.md']"
      ).should("exist");
    });
  });
});
