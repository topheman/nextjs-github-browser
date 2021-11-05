import { resolveCurrentRef } from "./repository";

describe("utils/github/repository", () => {
  describe("resolveCurrentRef", () => {
    it("with currentRef = null and defaultBranchName = master", () => {
      expect(
        resolveCurrentRef({
          currentRef: null,
          defaultBranchName: "master",
        })
      ).toStrictEqual({ name: "master", prefix: "refs/heads/" });
    });
    it("with currentRef set a branch", () => {
      expect(
        resolveCurrentRef({
          currentRef: { name: "main", prefix: "refs/heads/" },
          defaultBranchName: "master",
        })
      ).toStrictEqual({ name: "main", prefix: "refs/heads/" });
    });
    it("with currentRef set a tag", () => {
      expect(
        resolveCurrentRef({
          currentRef: { name: "v1.0.0", prefix: "refs/tags/" },
          defaultBranchName: "master",
        })
      ).toStrictEqual({ name: "v1.0.0", prefix: "refs/tags/" });
    });
  });
});
