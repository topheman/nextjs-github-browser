import React from "react";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export type AppAvatarImageProps = {
  avatarUrl: string;
  rounded: "full" | "medium";
  className?: string;
} & typeof defaultProps;

const defaultProps = {
  alt: "Avatar",
};

export default function AppAvatarImage({
  avatarUrl,
  alt,
  rounded,
  className,
  ...props
}: AppAvatarImageProps): JSX.Element | null {
  return (
    <img
      {...props}
      src={avatarUrl}
      alt={alt}
      className={clsx(
        "w-full h-auto",
        rounded === "full" ? "rounded-full" : "rounded-xl",
        "border border-primary",
        className
      )}
    />
  );
}

AppAvatarImage.defaultProps = defaultProps;
