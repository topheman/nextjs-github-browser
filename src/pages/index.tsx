import { useEffect } from "react";
import { useLocalStorage } from "../utils/hooks";

import TheHome from "../components/TheHome/TheHome";

export default function PageIndex(): JSX.Element {
  const LOCALSTORAGE_KEY = "HELP_ENABLED";
  const [isHelpEnabled, enableHelp] = useLocalStorage(LOCALSTORAGE_KEY, true);
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(
      `[DEV] Help is controled by the localStorage key "${LOCALSTORAGE_KEY}", to reset it you can call resetHelp() in the console (only available in dev mode)`
    );
  }
  useEffect(() => {
    (window as Window &
      typeof globalThis & { resetHelp: () => void }).resetHelp = () =>
      enableHelp(true);
  }, [enableHelp]);
  return (
    <TheHome helpActive={isHelpEnabled} onExit={() => enableHelp(false)} />
  );
}
