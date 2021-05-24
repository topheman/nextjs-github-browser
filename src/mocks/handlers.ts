/* eslint-disable global-require,no-console */
import { graphql } from "msw";

const github =
  typeof window === "undefined"
    ? graphql.link("http://localhost:3000/api/github/graphql")
    : graphql.link("/api/github/graphql");

export const handlers = [
  github.query("GetRepositoryOwnerWithPinnedItems", (req, res, ctx) => {
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
  github.query("GetRepositoryOwnerWithRepositories", (req, res, ctx) => {
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
  github.query("GetProfileReadme", (req, res, ctx) => {
    console.log("[GraphQLMock] GetProfileReadme", req.variables);
    return res(
      ctx.data({
        ...require("./data/GetProfileReadme.json"),
      })
    );
  }),
];
