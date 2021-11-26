import { forwardRef, useState } from "react";
import clsx from "clsx";

export type BaseSearchInputProps = {
  onSubmit: (value: string) => void;
  placeholder: string;
  size?: "normal";
} & React.HTMLProps<HTMLDivElement>;

const BaseSearchInput = forwardRef<HTMLInputElement, BaseSearchInputProps>(
  ({ onSubmit, placeholder, className }, ref) => {
    const [value, setValue] = useState("");
    return (
      <form
        // To have a "Search" button on mobile virtual keyboards
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={clsx(
            "px-2 w-full h-8 leading-7 rounded border border-light",
            className
          )}
        />
      </form>
    );
  }
);
BaseSearchInput.displayName = "BaseSearchInput";

export default BaseSearchInput;
