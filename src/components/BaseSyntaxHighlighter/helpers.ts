/**
 * Mapping between extension and language
 * https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/async-languages/hljs.js
 */

export function getLanguageFromFilename(fileName: string): string | null {
  const extracted = fileName.split(".");
  const matchedExtension = extracted[extracted.length - 1].toLowerCase();
  const MAPPING = {
    typescript: ["ts", "tsx"],
    javascript: ["js", "jsx"],
    rust: ["rs"],
    makefile: ["makefile"],
    shell: ["sh"],
    coffee: ["coffeescript"],
    yaml: ["yaml", "yml"],
  };
  let matchedLanguage = null;
  Object.entries(MAPPING).forEach(([language, extensions]) => {
    if (extensions.includes(matchedExtension)) {
      matchedLanguage = language;
    }
  });
  return matchedLanguage;
}
