import Link from "next/link";
import { StarIcon, RepoForkedIcon, RepoIcon } from "@primer/octicons-react";

import BaseButton from "../BaseButton/BaseButton";

export type AppRepositoryHeaderProps = {
  owner: string;
  repositoryName: string;
  starsCount: number;
  forksCount: number;
};

export default function AppRepositoryHeader({
  owner,
  repositoryName,
  starsCount,
  forksCount,
}: AppRepositoryHeaderProps): JSX.Element | null {
  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="inline-block text-xl">
          <RepoIcon className="mr-1 !align-baseline" />
          <Link href={`/${owner}`}>
            <a className="text-brand-primary hover:underline">{owner}</a>
          </Link>{" "}
          /{" "}
          <Link href={`/${owner}/${repositoryName}`}>
            <a className="font-bold text-brand-primary hover:underline">
              {repositoryName}
            </a>
          </Link>
        </h1>
        <span className="inline-block px-1 ml-2 text-sm text-secondary align-text-bottom rounded-xl border border-light">
          Public
        </span>
      </div>
      <ul className="hidden md:flex gap-2">
        <li>
          <BaseButton
            icon={<StarIcon />}
            size="small"
            badge={{
              href: `/${owner}/${repositoryName}/stargazers`,
              label: starsCount,
            }}
          >
            Star
          </BaseButton>
        </li>
        <li>
          <BaseButton
            icon={<RepoForkedIcon />}
            size="small"
            badge={{
              href: `/${owner}/${repositoryName}/network/members`,
              label: forksCount,
            }}
          >
            Star
          </BaseButton>
        </li>
      </ul>
    </div>
  );
}
