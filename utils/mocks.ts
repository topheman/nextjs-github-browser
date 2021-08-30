/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
/**
 * Those are functions to be used server-side to:
 * - record mocks (inside the /api/github/graphql handler) : `saveMock`
 * - to setup mocks on a mock server / check api state : `loadMock`
 */

import fsPromises from "fs/promises";
import path from "path";

function getRootMockDirectory(): string {
  return path.join(process.cwd(), ".tmp", ".mocks");
}

function generateMockIdFromGraphqlVariables(
  variables: Record<string, unknown>
): string {
  const serializedVariablesSortedByKeyWithoutUndefined = Object.entries(
    variables
  )
    .filter(([, value]) => typeof value !== "undefined")
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => `${key}|${value}`)
    .join("");
  const hashed = require("hash.js")
    .sha256()
    .update(serializedVariablesSortedByKeyWithoutUndefined)
    .digest("hex");
  return hashed;
}

type ManageMockOptionsType = {
  rootMockDirectory?: () => string;
  endpoint?: string;
};

export function getMockFilePath(
  operationName: string,
  variables: Record<string, unknown>,
  {
    rootMockDirectory = getRootMockDirectory,
    endpoint = process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT as string,
  }: ManageMockOptionsType = {}
): string {
  const cleanEnpoint = endpoint.replace(/https?:\/\//, "");
  return path.join(
    rootMockDirectory(),
    cleanEnpoint,
    `${operationName}_${generateMockIdFromGraphqlVariables(variables)}.json`
  );
}

export async function saveMock(
  operationName: string,
  variables: Record<string, unknown>,
  body: string,
  options: ManageMockOptionsType = {}
): Promise<string> {
  const filePath = getMockFilePath(operationName, variables, options);
  const folderPath = path.dirname(filePath);
  // const fsPromises = require("fs/promises");
  await fsPromises.mkdir(folderPath, { recursive: true });
  await fsPromises.writeFile(filePath, body, "utf8");
  return filePath;
}

export async function loadMock(
  operationName: string,
  variables: Record<string, unknown>,
  {
    parse = true,
    ...getMockFilePathOptions
  }: ManageMockOptionsType & { parse?: boolean } = {}
): Promise<unknown | null> {
  const filePath = getMockFilePath(
    operationName,
    variables,
    getMockFilePathOptions
  );
  try {
    // can't use `require` - it's not available via next
    await fsPromises.stat(filePath); // check if file exists (readFile won't pass in catch)
    const promise = fsPromises.readFile(filePath, "utf8");
    if (!parse) {
      return promise;
    }
    const result = await promise;
    return JSON.parse(result.toString());
  } catch (e) {
    if (e.code === "ENOENT") {
      return null;
    }
    throw e;
  }
}
