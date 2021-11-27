import clsx from "clsx";

export type App404Props = React.HTMLProps<HTMLDivElement>;

export default function App404({
  className,
  ...props
}: App404Props): JSX.Element {
  return (
    <div
      className={clsx(
        "flex flex-col gap-0 justify-center items-center h-screen",
        className
      )}
      {...props}
    >
      <p className="text-xl text-secondary">
        This feature is not yet supported.
      </p>
      <p className="mt-2 text-lg text-brand-primary">
        <button
          onClick={() => window.history.back()}
          type="button"
          className="hover:underline"
          title="Go back"
        >
          Back
        </button>
      </p>
    </div>
  );
}
