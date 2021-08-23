import { DotFillIcon } from "@primer/octicons-react";

import { Language } from "../../libs/graphql";

export type AppTagLanguageProps = {
  primaryLanguage: Pick<Language, "color" | "name">;
  className?: string;
};

AppTagLanguage.defaultProps = {
  className: "",
};

export default function AppTagLanguage({
  primaryLanguage,
  className,
}: AppTagLanguageProps): JSX.Element | null {
  if (!primaryLanguage) {
    return null;
  }
  return (
    <span className={`${className} text-sm text-secondary`}>
      <DotFillIcon
        fill={primaryLanguage.color || "#900000"}
        size={24}
        className="-mb-1 -ml-1"
      />
      <span>{primaryLanguage.name}</span>
    </span>
  );
}
