import React, { useReducer } from "react";
import { Story, Meta } from "@storybook/react";

import { SearchParamsType } from "../../utils/github";
import AppSearchBarRepositories, {
  AppSearchBarRepositoriesProps,
} from "./AppSearchBarRepositories";

export default {
  title: "AppSearchBarRepositories",
  component: AppSearchBarRepositories,
} as Meta;

const Template: Story<AppSearchBarRepositoriesProps> = () => {
  const [state, setState] = useReducer<
    (a: SearchParamsType, b: SearchParamsType) => SearchParamsType
  >(
    (previousState, nextState) => ({
      ...previousState,
      ...nextState,
    }),
    {
      type: "",
      sort: "",
      q: "",
    }
  );
  return (
    <div style={{ width: 700 }}>
      <AppSearchBarRepositories
        onUpdate={setState as AppSearchBarRepositoriesProps["onUpdate"]}
        clearPaginationFilter={() => {
          // todo add when done
        }}
        params={state}
      />
    </div>
  );
};

export const Base = Template.bind({});
Base.parameters = {};
Base.args = {};
