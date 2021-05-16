export function parseBooleanEnvVar(
  boolValueFromENV: string,
  defaultValue = false
): boolean {
  let result;
  try {
    result = Boolean(JSON.parse(boolValueFromENV));
  } catch (_) {
    result = defaultValue;
  }
  return result;
}
