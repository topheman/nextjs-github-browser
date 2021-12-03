import clsx from "clsx";
import React from "react";

export type BaseBoxWithHeaderProps = {
  children: React.ReactChild | React.ReactChild[];
  header: JSX.Element | string;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

export default function BaseBoxWithHeader({
  children,
  header,
  className,
  ...props
}: BaseBoxWithHeaderProps): JSX.Element {
  return (
    <div
      {...props}
      className={clsx("rounded-md border border-light", className)}
    >
      <div className="p-3 rounded-tl rounded-tr bg-brand-secondary">
        {header}
      </div>
      {children}
    </div>
  );
}
