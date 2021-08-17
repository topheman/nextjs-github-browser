import { useRouter } from "next/router";

import { decodeBase64 } from "../../utils/common";
import { Repository } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";
import AppSearchPagination from "../AppSearchPagination/AppSearchPagination";
import { useSearchRepos, extractSearchUrlParams } from "../../utils/github";

export type AppUserProfileRepositoriesProps = never;

export default function AppUserProfileRepositories(): JSX.Element | null {
  const router = useRouter();
  const {
    searchBarState,
    setSearchBarState,
    setPaginationState,
    rawResult,
  } = useSearchRepos(
    router.query.owner as string,
    extractSearchUrlParams(router.asPath)
  );
  return (
    <div>
      <div>
        <AppSearchBarRepositories
          onUpdate={setSearchBarState}
          params={searchBarState}
        />
      </div>
      <div>
        {rawResult.data?.searchRepos.pageInfo && (
          <AppSearchPagination
            onUpdate={setPaginationState}
            pageInfo={rawResult.data?.searchRepos.pageInfo}
          />
        )}
      </div>
      <div className="font-bold">TODO : filter result infos</div>
      {rawResult.data?.searchRepos.edges ? (
        <p>
          First :{" "}
          {decodeBase64([...rawResult.data?.searchRepos.edges].shift()?.cursor)}{" "}
          / Last :{" "}
          {decodeBase64([...rawResult.data?.searchRepos.edges].pop()?.cursor)}
        </p>
      ) : null}
      {rawResult.data?.searchRepos.edges ? (
        <>
          <div>Total found: {rawResult.data?.searchRepos.repositoryCount}</div>
          <ul>
            {rawResult.data?.searchRepos.edges.map((repo) => (
              <li key={(repo?.node as Repository).name}>
                {(repo?.node as Repository).name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>There will be a repository list.</div>
      )}
    </div>
  );
}
