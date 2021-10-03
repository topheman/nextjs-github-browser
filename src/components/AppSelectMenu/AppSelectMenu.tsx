import { useState, useEffect, useRef } from "react";
import { CheckIcon, TriangleDownIcon, XIcon } from "@primer/octicons-react";
import clsx from "clsx";

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
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const close = (e: MouseEvent) => {
    if (e.target === buttonRef.current) {
      return;
    }
    setOpen(false);
  };
  const internalOnChange = (newValue: T) => {
    onChange(newValue);
    setOpen(false);
  };
  const makeHandleKeypress = (
    newValue: T
  ): React.KeyboardEventHandler<HTMLLIElement> => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      internalOnChange(newValue);
    }
  };
  useEffect(() => {
    if (open) {
      document.addEventListener("click", close);
    }
    return () => {
      document.removeEventListener("click", close);
    };
  }, [open]);
  return (
    <>
      <div {...props} className={clsx("sm:relative", className)}>
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          className={clsx(
            "py-1 px-3 font-bold text-primary bg-primary hover:bg-primary-hover focus:bg-primary-focus active:bg-primary-active rounded-md border border-light hover:border-primary-hover focus:border-primary-hover active:border-primary-hover focus:outline-none",
            className
          )}
        >
          {buttonLabel}
          <TriangleDownIcon />
        </button>
        <div
          className={clsx(
            !open ? "hidden" : "",
            "overflow-hidden fixed sm:absolute top-1/2 sm:top-auto sm:right-0 left-1/2 sm:left-auto sm:mt-1 w-11/12 sm:w-72 text-lg sm:text-sm text-primary bg-primary rounded-md border border-light -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0"
          )}
        >
          {menuLabel ? (
            <header className="flex pl-1 w-full border-b border-light">
              <span className="flex-1">{menuLabel}</span>
              <button type="button" onClick={() => close} className="px-1">
                <XIcon className="text-secondary hover:text-primary fill-current" />
              </button>
            </header>
          ) : null}
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
                  className={clsx(
                    value === currentValue ? "visible" : "invisible"
                  )}
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
