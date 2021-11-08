import {
  getMockFilePath as _getMockFilePath,
  saveMock as _saveMock,
  loadMock as _loadMock,
  loadAllMocks as _loadAllMocks,
  GetMockFilePathOptionsType,
  ManageMockOptionsType,
} from "../libs/mocks/node";

type OptionsType = Omit<
  ManageMockOptionsType,
  "rootMockDirectory" | "endpoint"
>;

// will do it by providing factories of functions in src/libs/mocks in the future

function getOptions(options: Record<string, unknown> = {}) {
  return {
    rootMockDirectory: () =>
      // need to `require` native node module so that they will work inside cypress (if you want to use the cypress plugin)
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      require("path").join(
        process.cwd(),
        process.env.MOCKS_TARGET || ".tmp/.mocks"
      ),
    endpoint: process.env.GRAPHQL_API_ROOT_ENDPOINT as string,
    ...options,
  };
}

export function getMockFilePath(
  operationName: string,
  variables: Record<string, unknown>,
  options: Partial<GetMockFilePathOptionsType>
): string {
  return _getMockFilePath(operationName, variables, getOptions(options));
}

export function saveMock(
  operationName: string,
  variables: Record<string, unknown>,
  requestBody: string,
  responseBody: string,
  options?: OptionsType
): Promise<string> {
  return _saveMock(
    operationName,
    variables,
    requestBody,
    responseBody,
    getOptions(options)
  );
}

export function loadMock(
  operationName: string,
  variables: Record<string, unknown>,
  options?: OptionsType
): Promise<unknown | null> {
  return _loadMock(operationName, variables, getOptions(options));
}

export async function loadAllMocks(
  options?: OptionsType
): Promise<Map<string, unknown> | null> {
  return _loadAllMocks(getOptions(options));
}
