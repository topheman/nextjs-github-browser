import {
  StarIcon,
  RepoForkedIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import Link from "next/link";

type AllowedType = "stargazers" | "forks" | "issues" | "pulls";

export type AppTagProps = {
  nameWithOwner: string;
  type: AllowedType;
  count?: number | string;
  className?: string;
};

const iconMapping: Record<AllowedType, [typeof StarIcon, string]> = {
  stargazers: [StarIcon, "/stargazers"],
  forks: [RepoForkedIcon, "/network/member"],
  issues: [IssueOpenedIcon, "/issues"],
  pulls: [GitPullRequestIcon, "/pulls"],
};

AppTag.defaultProps = {
  className: "",
};

export default function AppTag({
  nameWithOwner,
  type,
  count,
  className,
}: AppTagProps): JSX.Element | null {
  if (count === undefined || count === null) {
    return null;
  }
  const [Icon, relativePath] = iconMapping[type];
  return (
    <Link href={`/${nameWithOwner}${relativePath}`}>
      <a
        className={`text-xs text-secondary hover:text-brand-primary ${className}`}
      >
        <Icon /> {count}
      </a>
    </Link>
  );
}
