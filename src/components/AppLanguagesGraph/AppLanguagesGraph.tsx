import clsx from "clsx";

export type AppLanguagesGraphProps = {
  languages: ({
    size: number;
    node: { name: string; color?: string | null };
  } | null)[];
  className?: string;
};

export default function AppLanguagesGraph({
  languages,
  className,
  ...props
}: AppLanguagesGraphProps): JSX.Element | null {
  const fullSize = languages.reduce(
    (sum, language) => sum + (language?.size || 0),
    0
  );
  return (
    <span
      className={clsx(className, "flex overflow-hidden h-2 rounded")}
      {...props}
    >
      {languages
        .map((language) => {
          if (!language) {
            return null;
          }
          const percentage = ((100 * language.size) / fullSize).toFixed(1);
          // dont display languages at 0.0%
          if (!Number(percentage)) {
            return null;
          }
          return (
            <span
              key={language.node.name}
              style={{
                backgroundColor: language.node.color || "black",
                width: `${percentage}%`,
              }}
              aria-label={`${language.node.name} ${percentage}`}
              itemProp="keywords"
            />
          );
        })
        .filter(Boolean)}
    </span>
  );
}
