import Link from "next/link";
import { useRouter } from "next/router";

import { decodeBase64 } from "../../utils/common";
import { PaginationParamsType } from "../../utils/github";
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
}: AppSearchPaginationProps): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { before, after, page, ...rest } = router.query;
  return (
    <div className={className || ""}>
      <div className="flex">
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
            className={`border p-1 rounded-l ${
              !hasPreviousPage
                ? "text-brand-primary-light cursor-not-allowed"
                : "text-brand-primary"
            }`}
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
            Previous
          </a>
        </Link>
        <div className="p-1 w-14 text-center border-t border-b border-brand-primary">
          {loading ? (
            <AppLoadingSpinner width={50} />
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
            className={`border p-1 rounded-r ${
              !hasNextPage
                ? "text-brand-primary-light cursor-not-allowed"
                : "text-brand-primary"
            }`}
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
            Next
          </a>
        </Link>
      </div>
    </div>
  );
}
