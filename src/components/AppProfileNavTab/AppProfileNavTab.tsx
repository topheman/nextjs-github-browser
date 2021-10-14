import Link from "next/link";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import React from "react";
import clsx from "clsx";

import BaseBadge from "../BaseBadge/BaseBadge";

export type AppProfileNavTabProps = {
  owner: string;
  currentTab: "default" | "repositories";
  mode: "user" | "organization";
  reposTotalCount?: number;
};

type LinksDataType = {
  label: string;
  icon: React.FunctionComponent<{ className?: string }>;
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
  mode,
  ...ownProps
}: AppProfileNavTabProps): JSX.Element | null {
  const links: LinksDataType[] = [
    { label: "Overview", icon: BookIcon, tab: "default" },
    {
      label: "Repositories",
      tab: "repositories",
      icon: RepoIcon,
      badge: reposTotalCount,
    },
  ];
  return (
    <nav {...ownProps} className="flex">
      {links.map(({ label, icon: Icon, badge, tab }) => {
        const Component: TabComponent = tab
          ? ({ children, className, ...props }) => (
              <Link
                key={label}
                href={{
                  pathname:
                    mode === "organization" && tab === "repositories"
                      ? `/orgs/${owner}/repositories`
                      : `/${owner}`,
                  query: {
                    ...(mode === "user" && tab !== "default" ? { tab } : {}),
                  },
                }}
                {...props}
              >
                <a className={className}>{children}</a>
              </Link>
            )
          : ({ children, ...props }) => <span {...props}>{children}</span>;
        return (
          <Component
            key={label}
            className={clsx(
              "py-2 px-4 leading-6",
              currentTab === tab && "border-b-2 border-brand-primary"
            )}
          >
            <span>
              {Icon ? <Icon className="mr-1" /> : null}
              {label}
              {badge !== undefined ? (
                <BaseBadge badgeContent={badge} className="ml-2" />
              ) : null}
            </span>
          </Component>
        );
      })}
    </nav>
  );
}
