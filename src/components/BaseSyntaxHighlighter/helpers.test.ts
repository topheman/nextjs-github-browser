import { getLanguageFromFilename } from "./helpers";

describe("components/BaseSyntaxHighlighter/helpers", () => {
  describe("getLanguageFromFilename", () => {
    it("should match an extension if a known language is declared in mapping", () => {
      expect(getLanguageFromFilename("common.js")).toBe("javascript");
    });
    it("should return null if extension is not declared in mapping", () => {
      expect(getLanguageFromFilename("common.unknown")).toBeNull();
    });
    it("should match Makefile to makefile (extension less files)", () => {
      expect(getLanguageFromFilename("Makefile")).toBe("makefile");
    });
  });
});
