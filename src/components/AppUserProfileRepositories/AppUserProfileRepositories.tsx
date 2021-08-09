import AppSearchBarRepositories from "../AppSearchBarRepositories/AppSearchBarRepositories";

// export type AppUserProfileRepositoriesProps = {};

function onUpdate(props: Record<string, string>) {
  console.log(props);
}

export default function AppUserProfileRepositories(): JSX.Element | null {
  return (
    <div>
      <div>
        <AppSearchBarRepositories onUpdate={onUpdate} />
      </div>
      <div>There will be a repository list.</div>
    </div>
  );
}
