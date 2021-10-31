import { formatUrl } from "./string";

describe("utils/string", () => {
  describe("formatUrl", () => {
    it("should remove http(s)://", () => {
      expect(formatUrl("http://example.com")).toBe("example.com");
      expect(formatUrl("https://example.com")).toBe("example.com");
    });
  });
});

export default {};
