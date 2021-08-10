import { useRouter } from "next/router";

import { Repository, useSearchRepositoriesQuery } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";
import { useSearchBar, extractSearchParams } from "../../utils/github";

export type AppUserProfileRepositoriesProps = never;

export default function AppUserProfileRepositories(): JSX.Element | null {
  const router = useRouter();
  const {
    searchBarState,
    setSearchBarState,
    graphqlSearchQuery,
  } = useSearchBar(
    router.query.owner as string,
    extractSearchParams(router.asPath)
  );
  console.log({ graphqlSearchQuery });
  const searchRepositoriesResult = useSearchRepositoriesQuery({
    variables: { query: graphqlSearchQuery },
  });
  return (
    <div>
      <div>
        <AppSearchBarRepositories
          onUpdate={(params) => {
            console.log(params);
            setSearchBarState(params);
          }}
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
