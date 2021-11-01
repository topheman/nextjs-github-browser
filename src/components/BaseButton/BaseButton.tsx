import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { TriangleDownIcon } from "@primer/octicons-react";
import HRNumbers from "human-readable-numbers";

export type BaseButtonProps = Omit<
  React.HTMLProps<HTMLButtonElement>,
  "size"
> & {
  size: "small" | "medium";
  hasMenu?: boolean;
  badge?: {
    label: string | number;
    href: string;
  };
  icon?: JSX.Element;
};

export default function BaseButton({
  hasMenu,
  size,
  badge,
  className,
  icon,
  children,
  ...props
}: BaseButtonProps): JSX.Element | null {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "font-bold text-primary rounded-md border border-light",
        size === "small" ? "text-sm" : "text-base",
        className
      )}
    >
      <span
        className={clsx(
          "float-left py-1 px-3 bg-primary hover:bg-primary-hover focus:bg-primary-focus active:bg-primary-active hover:border-primary-hover focus:border-primary-hover active:border-primary-hover focus:outline-none",
          !badge ? "rounded-md" : "rounded-tl-md rounded-bl-md"
        )}
      >
        {icon || null}
        <span className={clsx(icon ? "pl-1" : "")}>{children}</span>
        {hasMenu ? <TriangleDownIcon /> : null}
      </span>
      {badge ? (
        <Link href={badge.href}>
          <a className="float-left py-1 px-3 hover:text-brand-primary border-l border-light">
            {!Number.isNaN(Number(badge.label))
              ? HRNumbers.toHumanString(Number(badge.label))
              : badge.label}
          </a>
        </Link>
      ) : null}
    </button>
  );
}
