import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";

import AppGitRefSwitch, { AppGitRefSwitchProps } from "./AppGitRefSwitch";

const makeBaseCase = (
  props: Partial<AppGitRefSwitchProps> = {}
): RenderResult & {
  getGitRefButton: () => HTMLElement;
} => {
  const baseProps: AppGitRefSwitchProps = {
    nameWithOwner: "topheman/npm-registry-browser",
    currentRef: {
      name: "master",
      prefix: "refs/heads/",
    },
    defaultBranchName: "master",
    branches: ["master", "develop"],
    tags: ["v0.0.1", "v0.0.2", "v1.0.0"],
    branchesTotalCount: 2,
    tagsTotalCount: 3,
    ...props,
  };
  const result = render(<AppGitRefSwitch {...baseProps} />);
  return {
    ...result,
    getGitRefButton: () =>
      result.getByRole("button", {
        name: baseProps.currentRef?.name || baseProps.defaultBranchName,
      }),
  };
};

describe("components/AppGitRefSwitch", () => {
  it("[Basic] should render", async () => {
    const { container } = makeBaseCase();
    expect(container).toBeVisible();
  });
  it("[Basic] should render currentRef (branch master) in button", () => {
    const { getByRole } = makeBaseCase();
    expect(getByRole("button", { name: "master" })).toBeVisible();
  });
  it("[Basic] should render branch list from props", async () => {
    const { getGitRefButton, getByRole } = makeBaseCase();
    await fireEvent.click(getGitRefButton());
    ["master default", "develop"].forEach((branchName) => {
      expect(getByRole("link", { name: branchName })).toBeVisible();
    });
  });
  it("[Basic] should render tag list from props", async () => {
    const { getGitRefButton, getByRole } = makeBaseCase();
    await fireEvent.click(getGitRefButton());
    await fireEvent.click(getByRole("tab", { name: "Tags" }));
    ["v0.0.1", "v0.0.2", "v1.0.0"].forEach((branchName) => {
      expect(getByRole("link", { name: branchName })).toBeVisible();
    });
  });
  it("should check currentRef", async () => {
    const { getGitRefButton, container } = makeBaseCase();
    await fireEvent.click(getGitRefButton());
    expect(
      container.querySelector(
        '[aria-checked="true"][href="/topheman/npm-registry-browser/tree/master"]'
      )
    ).toBeVisible();
  });
  it("should add currentRef to branch list if not present (and check it)", async () => {
    const { getGitRefButton, container } = makeBaseCase({
      currentRef: {
        name: "feature/my-branch",
        prefix: "refs/heads/",
      },
    });
    await fireEvent.click(getGitRefButton());
    expect(
      container.querySelector(
        '[aria-checked="true"][href="/topheman/npm-registry-browser/tree/feature/my-branch"]'
      )
    ).toBeVisible();
  });
  it('should show "more branches ..."', async () => {
    const { getGitRefButton, getByText } = makeBaseCase({
      branches: [
        ...Array(9)
          .fill(1)
          .map((_, i) => `feature/next-${i + 1}`),
      ],
      branchesTotalCount: 200,
    });
    await fireEvent.click(getGitRefButton());
    expect(getByText("190 more branches ...")).toBeVisible();
  });
  it('should show "more tags ..."', async () => {
    const { getGitRefButton, getByText, getByRole } = makeBaseCase({
      tags: [
        ...Array(10)
          .fill(1)
          .map((_, i) => `v${i + 1}.0.0`),
      ],
      tagsTotalCount: 200,
    });
    await fireEvent.click(getGitRefButton());
    await fireEvent.click(getByRole("tab", { name: "Tags" }));
    expect(getByText("190 more tags ...")).toBeVisible();
  });
  it("should accept path", async () => {
    const { getGitRefButton, container } = makeBaseCase({
      path: "src/common.js",
    });
    await fireEvent.click(getGitRefButton());
    expect(
      container.querySelector(
        '[href="/topheman/npm-registry-browser/tree/master?path=src%2Fcommon.js"]'
      )
    ).toBeVisible();
  });
  it("should accept null currentRef", async () => {
    const { getGitRefButton, container } = makeBaseCase({
      currentRef: null,
    });
    await fireEvent.click(getGitRefButton());
    expect(
      container.querySelector(
        '[aria-checked="true"][href="/topheman/npm-registry-browser/tree/master"]'
      )
    ).toBeVisible();
  });
});

export default {};
