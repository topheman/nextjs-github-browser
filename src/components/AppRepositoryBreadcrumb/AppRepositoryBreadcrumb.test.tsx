import React from "react";
import { render } from "@testing-library/react";

import AppRepositoryBreadCrumb, {
  AppRepositoryBreadcrumbProps,
} from "./AppRepositoryBreadcrumb";

const baseRender = (props: Partial<AppRepositoryBreadcrumbProps> = {}) =>
  render(
    <AppRepositoryBreadCrumb
      nameWithOwner="topheman/nextjs-movie-browser"
      currentPath="src/components/SomeComponent/SomeComponent.tsx"
      resolvedCurrentRefName="master"
      {...props}
    />
  );

describe("components/AppRepositoryBreadCrumb", () => {
  it("should show the name of repository with a link to it", () => {
    const { getByRole } = baseRender();
    expect(getByRole("link", { name: "nextjs-movie-browser" })).toBeVisible();
    expect(getByRole("link", { name: "nextjs-movie-browser" })).toHaveAttribute(
      "href",
      "/topheman/nextjs-movie-browser"
    );
  });
  it("should expose link for each path fragment except last", () => {
    const { getByRole } = baseRender();
    [
      ["src", "src"],
      ["components", "src/components"],
      ["SomeComponent", "src/components/SomeComponent"],
    ].forEach(([pathFragment, path]) => {
      expect(getByRole("link", { name: pathFragment })).toBeVisible();
      expect(getByRole("link", { name: pathFragment })).toHaveAttribute(
        "href",
        `/topheman/nextjs-movie-browser/tree/master?path=${encodeURIComponent(
          path
        )}`
      );
    });
  });
  it("should not expose link on last fragment", () => {
    const { queryByRole, getByText } = baseRender();
    expect(
      queryByRole("link", { name: "SomeComponent.tsx" })
    ).not.toBeInTheDocument();
    expect(getByText("SomeComponent.tsx")).toBeVisible();
  });
});
