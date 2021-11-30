import clsx from "clsx";
import { DotFillIcon } from "@primer/octicons-react";

export type AppLanguagesListProps = {
  languages: ({
    size: number;
    node: { name: string; color?: string | null };
  } | null)[];
  className?: string;
};

export default function AppLanguagesList({
  languages,
  className,
  ...props
}: AppLanguagesListProps): JSX.Element | null {
  const fullSize = languages.reduce(
    (sum, language) => sum + (language?.size || 0),
    0
  );
  return (
    <ul className={clsx(className, "list-none")} {...props}>
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
            <li
              key={language.node.name}
              style={{
                color: language.node.color || "black",
              }}
              className="inline-flex mr-3"
            >
              <DotFillIcon className="h-5" />{" "}
              <span className="text-primary">
                <strong className="font-bold">{language.node.name}</strong>{" "}
                <span className="text-secondary">{percentage}%</span>
              </span>
            </li>
          );
        })
        .filter(Boolean)}
    </ul>
  );
}
