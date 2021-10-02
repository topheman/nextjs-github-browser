import { XIcon } from "@primer/octicons-react";

import { PageInfo } from "../../libs/graphql";
import { getSearchFieldSummaryInfos, decodeCursor } from "../../utils/github";

export type AppSearchSummaryProps = {
  count: number;
  pageInfo: Pick<PageInfo, "startCursor" | "endCursor">;
  sort: string | undefined;
  type: string | undefined;
  className?: string;
};

const TYPE_LABEL_MAPPING = getSearchFieldSummaryInfos("type");
const SORT_LABEL_MAPPING = getSearchFieldSummaryInfos("sort");

export default function AppSearchSummary({
  count,
  pageInfo,
  sort = "",
  type = "",
  className,
}: AppSearchSummaryProps): JSX.Element | null {
  const sortByLabel = SORT_LABEL_MAPPING[sort];
  const typeLabel = TYPE_LABEL_MAPPING[type];
  const from = decodeCursor(pageInfo.startCursor);
  const to = decodeCursor(pageInfo.endCursor);
  return (
    <div className={`${className || ""} flex`}>
      <div className="flex-1">
        <strong data-testid="repositories-total-found">{count}</strong> result
        {count > 1 ? "s" : ""} (
        <span data-testid="repositories-page-from">{from}</span>-
        <span data-testid="repositories-page-to">{to}</span>)
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
      <div className="">
        <span
          className="text-secondary hover:text-brand-primary cursor-pointer"
          role="button"
          tabIndex={0}
        >
          <XIcon />
          Clear filter
        </span>
      </div>
    </div>
  );
}
