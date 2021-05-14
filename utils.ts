export function parseBooleanEnvVar(boolValueFromENV, defaultValue = false) {
  let result;
  try {
    result = Boolean(JSON.parse(boolValueFromENV));
  } catch (_) {
    result = defaultValue;
  }
  return result;
}
