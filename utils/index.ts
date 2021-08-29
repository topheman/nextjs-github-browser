export function parseBooleanEnvVar(
  boolValueFromENV?: string,
  defaultValue = false
): boolean {
  let result;
  try {
    result = Boolean(JSON.parse(boolValueFromENV as string));
  } catch (_) {
    result = defaultValue;
  }
  return result;
}
