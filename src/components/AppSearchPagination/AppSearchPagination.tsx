import { PaginationParamsType } from "../../utils/github";
import { PageInfo } from "../../libs/graphql";

export type AppSearchPaginationProps = {
  onUpdate: ({ after, before }: PaginationParamsType) => void;
  params: PaginationParamsType;
  pageInfo: Pick<
    PageInfo,
    "endCursor" | "startCursor" | "hasNextPage" | "hasPreviousPage"
  >;
};

export default function AppSearchPagination({
  pageInfo: { startCursor, endCursor },
  params: { after, before },
  onUpdate,
}: AppSearchPaginationProps): JSX.Element {
  console.log({ after, before });
  // todo dynamic
  return (
    <div className="">
      <p>
        <button type="button" onClick={() => onUpdate({ before })}>
          &gt; {before}
        </button>{" "}
        /
        <button type="button" onClick={() => onUpdate({ after })}>
          &gt; {after}
        </button>
      </p>
      <p>
        {startCursor} - {endCursor}
      </p>
    </div>
  );
}
