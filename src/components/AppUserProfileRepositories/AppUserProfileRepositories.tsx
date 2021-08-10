import { useRouter } from "next/router";

import { Repository, useSearchRepositoriesQuery } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";
import { useSearchRepos, extractSearchParams } from "../../utils/github";

export type AppUserProfileRepositoriesProps = never;

export default function AppUserProfileRepositories(): JSX.Element | null {
  const router = useRouter();
  const {
    searchBarState,
    setSearchBarState,
    graphqlSearchQuery,
  } = useSearchRepos(
    router.query.owner as string,
    extractSearchParams(router.asPath)
  );
  const searchRepositoriesResult = useSearchRepositoriesQuery({
    variables: { query: graphqlSearchQuery },
  });
  return (
    <div>
      <div>
        <AppSearchBarRepositories
          onUpdate={setSearchBarState}
          params={searchBarState}
        />
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
