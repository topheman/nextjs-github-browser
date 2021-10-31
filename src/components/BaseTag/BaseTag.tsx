import clsx from "clsx";
import React from "react";
import Link from "next/link";

export type BaseTagProps = {
  href?: string;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
  color: "brand-primary" | "primary" | "secondary";
} & React.HTMLAttributes<HTMLElement>;

const LinkOrSpan = ({
  href,
  children,
  ...props
}: Omit<BaseTagProps, "color">) => {
  if (href) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  }
  return <span {...props}>{children}</span>;
};

export default function BaseTag({
  href,
  className,
  color,
  ...props
}: BaseTagProps): JSX.Element {
  return (
    <LinkOrSpan
      className={clsx(
        "inline-block px-2 mr-1 rounded-lg border",
        color === "brand-primary" && [
          "text-brand-primary border-brand-primary",
          href && "hover:text-white hover:bg-brand-primary",
        ],
        color === "primary" && [
          "text-primary border-primary",
          href && "hover:text-white hover:bg-canvas-inverted",
        ],
        color === "secondary" && [
          "text-secondary border-secondary",
          href && "hover:text-white hover:bg-canvas-inverted",
        ],
        className
      )}
      href={href}
      {...props}
    />
  );
}
