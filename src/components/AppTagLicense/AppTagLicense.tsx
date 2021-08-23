import { LawIcon } from "@primer/octicons-react";

import { License } from "../../libs/graphql";

export type AppTagLicenseProps = {
  license: Pick<License, "name">;
  className?: string;
};

AppTagLicense.defaultProps = {
  className: "",
};

export default function AppTagLicense({
  license,
  className,
}: AppTagLicenseProps): JSX.Element | null {
  if (!license) {
    return null;
  }
  return (
    <span className={`${className} text-sm text-secondary`}>
      <LawIcon />
      <span className="ml-1">{license.name}</span>
    </span>
  );
}
