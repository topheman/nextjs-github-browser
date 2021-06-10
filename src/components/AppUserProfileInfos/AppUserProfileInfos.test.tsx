const identity = <T extends unknown>(i: T) => i;

describe("AppUserProfileInfos", () => {
  it("fake test", () => {
    const trueBolean = identity(true);
    expect(trueBolean).toBe(true);
  });
});
export {};
