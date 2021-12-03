import Toggle from "react-toggle";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@primer/octicons-react";

import { useLocalStorage } from "../../utils/hooks";

export type AppDarkModeSwitchProps = {
  className?: string;
};

export default function AppDarkModeSwitch({
  className,
  ...props
}: AppDarkModeSwitchProps): JSX.Element | null {
  const [darkMode, setDarkMode] = useLocalStorage("DARKMODE", false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("default-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("default-mode");
    }
  }, [darkMode]);

  if (isClient) {
    return (
      <label
        className={className}
        {...props}
        htmlFor="dark-mode-switch"
        title={`Switch to ${darkMode ? "light" : "dark"} mode`}
      >
        <Toggle
          id="dark-mode-switch"
          defaultChecked={darkMode}
          onChange={() => setDarkMode((mode) => !mode)}
          icons={{
            checked: <MoonIcon className="absolute top-[-3px] left-[-1px]" />,
            unchecked: <SunIcon className="absolute top-[-3px] left-[-2px]" />,
          }}
        />
        <span className="sr-only">{`Switch to ${
          darkMode ? "light" : "dark"
        } mode`}</span>
      </label>
    );
  }
  return null;
}
