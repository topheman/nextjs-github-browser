import { render, within } from "@testing-library/react";

import AppProfileNavTab from "./AppProfileNavTab";

const data = {
  organization: [
    { label: "Overview", link: "/microsoft" },
    { label: "Repositories", link: "/orgs/microsoft/repositories" },
  ],
  user: [
    { label: "Overview", link: "/topheman" },
    { label: "Repositories", link: "/topheman?tab=repositories" },
  ],
};

describe("components/AppProfileNavTab", () => {
  it("[organization] should show correct links", () => {
    const { container } = render(
      <AppProfileNavTab
        owner="microsoft"
        currentTab="default"
        mode="organization"
      />
    );
    data.organization.forEach(({ label, link }) => {
      const { getByText } = within(
        container.querySelector(`[href="${link}"]`) as HTMLElement
      );
      expect(getByText(label)).toBeVisible();
    });
  });
  it("[user] should show correct links", () => {
    const { container } = render(
      <AppProfileNavTab owner="topheman" currentTab="default" mode="user" />
    );
    data.user.forEach(({ label, link }) => {
      const { getByText } = within(
        container.querySelector(`[href="${link}"]`) as HTMLElement
      );
      expect(getByText(label)).toBeVisible();
    });
  });
  it("should handle current tab default", () => {
    const { container } = render(
      <AppProfileNavTab owner="topheman" currentTab="default" mode="user" />
    );
    const { getByText } = within(
      container.querySelector(`.border-brand-primary`) as HTMLElement
    );
    expect(getByText("Overview")).toBeVisible();
  });
  it("should handle current tab repositories", () => {
    const { container } = render(
      <AppProfileNavTab
        owner="topheman"
        currentTab="repositories"
        mode="user"
      />
    );
    const { getByText } = within(
      container.querySelector(`.border-brand-primary`) as HTMLElement
    );
    expect(getByText("Repositories")).toBeVisible();
  });
});
export {};
