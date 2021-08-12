import { PageInfo } from "../../libs/graphql";

export type AppSearchPaginationProps = {
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor },
  perPage,
}: AppSearchPaginationProps): JSX.Element {
  // todo dynamic
  return (
    <div className="flex flex-row w-full">
      {startCursor} - {endCursor}
    </div>
  );
}
