import Link from "next/link";

import AppDarkModeSwitch from "../AppDarkModeSwitch/AppDarkModeSwitch";

export default function TheHeader(): JSX.Element {
  return (
    <>
      <header className="h-12 shadow-lg bg-brand-primary">
        <div className="flex items-center p-2 h-full">
          <h1 className="m-2 text-white-always">
            <Link href="/">nextjs-github-browser</Link>
          </h1>
          <AppDarkModeSwitch className="text-white" />
        </div>
      </header>
    </>
  );
}
