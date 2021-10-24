import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { decodeBase64 } from "../../utils/common";
import { PaginationParamsType } from "../../utils/github/searchRepos";
import { PageInfo } from "../../libs/graphql";
import AppLoadingSpinner from "../AppLoadingSpinner/AppLoadingSpinner";

export type AppSearchPaginationProps = {
  onUpdate: ({ after, before }: PaginationParamsType) => void;
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
  loading: boolean;
  className: string;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor, hasPreviousPage, hasNextPage },
  loading,
  onUpdate,
  className,
  ...props
}: AppSearchPaginationProps): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { before, after, page, ...rest } = router.query;
  return (
    <div {...props} className={clsx(className)}>
      <div className="flex text-brand-primary">
        <Link
          href={{
            pathname: "/[owner]",
            query: {
              ...rest,
              before: startCursor,
            },
          }}
        >
          <a
            className={clsx(
              "p-1 rounded-l border",
              !hasPreviousPage && "cursor-not-allowed"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (hasPreviousPage && startCursor && !loading)
                onUpdate({ before: startCursor, after: undefined });
            }}
            role="button"
            tabIndex={0}
            data-start-cursor={startCursor}
            data-start-cursor-decoded={decodeBase64(startCursor)}
          >
            <span className={!hasPreviousPage ? "opacity-40" : ""}>
              Previous
            </span>
          </a>
        </Link>
        <div className="p-1 w-14 text-center border-t border-b">
          {loading ? (
            <AppLoadingSpinner width={50} data-testid="pagination-spinner" />
          ) : (
            <span style={{ width: 50 }} />
          )}
        </div>
        <Link
          href={{
            pathname: "/[owner]",
            query: {
              ...rest,
              after: endCursor,
            },
          }}
        >
          <a
            className={clsx(
              "p-1 rounded-r border",
              !hasNextPage && "cursor-not-allowed"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage && endCursor && !loading)
                onUpdate({ after: endCursor, before: undefined });
            }}
            role="button"
            tabIndex={0}
            data-end-cursor={endCursor}
            data-end-cursor-decoded={decodeBase64(endCursor)}
          >
            <span className={!hasNextPage ? "opacity-40" : ""}>Next</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
