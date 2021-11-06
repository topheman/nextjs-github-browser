import clsx from "clsx";
import Link from "next/link";
import { Actor, Commit } from "../../libs/graphql";

import { truncate } from "../../utils/string";
import AppAvatarImage from "../AppAvatarImage/AppAvatarImage";

export type AppFilesHeaderProps = {
  repositoryNameWithOwner: string;
  author?: Pick<Actor, "avatarUrl" | "login"> | null;
  lastCommit?: Pick<Commit, "oid" | "messageHeadline" | "committedDate"> | null;
  className?: string;
};

export default function AppFilesHeader({
  repositoryNameWithOwner,
  author,
  lastCommit,
  className,
  ...props
}: AppFilesHeaderProps): JSX.Element | null {
  return (
    <div className={clsx("flex flex-1", className)} {...props}>
      {author && lastCommit ? (
        <>
          <AppAvatarImage
            avatarUrl={`${author?.avatarUrl}&s=48`}
            alt={author?.login || "Avatar"}
            rounded="full"
            className="w-[24px]"
          />
          <Link
            href={`/${repositoryNameWithOwner}/commits?author=${author?.login}`}
          >
            <a className="ml-2 font-bold hover:underline">{author?.login}</a>
          </Link>
          <Link href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}>
            <a className="ml-2 hover:text-brand-primary">
              {lastCommit?.messageHeadline}
            </a>
          </Link>
          <div className="flex flex-1 justify-end items-baseline">
            <Link
              href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
            >
              <a className="ml-2 text-sm text-secondary hover:text-brand-primary hover:underline">
                {truncate(lastCommit?.oid, 7, "")}
              </a>
            </Link>
            <Link
              href={`/${repositoryNameWithOwner}/commit/${lastCommit?.oid}`}
            >
              <a className="ml-2 text-secondary hover:text-brand-primary hover:underline">
                on {new Date(lastCommit?.committedDate).toLocaleDateString()}
              </a>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
