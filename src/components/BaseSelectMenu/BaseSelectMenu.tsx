import React, { useState, useEffect, useRef } from "react";
import { XIcon } from "@primer/octicons-react";
import clsx from "clsx";

import BaseButton from "../BaseButton/BaseButton";

export type BaseSelectMenuProps = {
  buttonLabel: string;
  menuLabel?: string;
  children: React.ReactChild | React.ReactChild[];
  alignMenu: "left" | "right";
  icon?: JSX.Element;
  className?: string;
};

export default function BaseSelectMenu({
  buttonLabel,
  menuLabel,
  className,
  children,
  alignMenu,
  icon,
  ...props
}: BaseSelectMenuProps): JSX.Element | null {
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
        <BaseButton
          hasMenu
          label={buttonLabel}
          size="medium"
          onClick={toggle}
          icon={icon}
          className="relative z-10"
        >
          {buttonLabel}
        </BaseButton>
        <>
          <div
            className={clsx(
              !open ? "hidden" : "",
              "fixed sm:absolute top-1/2 sm:top-auto sm:right-0 left-1/2 z-50 sm:mt-1 w-11/12 sm:w-72 text-lg sm:text-sm text-primary rounded-md border border-light shadow-lg -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 bg-primary",
              alignMenu === "right" ? "sm:left-auto" : "sm:left-0"
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
            <div className="overflow-scroll mb-[-1px] max-h-80 md:max-h-96">
              {children}
            </div>
          </div>
          <div
            className={clsx(
              !open ? "hidden" : "sm:hidden bg-opacity-70",
              "fixed inset-0 z-10 transition-opacity bg-brand-secondary"
            )}
          />
        </>
      </div>
    </>
  );
}
