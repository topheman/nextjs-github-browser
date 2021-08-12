import { useRouter } from "next/router";

import { Repository } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";
import AppSearchPagination from "../AppSearchPagination/AppSearchPagination";
import { useSearchRepos, extractSearchParams } from "../../utils/github";

export type AppUserProfileRepositoriesProps = never;

export default function AppUserProfileRepositories(): JSX.Element | null {
  const router = useRouter();
  const {
    searchBarState,
    setSearchBarState,
    paginationState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPaginationState,
    searchRepositoriesResult,
  } = useSearchRepos(
    router.query.owner as string,
    extractSearchParams(router.asPath)
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
        {searchRepositoriesResult.data?.searchRepos.pageInfo && (
          <AppSearchPagination
            params={paginationState}
            onUpdate={setPaginationState}
            pageInfo={searchRepositoriesResult.data?.searchRepos.pageInfo}
          />
        )}
      </div>
      {searchRepositoriesResult.data?.searchRepos.edges ? (
        <>
          <div>
            Total found:{" "}
            {searchRepositoriesResult.data?.searchRepos.repositoryCount}
          </div>
          <ul>
            {searchRepositoriesResult.data?.searchRepos.edges.map((repo) => (
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
