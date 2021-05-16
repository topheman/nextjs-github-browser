/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

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
  console.log(
    "[GraphQL-proxy]",
    "fetching",
    req.method,
    req.url,
    req.body.variables
  );
  try {
    const result = await fetch(process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: new Headers({
        Authorization: `Bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN}`,
      }),
    });
    if (result.ok) {
      const response = await result.text();
      return res.status(result.status).json(response);
    }
    throw new Error("Couldn't call github API");
  } catch (e) {
    // return same shaped error object
    console.error("[GraphQL-proxy]", e.message);
    return res.status(500).json({ errors: [{ message: e.message }] });
  }
};
