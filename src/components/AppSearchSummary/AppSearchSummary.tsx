import { XIcon } from "@primer/octicons-react";
import clsx from "clsx";

import { PageInfo } from "../../libs/graphql";
import { getSearchFieldSummaryInfos, decodeCursor } from "../../utils/github";

export type AppSearchSummaryProps = {
  count: number;
  pageInfo: Pick<PageInfo, "startCursor" | "endCursor">;
  sort: string | undefined;
  type: string | undefined;
  clearFilter?: () => void;
  className?: string;
};

const TYPE_LABEL_MAPPING = getSearchFieldSummaryInfos("type");
const SORT_LABEL_MAPPING = getSearchFieldSummaryInfos("sort");

export default function AppSearchSummary({
  count,
  pageInfo,
  sort = "",
  type = "",
  clearFilter,
  className,
  ...props
}: AppSearchSummaryProps): JSX.Element | null {
  const sortByLabel = SORT_LABEL_MAPPING[sort];
  const typeLabel = TYPE_LABEL_MAPPING[type];
  const from = decodeCursor(pageInfo.startCursor);
  const to = decodeCursor(pageInfo.endCursor);
  return (
    <div {...props} className={clsx("flex", className)}>
      <div className="flex-1">
        <strong data-testid="repositories-total-found">{count}</strong> result
        {count > 1 ? "s" : ""}{" "}
        {count ? (
          <>
            (<span data-testid="repositories-page-from">{from}</span>-
            <span data-testid="repositories-page-to">{to}</span>)
          </>
        ) : null}
        {typeLabel ? (
          <>
            {" "}
            for{" "}
            <strong data-testid="repositories-search-type">
              {typeLabel}
            </strong>{" "}
            repositories
          </>
        ) : null}{" "}
        sorted by{" "}
        <strong data-testid="repositories-search-sort">{sortByLabel}</strong>
      </div>
      <div className={clsx(typeof clearFilter === "undefined" && "hidden")}>
        <button
          type="button"
          className="text-secondary hover:text-brand-primary cursor-pointer"
          onClick={clearFilter}
        >
          <XIcon />
          Clear filter
        </button>
      </div>
    </div>
  );
}
