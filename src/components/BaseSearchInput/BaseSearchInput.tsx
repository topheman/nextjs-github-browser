import { forwardRef, useState } from "react";
import clsx from "clsx";

export type BaseSearchInputProps = React.HTMLProps<HTMLDivElement> & {
  onSearch: (value: string, { resetValue }: { resetValue: () => void }) => void;
  placeholder: string;
  size?: "normal";
};

const BaseSearchInput = forwardRef<HTMLInputElement, BaseSearchInputProps>(
  ({ onSearch, placeholder, className }, ref) => {
    const [value, setValue] = useState("");
    return (
      <form
        // To have a "Search" button on mobile virtual keyboards
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value, { resetValue: () => setValue("") });
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          name="search"
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
