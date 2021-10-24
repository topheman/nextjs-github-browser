import { BookIcon, RepoIcon } from "@primer/octicons-react";
import React from "react";

import AppNavBar, { LinksDataType } from "../AppNavBar/AppNavBar";

export type AppProfileNavTabProps = {
  owner: string;
  currentTab: "default" | "repositories";
  mode: "user" | "organization";
  reposTotalCount?: number;
};

export default function AppProfileNavTab({
  owner,
  currentTab,
  reposTotalCount,
  mode,
  ...ownProps
}: AppProfileNavTabProps): JSX.Element | null {
  const links: LinksDataType[] = [
    {
      label: "Overview",
      icon: BookIcon,
      tab: "default",
      href: {
        pathname: `/${owner}`,
      },
    },
    {
      label: "Repositories",
      tab: "repositories",
      icon: RepoIcon,
      badge: reposTotalCount,
      href: {
        pathname:
          mode === "organization" ? `/orgs/${owner}/repositories` : `/${owner}`,
        query: mode === "user" ? { tab: "repositories" } : {},
      },
    },
  ];
  return <AppNavBar {...ownProps} links={links} currentTab={currentTab} />;
}
