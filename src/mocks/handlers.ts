/* eslint-disable global-require,no-console */
import path from "path";
import { graphql, GraphQLHandler } from "msw";

import { GRAPHQL_URI } from "../utils/tests";
import { SearchRepositoriesQueryResult } from "../libs/graphql";
import { SearchParamsType, PaginationParamsType } from "../utils/github";

const apolloLink = graphql.link(GRAPHQL_URI);

export const baseHandlers = (): GraphQLHandler[] => [
  apolloLink.query("GetRepositoryOwnerWithPinnedItems", (req, res, ctx) => {
    console.log(
      "[GraphQLMock] GetRepositoryOwnerWithPinnedItems",
      req.variables
    );
    return res(
      ctx.data({
        ...require("./data/GetRepositoryOwnerWithPinnedItems.json"),
      })
    );
  }),
  apolloLink.query("GetRepositoryOwnerWithRepositories", (req, res, ctx) => {
    console.log(
      "[GraphQLMock] GetRepositoryOwnerWithRepositories",
      req.variables
    );
    return res(
      ctx.data({
        ...require("./data/GetRepositoryOwnerWithRepositories.json"),
      })
    );
  }),
  apolloLink.query("GetProfileReadme", (req, res, ctx) => {
    console.log("[GraphQLMock] GetProfileReadme", req.variables);
    return res(
      ctx.data({
        ...require("./data/GetProfileReadme.json"),
      })
    );
  }),
];

export const searchRepoHandler = (
  searchParams: SearchParamsType,
  paginationParams: PaginationParamsType
): GraphQLHandler => {
  let fileName = path.join(__dirname, "data/SearchRepositories.json");
  if (Object.keys({ ...searchParams, ...paginationParams }).length > 0) {
    const query = Object.entries({ ...searchParams, ...paginationParams })
      .map(([key, value]) => `${key}=${value}`)
      .join("|");
    fileName = path.join(__dirname, `data/SearchRepositories/${query}.json`);
  }
  // eslint-disable-next-line import/no-dynamic-require,@typescript-eslint/no-var-requires
  const result = require(fileName) as SearchRepositoriesQueryResult;
  return apolloLink.query("SearchRepositories", (req, res, ctx) => {
    console.log("[GraphQLMock] SearchRepositories", req.variables);
    return res(
      ctx.data({
        ...result,
      })
    );
  });
};
