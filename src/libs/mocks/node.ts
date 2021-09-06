/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
/**
 * Those are functions to be used server-side to:
 * - record mocks (inside the /api/github/graphql handler) : `saveMock`
 * - to setup mocks on a mock server / check api state : `loadMock`
 */

import { getMockFileName } from "./common";

// using require so that it will work in a node process of cypress if needed
const fsPromises = require("fs/promises");
const path = require("path");

export type ManageMockOptionsType = {
  rootMockDirectory: () => string;
  endpoint: string;
};

export type GetMockFilePathOptionsType = ManageMockOptionsType & {
  isRequest?: boolean;
};

function getMockFolderPath({
  endpoint,
  rootMockDirectory,
}: GetMockFilePathOptionsType): string {
  const cleanEnpoint = endpoint.replace(/https?:\/\//, "");
  return path.join(rootMockDirectory(), cleanEnpoint);
}

export function getMockFilePath(
  operationName: string,
  variables: Record<string, unknown>,
  { isRequest = false, rootMockDirectory, endpoint }: GetMockFilePathOptionsType
): string {
  return path.join(
    getMockFolderPath({ rootMockDirectory, endpoint }),
    getMockFileName(operationName, variables, { isRequest })
  );
}

export async function saveMock(
  operationName: string,
  variables: Record<string, unknown>,
  requestBody: string,
  responseBody: string,
  options: ManageMockOptionsType
): Promise<string> {
  const requestFilePath = getMockFilePath(operationName, variables, {
    ...options,
    isRequest: true,
  });
  const responseFilePath = getMockFilePath(operationName, variables, {
    ...options,
    isRequest: false,
  });
  const folderPath = path.dirname(requestFilePath);
  await fsPromises.mkdir(folderPath, { recursive: true });
  await Promise.all([
    fsPromises.writeFile(requestFilePath, requestBody, "utf8"),
    fsPromises.writeFile(responseFilePath, responseBody, "utf8"),
  ]);
  return responseFilePath;
}

export async function loadMock(
  operationName: string,
  variables: Record<string, unknown>,
  {
    parse = true,
    ...getMockFilePathOptions
  }: GetMockFilePathOptionsType & { parse?: boolean }
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

export async function loadAllMocks(
  options: GetMockFilePathOptionsType
): Promise<Map<string, unknown> | null> {
  try {
    const directory = getMockFolderPath(options);
    const files = (await fsPromises.readdir(directory)) as string[];
    const filesContent = await Promise.all(
      files.map(
        (fileName) =>
          fsPromises.readFile(
            path.join(directory, fileName),
            "utf8"
          ) as Promise<string>
      )
    );
    const result = files.reduce((acc, fileName, index) => {
      acc.set(fileName, JSON.parse(filesContent[index]));
      return acc;
    }, new Map());
    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
}
