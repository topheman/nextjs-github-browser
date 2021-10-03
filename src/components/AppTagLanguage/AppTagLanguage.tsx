import { DotFillIcon } from "@primer/octicons-react";
import clsx from "clsx";

import { Language } from "../../libs/graphql";

export type AppTagLanguageProps = {
  primaryLanguage: Pick<Language, "color" | "name">;
  className?: string;
};

export default function AppTagLanguage({
  primaryLanguage,
  className,
  ...props
}: AppTagLanguageProps): JSX.Element | null {
  if (!primaryLanguage) {
    return null;
  }
  return (
    <span {...props} className={clsx("text-sm text-secondary", className)}>
      <DotFillIcon
        fill={primaryLanguage.color || "#900000"}
        size={24}
        className="-mb-1 -ml-1"
      />
      <span>{primaryLanguage.name}</span>
    </span>
  );
}
