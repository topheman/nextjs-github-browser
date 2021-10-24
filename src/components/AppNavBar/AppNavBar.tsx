import Link from "next/link";
import React from "react";
import clsx from "clsx";

import BaseBadge from "../BaseBadge/BaseBadge";

export type LinksDataType = {
  label: string;
  icon: React.FunctionComponent<{ className?: string }>;
  badge?: string | number;
  tab?: string;
  href: string | { pathname: string; query?: Record<string, string> };
  disabled?: boolean;
};

export type AppNavBarProps = {
  links: LinksDataType[];
  currentTab: string;
};

type TabComponent = React.FunctionComponent<{
  children: React.ReactChild | React.ReactChild[];
  className?: string;
  style?: React.CSSProperties;
}>;

export default function AppNavBar({
  links,
  currentTab,
  ...ownProps
}: AppNavBarProps): JSX.Element | null {
  return (
    <nav {...ownProps} className="flex">
      {links.map(({ label, icon: Icon, badge, tab, href, disabled }) => {
        const Component: TabComponent = tab
          ? ({ children, className, ...props }) => (
              <Link key={label} href={href}>
                <a className={className} {...props}>
                  {children}
                </a>
              </Link>
            )
          : ({ children, ...props }) => <span {...props}>{children}</span>;
        return (
          <Component
            key={label}
            className={clsx(
              "py-2 px-4 leading-6",
              currentTab === tab && "border-b-2 border-brand-primary",
              disabled ? "pointer-events-none" : ""
            )}
            style={{
              opacity: disabled ? 0.3 : 1,
            }}
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
