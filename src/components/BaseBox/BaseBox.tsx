import clsx from "clsx";

export type BaseBoxProps = React.HTMLProps<HTMLDivElement>;

export default function BaseBox({
  children,
  className,
  ...props
}: BaseBoxProps): JSX.Element {
  return (
    <div
      {...props}
      className={clsx("rounded-md border border-light", className)}
    >
      {children}
    </div>
  );
}
