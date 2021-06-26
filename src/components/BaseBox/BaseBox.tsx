export type BaseBoxProps = React.HTMLProps<HTMLDivElement>;

export default function BaseBox({
  children,
  className,
}: BaseBoxProps): JSX.Element {
  return (
    <div className={`rounded-md border border-light ${className}`}>
      {children}
    </div>
  );
}
