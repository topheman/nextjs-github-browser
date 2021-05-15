/* eslint-disable global-require,no-console */
import { graphql } from "msw";

const github =
  typeof window === "undefined"
    ? graphql.link("http://localhost:3000/api/github/graphql")
    : graphql.link("/api/github/graphql");

export const handlers = [
  github.query("GetRepositoryOwner", (req, res, ctx) => {
    console.log("[GraphQLMock] GetRepositoryOwner", req.variables);
    return res(
      ctx.data({
        ...require("./data/GetRepositoryOwner.json"),
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
