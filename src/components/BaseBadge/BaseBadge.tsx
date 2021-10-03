import clsx from "clsx";

export type BaseBadgeProps = {
  badgeContent: string | number;
} & React.HTMLProps<HTMLSpanElement>;

export default function BaseBadge({
  badgeContent,
  className,
  ...props
}: BaseBadgeProps): JSX.Element {
  return badgeContent ? (
    <span
      {...props}
      className={clsx(
        "inline-flex justify-center items-center py-1 px-2 text-xs font-bold leading-none text-white bg-brand-primary rounded-full",
        className
      )}
    >
      {badgeContent}
    </span>
  ) : (
    <span
      {...props}
      className={clsx(
        "inline-block w-2 h-2 bg-brand-primary rounded-full",
        className
      )}
    />
  );
}
