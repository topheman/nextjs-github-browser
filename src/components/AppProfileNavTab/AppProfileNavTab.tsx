import Link from "next/link";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import React from "react";

import BaseBadge from "../BaseBadge/BaseBadge";

export type AppProfileNavTabProps = {
  owner: string;
  currentTab: "default" | "repositories";
  reposTotalCount: number;
};

type LinksDataType = {
  label: string;
  icon: React.FunctionComponent;
  badge?: string | number;
  tab?: string;
};

type TabComponent = React.FunctionComponent<{
  children: React.ReactChild | React.ReactChild[];
  className?: string;
}>;

export default function AppProfileNavTab({
  owner,
  currentTab,
  reposTotalCount,
}: AppProfileNavTabProps): JSX.Element | null {
  const links: LinksDataType[] = [
    { label: "Overview", icon: BookIcon },
    {
      label: "Repositories",
      tab: "repositories",
      icon: RepoIcon,
      badge: reposTotalCount,
    },
  ];
  return (
    <nav>
      {links.map(({ label, icon: Icon, badge, tab }) => {
        const Component: TabComponent = tab
          ? ({ children, ...props }) => (
              <Link
                key={label}
                href={tab !== "default" ? `/${owner}?tab=${tab}` : `/${owner}`}
                {...props}
              >
                <a>{children}</a>
              </Link>
            )
          : ({ children, ...props }) => <span {...props}>{children}</span>;
        return (
          <Component key={label} className={currentTab === tab ? "active" : ""}>
            <>
              {Icon ? <Icon /> : null}
              {label}
              {badge !== undefined ? (
                <BaseBadge badgeContent={badge} className="ml-2" />
              ) : null}
            </>
          </Component>
        );
      })}
    </nav>
  );
}
