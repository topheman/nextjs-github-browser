import { useRouter } from "next/router";

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
    searchRepositoriesResult,
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
        {searchRepositoriesResult.data?.searchRepos.pageInfo && (
          <AppSearchPagination
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
