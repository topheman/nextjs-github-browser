import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@primer/octicons-react";
import clsx from "clsx";

export type AppDarkModeSwitchProps = {
  className?: string;
};

export default function AppDarkModeSwitch({
  className,
  ...props
}: AppDarkModeSwitchProps): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("default-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("default-mode");
    }
  }, [darkMode]);
  return (
    <label
      htmlFor="dark-mode-switch"
      className={clsx(className, "cursor-pointer")}
      title={`Switch to ${darkMode ? "light" : "dark"} mode`}
      {...props}
    >
      <button type="button" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <MoonIcon /> : <SunIcon className="text-[yellow]" />}
      </button>
    </label>
  );
}
