import clsx from "clsx";
import React from "react";

// this is how you type a `as` prop in TypeScript 👇

type BaseBoxOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
};

const defaultElement = "div";

export type BaseBoxProps<E extends React.ElementType> = BaseBoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BaseBoxOwnProps>;

export default function BaseBox<
  E extends React.ElementType = typeof defaultElement
>({ children, className, as, ...props }: BaseBoxProps<E>): JSX.Element {
  const TagName = as || defaultElement;
  return (
    <TagName
      {...props}
      className={clsx("rounded-md border border-light", className)}
    >
      {children}
    </TagName>
  );
}
