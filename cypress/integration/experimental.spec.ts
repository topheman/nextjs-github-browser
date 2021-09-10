/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/**
 * These tests will only run if you pass the flag `CYPRESS_EXPERIMENTAL=true`
 */

export {};

(Cypress.env("EXPERIMENTAL") ? describe : describe.skip)(
  `experimental(${
    Cypress.env("EXPERIMENTAL")
      ? "run"
      : "skipped - pass CYPRESS_EXPERIMENTAL=true flag to run"
  })`,
  () => {
    describe("loadMock", () => {
      before(function () {
        cy.task("loadMock", [
          "GetRepositoryOwnerWithRepositories",
          {
            owner: "topheman",
            first: 30,
            query: "user:topheman sort:updated-desc fork:true",
          },
        ]).then((result) => {
          this.loadedMock = result;
        });
      });
      it(`cy.task("loadMock") should correctly loadMock`, function () {
        expect(this.loadedMock).not.to.be.undefined;
        expect(this.loadedMock.data).not.to.be.undefined;
      });
    });
  }
);
