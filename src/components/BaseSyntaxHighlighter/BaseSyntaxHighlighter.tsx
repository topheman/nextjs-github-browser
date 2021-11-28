import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter";

import { getLanguageFromFilename } from "./helpers";

// from react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a11yDark = {
  "hljs-comment": {
    color: "#d4d0ab",
  },
  "hljs-quote": {
    color: "#d4d0ab",
  },
  "hljs-variable": {
    color: "#ffa07a",
  },
  "hljs-template-variable": {
    color: "#ffa07a",
  },
  "hljs-tag": {
    color: "#ffa07a",
  },
  "hljs-name": {
    color: "#ffa07a",
  },
  "hljs-selector-id": {
    color: "#ffa07a",
  },
  "hljs-selector-class": {
    color: "#ffa07a",
  },
  "hljs-regexp": {
    color: "#ffa07a",
  },
  "hljs-deletion": {
    color: "#ffa07a",
  },
  "hljs-number": {
    color: "#f5ab35",
  },
  "hljs-built_in": {
    color: "#f5ab35",
  },
  "hljs-builtin-name": {
    color: "#f5ab35",
  },
  "hljs-literal": {
    color: "#f5ab35",
  },
  "hljs-type": {
    color: "#f5ab35",
  },
  "hljs-params": {
    color: "#f5ab35",
  },
  "hljs-meta": {
    color: "#f5ab35",
  },
  "hljs-link": {
    color: "#f5ab35",
  },
  "hljs-attribute": {
    color: "#ffd700",
  },
  "hljs-string": {
    color: "#abe338",
  },
  "hljs-symbol": {
    color: "#abe338",
  },
  "hljs-bullet": {
    color: "#abe338",
  },
  "hljs-addition": {
    color: "#abe338",
  },
  "hljs-title": {
    color: "#00e0e0",
  },
  "hljs-section": {
    color: "#00e0e0",
  },
  "hljs-keyword": {
    color: "#dcc6e0",
  },
  "hljs-selector-tag": {
    color: "#dcc6e0",
  },
  hljs: {
    display: "block",
    overflowX: "auto",
    background: "#2b2b2b",
    color: "#f8f8f2",
    padding: "0.5em",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
  "hljs-strong": {
    fontWeight: "bold",
  },
};

// from react-syntax-highlighter/dist/esm/styles/hljs/a11y-light
const a11yLight = {
  "hljs-comment": {
    color: "#696969",
  },
  "hljs-quote": {
    color: "#696969",
  },
  "hljs-variable": {
    color: "#d91e18",
  },
  "hljs-template-variable": {
    color: "#d91e18",
  },
  "hljs-tag": {
    color: "#d91e18",
  },
  "hljs-name": {
    color: "#d91e18",
  },
  "hljs-selector-id": {
    color: "#d91e18",
  },
  "hljs-selector-class": {
    color: "#d91e18",
  },
  "hljs-regexp": {
    color: "#d91e18",
  },
  "hljs-deletion": {
    color: "#d91e18",
  },
  "hljs-number": {
    color: "#aa5d00",
  },
  "hljs-built_in": {
    color: "#aa5d00",
  },
  "hljs-builtin-name": {
    color: "#aa5d00",
  },
  "hljs-literal": {
    color: "#aa5d00",
  },
  "hljs-type": {
    color: "#aa5d00",
  },
  "hljs-params": {
    color: "#aa5d00",
  },
  "hljs-meta": {
    color: "#aa5d00",
  },
  "hljs-link": {
    color: "#aa5d00",
  },
  "hljs-attribute": {
    color: "#aa5d00",
  },
  "hljs-string": {
    color: "#008000",
  },
  "hljs-symbol": {
    color: "#008000",
  },
  "hljs-bullet": {
    color: "#008000",
  },
  "hljs-addition": {
    color: "#008000",
  },
  "hljs-title": {
    color: "#007faa",
  },
  "hljs-section": {
    color: "#007faa",
  },
  "hljs-keyword": {
    color: "#7928a1",
  },
  "hljs-selector-tag": {
    color: "#7928a1",
  },
  hljs: {
    display: "block",
    overflowX: "auto",
    background: "#fefefe",
    color: "#545454",
    padding: "0.5em",
  },
  "hljs-emphasis": {
    fontStyle: "italic",
  },
  "hljs-strong": {
    fontWeight: "bold",
  },
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
      style={a11yLight}
      className={clsx(className)}
      showLineNumbers
      {...props}
    >
      {code}
    </SyntaxHighlighter>
  );
}
