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
    clearPaginationFilter,
    data,
    loading,
  } = useSearchRepos(
    router.query.owner as string,
    extractSearchUrlParams(router.asPath)
  );
  return (
    <div>
      <div>
        <AppSearchBarRepositories
          onUpdate={setSearchBarState}
          clearPaginationFilter={clearPaginationFilter}
          params={searchBarState}
        />
      </div>
      <div>
        {data?.searchRepos.pageInfo && (
          <AppSearchPagination
            loading={loading}
            onUpdate={setPaginationState}
            pageInfo={data?.searchRepos.pageInfo}
          />
        )}
      </div>
      <div className="font-bold">TODO : filter result infos</div>
      {data?.searchRepos.edges ? (
        <p>
          First : {decodeBase64([...data?.searchRepos.edges].shift()?.cursor)} /
          Last : {decodeBase64([...data?.searchRepos.edges].pop()?.cursor)}
        </p>
      ) : null}
      {data?.searchRepos.edges ? (
        <>
          <div>Total found: {data?.searchRepos.repositoryCount}</div>
          <ul>
            {data?.searchRepos.edges.map((repo) => (
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
