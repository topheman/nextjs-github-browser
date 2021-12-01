import clsx from "clsx";

import BaseTag from "../BaseTag/BaseTag";

export type AppTopicsTagListProps = {
  className?: string;
  topics?: ({ topic: { name: string } } | null | undefined)[] | null;
};

export default function AppTopicsTagList({
  topics,
  className,
}: AppTopicsTagListProps): JSX.Element | null {
  if (topics && topics.length > 0) {
    return (
      <ul className={clsx(className)}>
        {topics.filter(Boolean).map(({ topic }) => {
          return (
            <li className="inline-block" key={topic.name}>
              <BaseTag color="brand-primary" className="mr-1">
                {topic.name}
              </BaseTag>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
}
