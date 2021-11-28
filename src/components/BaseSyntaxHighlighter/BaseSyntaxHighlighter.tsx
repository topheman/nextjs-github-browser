import clsx from "clsx";

export type BaseSyntaxHighlighterProps = {
  code: string;
} & React.HTMLProps<HTMLPreElement>;

export default function BaseSyntaxHighlighter({
  code,
  className,
  ...props
}: BaseSyntaxHighlighterProps): JSX.Element | null {
  return (
    <pre {...props} className={clsx(className)}>
      {code}
    </pre>
  );
}
