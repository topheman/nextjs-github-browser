/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
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

export function getMockFileName(
  operationName: string,
  variables: Record<string, unknown>,
  { isRequest = false }: { isRequest: boolean }
): string {
  return `${operationName}_${generateMockIdFromGraphqlVariables(variables)}${
    isRequest ? "_request" : ""
  }.json`;
}
