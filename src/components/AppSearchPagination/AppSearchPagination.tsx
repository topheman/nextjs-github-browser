import Link from "next/link";
import { useRouter } from "next/router";

import { decodeBase64 } from "../../utils/common";
import { PaginationParamsType } from "../../utils/github";
import { PageInfo } from "../../libs/graphql";

export type AppSearchPaginationProps = {
  onUpdate: ({ after, before }: PaginationParamsType) => void;
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
  loading: boolean;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor, hasPreviousPage, hasNextPage },
  loading,
  onUpdate,
}: AppSearchPaginationProps): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { before, after, page, ...rest } = router.query;
  return (
    <div>
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
          className={`${!hasPreviousPage ? "text-secondary" : ""}`}
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
      <span>{loading ? "..." : " . "}</span>
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
          className={`${!hasNextPage ? "text-secondary" : ""}`}
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
  );
}
