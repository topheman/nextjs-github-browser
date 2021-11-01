import clsx from "clsx";

import AppSelectMenu from "../AppSelectMenu/AppSelectMenu";
import {
  getSearchFieldOptions,
  SearchParamsType,
} from "../../utils/github/searchRepos";
import { SetReducerStateType } from "../../utils/useSearchRepos";

export type AppSearchBarRepositoriesProps = {
  onUpdate: SetReducerStateType<Partial<Record<"sort" | "type" | "q", string>>>;
  params: SearchParamsType;
  className?: string;
};

export default function AppSearchBarRepositories({
  onUpdate,
  params: { type = "", sort = "", q = "" },
  className,
  ...props
}: AppSearchBarRepositoriesProps): JSX.Element {
  return (
    <div
      {...props}
      className={clsx("flex flex-col sm:flex-row w-full", className)}
    >
      <input
        type="text"
        placeholder="Find a repository..."
        className="sm:flex-1 pl-2 mb-2 sm:mb-0 w-full h-8 leading-7 rounded border border-light"
        value={q}
        onInput={(e) => {
          onUpdate({ q: (e.target as HTMLInputElement).value });
        }}
      />
      <div className="flex ml-0 sm:ml-2">
        <AppSelectMenu
          value={type || ""}
          onChange={(value) => {
            onUpdate({ type: value });
          }}
          options={getSearchFieldOptions("type")}
          buttonLabel="Type"
          menuLabel="Select type"
          className=""
          alignMenu="right"
        />
        <AppSelectMenu
          value={sort || ""}
          onChange={(value) => {
            onUpdate({ sort: value });
          }}
          options={getSearchFieldOptions("sort")}
          buttonLabel="Sort"
          menuLabel="Select order"
          className="ml-1"
          alignMenu="right"
        />
      </div>
    </div>
  );
}
