import { useEffect, useState } from "react";

export type AppDarkModeSwitchProps = never;

// todo better UI

export default function AppDarkModeSwitch(): JSX.Element {
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
    <label htmlFor="dark-mode-switch">
      <input
        id="dark-mode-switch"
        type="checkbox"
        onInput={() => setDarkMode(!darkMode)}
        checked={darkMode}
      />{" "}
      Dark mode
    </label>
  );
}
