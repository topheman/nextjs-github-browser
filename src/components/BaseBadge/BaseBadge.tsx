export type BaseBadgeProps = {
  badgeContent: string | number;
} & React.HTMLProps<HTMLSpanElement>;

BaseBadge.defaultProps = {
  className: "",
};

export default function BaseBadge({
  badgeContent,
  className,
  ...props
}: BaseBadgeProps): JSX.Element {
  return badgeContent ? (
    <span
      className={`inline-flex justify-center items-center py-1 px-2 text-xs font-bold leading-none text-white bg-brand-primary rounded-full ${className}`}
      {...props}
    >
      {badgeContent}
    </span>
  ) : (
    <span
      className={`inline-block w-2 h-2 text-brand-primary-light bg-brand-primary rounded-full ${className}`}
    />
  );
}
