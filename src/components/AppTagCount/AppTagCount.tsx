import {
  StarIcon,
  RepoForkedIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import Link from "next/link";
import clsx from "clsx";

type AllowedType = "stargazers" | "forks" | "issues" | "pulls";

export type AppTagCountProps = {
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

export default function AppTagCount({
  nameWithOwner,
  type,
  count,
  className,
  ...props
}: AppTagCountProps): JSX.Element | null {
  if (count === undefined || count === null) {
    return null;
  }
  const [Icon, relativePath] = iconMapping[type];
  return (
    <Link href={`/${nameWithOwner}${relativePath}`}>
      <a
        {...props}
        className={clsx(
          "text-xs text-secondary hover:text-brand-primary whitespace-nowrap",
          className
        )}
      >
        <Icon /> {count}
      </a>
    </Link>
  );
}
