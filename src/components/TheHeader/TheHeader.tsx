import { useState } from "react";
import Link from "next/link";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";
import AppDarkModeSwitch from "../AppDarkModeSwitch/AppDarkModeSwitch";

type LinkOptionsType = {
  target?: "_blank";
};

const links: [string, string, LinkOptionsType][] = [
  ["/", "Home", {}],
  ["/topheman", "/topheman", {}],
  ["/topheman?tab=repositories", "/topheman?tab=repositories", {}],
  ["/topheman/nextjs-movie-browser", "/topheman/nextjs-movie-browser", {}],
  ["/warpdesign", "/warpdesign", {}],
  ["/warpdesign?tab=repositories", "/warpdesign?tab=repositories", {}],
  ["/warpdesign/react-explorer", "/warpdesign/react-explorer", {}],
  ["/facebook", "/facebook", {}],
  ["/facebook/react", "/facebook/react", {}],
  ["/a", "/a (no profile readme)", {}],
  process.env.NODE_ENV === "production"
    ? [
        "/explore/storybook/index.html",
        "explore storybook",
        { target: "_blank" },
      ]
    : null,
  ["/about", "About", {}],
].filter(Boolean);

export default function TheHeader(): JSX.Element {
  const [showDrawer, setShowDrawer] = useState(false);
  const open = () => setShowDrawer(true);
  const close = () => setShowDrawer(false);
  return (
    <>
      <header className="h-12 bg-brand-primary shadow-lg">
        <div className="flex items-center p-2 h-full">
          <button
            type="button"
            className="w-10 h-10 text-brand-secondary hover:bg-brand-primary-light focus:bg-brand-primary-light rounded-full focus:outline-none"
            onClick={open}
            aria-label="Open"
          >
            <HamburgerIcon className="inline-block w-6 h-6 text-center fill-current" />
          </button>
          <h1 className="m-2 text-brand-secondary">
            <Link href="/">nextjs-github-browser</Link>
          </h1>
          <AppDarkModeSwitch />
        </div>
      </header>
      <DialogOverlay isOpen={showDrawer} onDismiss={close}>
        <DialogContent
          style={{
            width: "80vw",
            maxWidth: "320px",
            height: "100%",
            margin: "0",
          }}
          aria-label="Links"
        >
          <div className="pt-4">
            <button
              type="button"
              className="absolute top-1 left-2 w-10 h-10 text-brand-secondary hover:text-brand-secondary focus:text-primary hover:bg-brand-primary-light rounded-full focus:outline-none"
              onClick={close}
              aria-label="Close"
            >
              <CloseIcon className="inline-block w-6 h-6 text-center fill-current" />
            </button>
            {links.map(([href, title, options]) => (
              <li key={href} className="list-none hover:text-secondary">
                <Link href={href}>
                  <a {...options}>{title}</a>
                </Link>
              </li>
            ))}
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
