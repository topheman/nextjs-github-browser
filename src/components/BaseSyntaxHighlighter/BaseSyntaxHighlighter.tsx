import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter";

import { getLanguageFromFilename } from "./helpers";

/**
 * This theme was generated from:
 * - react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark
 * - react-syntax-highlighter/dist/esm/styles/hljs/a11y-light
 *
 * Use ./prepareTheme.js
 */
const theme = {
  "hljs-comment": { color: "var(--hljs-color-hljs-comment)" },
  "hljs-quote": { color: "var(--hljs-color-hljs-quote)" },
  "hljs-variable": { color: "var(--hljs-color-hljs-variable)" },
  "hljs-template-variable": {
    color: "var(--hljs-color-hljs-template-variable)",
  },
  "hljs-tag": { color: "var(--hljs-color-hljs-tag)" },
  "hljs-name": { color: "var(--hljs-color-hljs-name)" },
  "hljs-selector-id": { color: "var(--hljs-color-hljs-selector-id)" },
  "hljs-selector-class": { color: "var(--hljs-color-hljs-selector-class)" },
  "hljs-regexp": { color: "var(--hljs-color-hljs-regexp)" },
  "hljs-deletion": { color: "var(--hljs-color-hljs-deletion)" },
  "hljs-number": { color: "var(--hljs-color-hljs-number)" },
  "hljs-built_in": { color: "var(--hljs-color-hljs-built_in)" },
  "hljs-builtin-name": { color: "var(--hljs-color-hljs-builtin-name)" },
  "hljs-literal": { color: "var(--hljs-color-hljs-literal)" },
  "hljs-type": { color: "var(--hljs-color-hljs-type)" },
  "hljs-params": { color: "var(--hljs-color-hljs-params)" },
  "hljs-meta": { color: "var(--hljs-color-hljs-meta)" },
  "hljs-link": { color: "var(--hljs-color-hljs-link)" },
  "hljs-attribute": { color: "var(--hljs-color-hljs-attribute)" },
  "hljs-string": { color: "var(--hljs-color-hljs-string)" },
  "hljs-symbol": { color: "var(--hljs-color-hljs-symbol)" },
  "hljs-bullet": { color: "var(--hljs-color-hljs-bullet)" },
  "hljs-addition": { color: "var(--hljs-color-hljs-addition)" },
  "hljs-title": { color: "var(--hljs-color-hljs-title)" },
  "hljs-section": { color: "var(--hljs-color-hljs-section)" },
  "hljs-keyword": { color: "var(--hljs-color-hljs-keyword)" },
  "hljs-selector-tag": { color: "var(--hljs-color-hljs-selector-tag)" },
  hljs: {
    display: "var(--hljs-display-hljs)",
    overflowX: "var(--hljs-overflowX-hljs)",
    background: "var(--color-bg-canvas)", // use the background color of the site
    color: "var(--hljs-color-hljs)",
    padding: "var(--hljs-padding-hljs)",
  },
  "hljs-emphasis": { fontStyle: "var(--hljs-fontStyle-hljs-emphasis)" },
  "hljs-strong": { fontWeight: "var(--hljs-fontWeight-hljs-strong)" },
};

export type BaseSyntaxHighlighterProps = {
  code: string;
  fileName: string;
  language?: string;
  className?: string;
} & React.HTMLAttributes<HTMLPreElement>;

export default function BaseSyntaxHighlighter({
  code,
  fileName,
  language,
  className,
  ...props
}: BaseSyntaxHighlighterProps): JSX.Element | null {
  return (
    <SyntaxHighlighter
      language={language || getLanguageFromFilename(fileName) || undefined}
      style={theme}
      className={clsx(className)}
      showLineNumbers
      {...props}
    >
      {code}
    </SyntaxHighlighter>
  );
}
