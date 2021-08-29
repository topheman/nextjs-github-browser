/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
/**
 * Those are functions to be used server-side to:
 * - record mocks (inside the /api/github/graphql handler) : `saveMock`
 * - to setup mocks on a mock server / check api state : `loadMock`
 */

function getRootMockDirectory(): string {
  return require("path").join(process.cwd(), ".tmp", ".mocks");
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
  // return serializedVariablesSortedByKeyWithoutUndefined;
  const hashed = require("hash.js")
    .sha256()
    .update(serializedVariablesSortedByKeyWithoutUndefined)
    .digest("hex");
  return hashed;
}

type ManageMockOptionsType = { rootMockDirectory?: () => string };

export function getMockFilePath(
  operationName: string,
  variables: Record<string, unknown>,
  endpoint: string = process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT as string,
  { rootMockDirectory = getRootMockDirectory }: ManageMockOptionsType = {}
): string {
  const path = require("path");
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
  endpoint: string = process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT as string,
  options: ManageMockOptionsType = {}
): Promise<string> {
  const filePath = getMockFilePath(operationName, variables, endpoint, options);
  const folderPath = require("path").dirname(filePath);
  const fsPromises = require("fs/promises");
  await fsPromises.mkdir(folderPath, { recursive: true });
  await fsPromises.writeFile(filePath, body, "utf8");
  return filePath;
}

export function loadMock(
  operationName: string,
  variables: Record<string, unknown>,
  endpoint: string = process.env.GITHUB_GRAPHQL_API_ROOT_ENDPOINT as string,
  options: ManageMockOptionsType = {}
): unknown | null {
  const filePath = getMockFilePath(operationName, variables, endpoint, options);
  try {
    return require(filePath);
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      return null;
    }
    throw e;
  }
}
