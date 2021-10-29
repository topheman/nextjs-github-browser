import { CheckIcon } from "@primer/octicons-react";
import clsx from "clsx";

import BaseSelectMenu from "../BaseSelectMenu/BaseSelectMenu";

type OptionType<T extends string | number> = { value: T; label: string };

export type AppSelectMenuProps<T extends string | number> = {
  value: T;
  options: OptionType<T>[];
  buttonLabel: string;
  menuLabel?: string;
  onChange: (newValue: T) => void;
  className?: string;
};

export default function AppSelectMenu<T extends string | number>({
  value: currentValue,
  options,
  buttonLabel,
  menuLabel,
  onChange,
  className,
  ...props
}: AppSelectMenuProps<T>): JSX.Element {
  const internalOnChange = (newValue: T) => {
    onChange(newValue);
  };
  const makeHandleKeypress = (
    newValue: T
  ): React.KeyboardEventHandler<HTMLLIElement> => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      internalOnChange(newValue);
    }
  };
  return (
    <BaseSelectMenu
      {...props}
      buttonLabel={buttonLabel}
      menuLabel={menuLabel}
      className={className}
    >
      <ul className="mb-[-1px]">
        {options.map(({ label, value }) => (
          <li
            key={label}
            role="menuitem"
            onClick={() => internalOnChange(value)}
            className="flex py-1 pl-4 w-full hover:bg-primary-hover border-b border-light cursor-pointer"
            tabIndex={0}
            onKeyDown={makeHandleKeypress(value)}
          >
            <CheckIcon
              className={clsx(value === currentValue ? "visible" : "invisible")}
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </BaseSelectMenu>
  );
}
