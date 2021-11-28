import Link from "next/link";
import processByteSize from "byte-size";

import BaseBoxWithHeader from "../BaseBoxWithHeader/BaseBoxWithHeader";
import BaseSyntaxHighlighter, {
  BaseSyntaxHighlighterProps,
} from "../BaseSyntaxHighlighter/BaseSyntaxHighlighter";

export type AppBlobDisplayProps = {
  byteSize: number;
  rawHref: {
    pathname: string;
    query: Record<string, string>;
  };
  className?: string;
} & BaseSyntaxHighlighterProps;

const MAX_BYTE_SIZE = 800_000;

export default function AppBlobDisplay({
  code,
  fileName,
  byteSize,
  language,
  rawHref,
  className,
}: AppBlobDisplayProps): JSX.Element | null {
  const codeWithoutLastLineBreak = code.replace(/\n$/, "");
  const numberOfLines = codeWithoutLastLineBreak.split("\n").length;
  const sourceLinesOfCode = code
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean).length;
  const size = processByteSize(byteSize, {
    units: "iec",
    precision: 2,
    locale: "en",
  });
  if (byteSize > MAX_BYTE_SIZE) {
    return (
      <div className="py-10 text-center">
        File too big to be displayed ({size.value} {size.unit})
      </div>
    );
  }
  return (
    <BaseBoxWithHeader
      header={
        <div className="flex items-baseline">
          <div className="flex-1">
            {numberOfLines} lines ({sourceLinesOfCode}{" "}
            <abbr
              title="Source Lines Of Code"
              style={{ textDecoration: "none" }}
            >
              sloc
            </abbr>
            ){" | "} {size.value} {size.unit}
          </div>
          <Link href={rawHref}>
            <a className="hidden p-1 text-sm rounded-lg border border-light">
              Raw
            </a>
          </Link>
        </div>
      }
      className={className}
    >
      <BaseSyntaxHighlighter
        code={codeWithoutLastLineBreak}
        fileName={fileName}
        language={language}
        className="text-sm"
        itemProp="text"
      />
    </BaseBoxWithHeader>
  );
}
