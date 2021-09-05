/* eslint-disable global-require,no-console */
import path from "path";
import { graphql, GraphQLHandler } from "msw";

import { GRAPHQL_URI } from "../utils/tests";
import { SearchRepositoriesQueryResult } from "../libs/graphql";

const apolloLink = graphql.link(GRAPHQL_URI);

const searchRepoHandler = (): GraphQLHandler => {
  return apolloLink.query("SearchRepositories", (req, res, ctx) => {
    const fileName = [
      __dirname,
      "data",
      "SearchRepositories",
      req.variables.query,
      `data${
        // eslint-disable-next-line no-nested-ternary
        req.variables.after
          ? `|after=${req.variables.after}`
          : "" || req.variables.before
          ? `|before=${req.variables.before}`
          : ""
      }.json`,
    ];
    // eslint-disable-next-line import/no-dynamic-require,@typescript-eslint/no-var-requires
    const result = require(path.join(
      ...fileName
    )) as SearchRepositoriesQueryResult;
    console.log(`[GraphQLMock] SearchRepositories`, req.variables);
    return res(
      ctx.data({
        ...result,
      })
    );
  });
};

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
  searchRepoHandler(),
];
