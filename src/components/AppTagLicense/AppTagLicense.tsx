import { LawIcon } from "@primer/octicons-react";
import clsx from "clsx";

import { License } from "../../libs/graphql";

export type AppTagLicenseProps = {
  license: Pick<License, "name">;
  className?: string;
};

export default function AppTagLicense({
  license,
  className,
  ...props
}: AppTagLicenseProps): JSX.Element | null {
  if (!license) {
    return null;
  }
  return (
    <span {...props} className={clsx("text-sm text-secondary", className)}>
      <LawIcon />
      <span className="ml-1">{license.name}</span>
    </span>
  );
}
