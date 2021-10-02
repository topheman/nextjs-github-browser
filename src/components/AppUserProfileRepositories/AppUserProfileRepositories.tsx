import { useRouter } from "next/router";

import { Repository } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";
import AppSearchPagination from "../AppSearchPagination/AppSearchPagination";
import AppRepositoryListItem from "../AppRepositoryListItem/AppRepositoryListItem";
import AppSearchSummary from "../AppSearchSummary/AppSearchSummary";
import { extractSearchUrlParams } from "../../utils/github";
import useSearchRepos from "../../utils/useSearchRepos";

export type AppUserProfileRepositoriesProps = never;

export default function AppUserProfileRepositories(): JSX.Element | null {
  const router = useRouter();
  const {
    searchBarState,
    setSearchBarState,
    setPaginationState,
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
          params={searchBarState}
          className="pb-4 mb-4 border-b border-light"
        />
      </div>
      {data && (
        <div>
          <AppSearchSummary
            count={data?.searchRepos.repositoryCount}
            pageInfo={data?.searchRepos.pageInfo}
            sort={searchBarState.sort}
            type={searchBarState.type}
            clearFilter={
              searchBarState.sort || searchBarState.type || searchBarState.q
                ? () => {
                    setSearchBarState(() => ({}));
                    setPaginationState(() => ({}));
                  }
                : undefined
            }
            className="pb-4 mb-4 border-b border-light"
          />
        </div>
      )}
      <div className="text-center">
        {data?.searchRepos.pageInfo && (
          <AppSearchPagination
            data-testid="search-pagination-top"
            loading={loading}
            onUpdate={setPaginationState}
            pageInfo={data?.searchRepos.pageInfo}
            className="inline-block"
          />
        )}
      </div>
      {data?.searchRepos.edges ? (
        <>
          <ul data-testid="repository-list">
            {data?.searchRepos.edges.map((repo) => (
              <li key={(repo?.node as Repository).name}>
                <AppRepositoryListItem repository={repo?.node as Repository} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>There will be a repository list.</div>
      )}
      <div className="text-center">
        {data?.searchRepos.pageInfo && (
          <AppSearchPagination
            loading={loading}
            onUpdate={setPaginationState}
            pageInfo={data?.searchRepos.pageInfo}
            className="inline-block"
          />
        )}
      </div>
    </div>
  );
}
