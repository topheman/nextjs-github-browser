import { useState, useEffect } from "react";

import AppSelectMenu from "../AppSelectMenu/AppSelectMenu";
import { getSearchFieldOptions } from "../../utils/github";

export type AppSearchBarRepositoriesProps = {
  onUpdate: ({ type, sort }: { type: string; sort: string }) => void;
};

export default function AppSearchBarRepositories({
  onUpdate,
}: AppSearchBarRepositoriesProps): JSX.Element {
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const updateType = (newType: string) => {
    setType(newType);
  };
  const updateSort = (newSort: string) => {
    setSort(newSort);
  };
  useEffect(() => {
    onUpdate({ type, sort });
  }, [type, sort, onUpdate]);
  return (
    <div className="flex flex-row w-full">
      <input
        type="text"
        placeholder="Find a repository..."
        className="flex-1 pl-2 rounded border border-light"
      />
      <AppSelectMenu
        value={type}
        onChange={updateType}
        options={getSearchFieldOptions("type")}
        buttonLabel="Type"
        menuLabel="Select type"
        className="ml-2"
      />
      <AppSelectMenu
        value={sort}
        onChange={updateSort}
        options={getSearchFieldOptions("sort")}
        buttonLabel="Sort"
        menuLabel="Select order"
        className="ml-1"
      />
    </div>
  );
}
