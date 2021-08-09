import { Repository, useSearchRepositoriesQuery } from "../../libs/graphql";
import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";

// export type AppUserProfileRepositoriesProps = {};

function onUpdate(props: Record<string, string>) {
  console.log(props);
}

export default function AppUserProfileRepositories(): JSX.Element | null {
  const searchRepositoriesResult = useSearchRepositoriesQuery({
    variables: { query: "user:topheman fork:true sort:updated-desc" },
  });
  return (
    <div>
      <div>
        <AppSearchBarRepositories onUpdate={onUpdate} />
      </div>
      {searchRepositoriesResult.data?.searchRepos.edges ? (
        <ul>
          {searchRepositoriesResult.data?.searchRepos.edges.map((repo) => (
            <li key={(repo?.node as Repository).name}>
              {(repo?.node as Repository).name}
            </li>
          ))}
        </ul>
      ) : (
        <div>There will be a repository list.</div>
      )}
    </div>
  );
}
