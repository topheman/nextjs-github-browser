import AppSelectMenu from "../AppSelectMenu/AppSelectMenu";
import { getSearchFieldOptions, SearchParamsType } from "../../utils/github";

export type AppSearchBarRepositoriesProps = {
  onUpdate: ({ type, sort, q }: SearchParamsType) => void;
  params: SearchParamsType;
};

export default function AppSearchBarRepositories({
  onUpdate,
  params: { type, sort, q },
}: AppSearchBarRepositoriesProps): JSX.Element {
  return (
    <div className="flex flex-row w-full">
      <input
        type="text"
        placeholder="Find a repository..."
        className="flex-1 pl-2 rounded border border-light"
        value={q}
        onInput={(e) => onUpdate({ q: (e.target as HTMLInputElement).value })}
      />
      <AppSelectMenu
        value={type || ""}
        onChange={(value) => onUpdate({ type: value })}
        options={getSearchFieldOptions("type")}
        buttonLabel="Type"
        menuLabel="Select type"
        className="ml-2"
      />
      <AppSelectMenu
        value={sort || ""}
        onChange={(value) => onUpdate({ sort: value })}
        options={getSearchFieldOptions("sort")}
        buttonLabel="Sort"
        menuLabel="Select order"
        className="ml-1"
      />
    </div>
  );
}
