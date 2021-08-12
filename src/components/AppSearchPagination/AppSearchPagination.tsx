import { PageInfo } from "../../libs/graphql";

export type AppSearchPaginationProps = {
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
  after?: string;
  before?: string;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor },
  after,
  before,
}: AppSearchPaginationProps): JSX.Element {
  console.log({ after, before });
  // todo dynamic
  return (
    <div className="flex flex-row w-full">
      {startCursor} - {endCursor}
    </div>
  );
}
