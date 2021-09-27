/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { parseBooleanEnvVar } from "../../../../utils";
import { loadMock, saveMock } from "../../../mocks/node";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // @warn what about clients that do GET requests ?
  if (typeof req.method === "string" && req.method.toLowerCase() !== "post") {
    console.warn("[GraphQL-proxy]", "Method not allowed", req.method, req.url);
    return res.status(405).json({ error: "Method not allowed" });
  }
  // prevent introspection queries from graphiql and other requesters in dev mode to avoid multiple queries on rateLimit
  if (req.body.operationName === "IntrospectionQuery") {
    console.log("[GraphQL-proxy]", "Incoming IntrospectionQuery ignored");
    return res.status(405).json({ error: "IntrospectionQuery not allowed" });
  }
  const recordMocks = parseBooleanEnvVar(process.env.MOCKS_RECORD, false);
  const replayMocks = parseBooleanEnvVar(process.env.MOCKS_REPLAY, false);
  try {
    if (!process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT) {
      throw new Error("Env var GITHUB_GRAPHQL_API_ROOT_ENDPOINT not defined");
    }
    if (replayMocks) {
      let result;
      try {
        result = await loadMock(req.body.operationName, req.body.variables);
      } catch (e) {
        console.error(e);
      }
      if (result) {
        console.log(
          "[GraphQL-proxy][Replay]",
          req.body.operationName,
          req.body.variables
        );
        // add just a little delay (a response should not be immediate) / better for Cypress
        await new Promise((resolve) => setTimeout(resolve, 40));
        return res.status(200).json(result);
      }
      // in case mocking was not successful, fallback in network mode
    }
    console.log(
      `[GraphQL-proxy]${recordMocks ? "[Record]" : ""}${
        replayMocks ? "[Replay - FAILED / fallback network]" : ""
      }`,
      "fetching",
      req.method,
      req.url,
      "->",
      process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT,
      req.body.operationName,
      req.body.variables
    );
    const result = await fetch(process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: new Headers({
        Authorization: `Bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN}`,
      }),
    });
    if (result.ok) {
      const response = await result.text();
      if (recordMocks) {
        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
        const mockFilePath = await saveMock(
          req.body.operationName,
          req.body.variables,
          JSON.stringify(req.body),
          response
        );
        console.log(`[GraphQL-proxy][Record] Mock saved at ${mockFilePath}`);
      }
      return res.status(result.status).json(response);
    }
    throw new Error("Couldn't call github API");
  } catch (e) {
    // return same shaped error object
    console.error("[GraphQL-proxy]", (e as NodeJS.ErrnoException).message);
    return res
      .status(500)
      .json({ errors: [{ message: (e as NodeJS.ErrnoException).message }] });
  }
};
