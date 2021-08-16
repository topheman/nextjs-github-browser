/* eslint-disable global-require,no-console */
import { graphql, GraphQLHandler, rest, RestHandler } from "msw";

const passThroughHandler = async (req, res, ctx) => {
  const originalResponse = await ctx.fetch(req);
  console.log(originalResponse);
  console.log(ctx);
  // return ctx({ ...originalResponse });
  // ctx.headers(originalResponse.headers);
  let { body } = originalResponse;
  if (originalResponse.body.getReader) {
    body = await originalResponse.text();
    return res(ctx.body(body));
  }
  return originalResponse;
};

export const makeHandlers = () => {
  let handlers: (GraphQLHandler | RestHandler)[] = [
    rest.get("/favicon.ico", (req, res) => {
      return res();
    }),
    rest.get("https://fonts.gstatic.com/*", passThroughHandler),
    rest.get("/_next/*", passThroughHandler),
    // ...["https://fonts.gstatic.com/*"].map((url) => {
    //   return rest.get(url, passThroughHandler);
    // }),
  ];
  [
    graphql.link("http://localhost:3000/api/github/graphql"),
    graphql.link("https://api.github.com/graphql"),
  ].forEach((graphqlLink) => {
    handlers = [
      ...handlers,
      graphqlLink.query(
        "GetRepositoryOwnerWithPinnedItems",
        (req, res, ctx) => {
          console.log(
            "[GraphQLMock] GetRepositoryOwnerWithPinnedItems",
            req.variables
          );
          const result = res(
            ctx.data({
              ...require("./data/GetRepositoryOwnerWithPinnedItems.json"),
            })
          );
          console.log(
            "[GraphQLMock] GetRepositoryOwnerWithPinnedItems",
            req.url.href,
            result
          );
          return result;
        }
      ),
      graphqlLink.query(
        "GetRepositoryOwnerWithRepositories",
        (req, res, ctx) => {
          console.log(
            "[GraphQLMock] GetRepositoryOwnerWithRepositories",
            req.variables
          );
          const result = res(
            ctx.data({
              ...require("./data/GetRepositoryOwnerWithRepositories.json"),
            })
          );
          console.log(
            "[GraphQLMock] GetRepositoryOwnerWithRepositories",
            req.url.href,
            result
          );
          return result;
        }
      ),
      graphqlLink.query("GetProfileReadme", (req, res, ctx) => {
        console.log("[GraphQLMock] GetProfileReadme", req.variables);
        const result = res(
          ctx.data({
            ...require("./data/GetProfileReadme.json"),
          })
        );
        console.log("[GraphQLMock] GetProfileReadme", req.url.href, result);
        return result;
      }),
    ];
  });
  return handlers;
};
