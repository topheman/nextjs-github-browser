import {
  CodeIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import React from "react";

import AppNavBar, { LinksDataType } from "../AppNavBar/AppNavBar";

export type AppProfileNavTabProps = {
  owner: string;
  repositoryName: string;
  currentTab: "code" | "issues" | "pull-requests";
};

export default function AppProfileNavTab({
  owner,
  repositoryName,
  currentTab,
  ...ownProps
}: AppProfileNavTabProps): JSX.Element | null {
  const links: LinksDataType[] = [
    {
      label: "Code",
      icon: CodeIcon,
      tab: "code",
      href: {
        pathname: `/${owner}/${repositoryName}`,
      },
    },
    {
      label: "Issues",
      tab: "issues",
      icon: IssueOpenedIcon,
      href: {
        pathname: `/${owner}/${repositoryName}/issues`,
      },
      disabled: true,
    },
    {
      label: "Pull requests",
      tab: "pull-requests",
      icon: GitPullRequestIcon,
      href: {
        pathname: `/${owner}/${repositoryName}/pulls`,
      },
      disabled: true,
    },
  ];
  return <AppNavBar {...ownProps} links={links} currentTab={currentTab} />;
}
