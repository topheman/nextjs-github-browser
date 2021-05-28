import { useState } from "react";
import Link from "next/link";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";

const links = [
  ["/", "Home"],
  ["/topheman", "/topheman"],
  ["/topheman?tab=repositories", "/topheman?tab=repositories"],
  ["/topheman/nextjs-movie-browser", "/topheman/nextjs-movie-browser"],
  ["/warpdesign", "/warpdesign"],
  ["/warpdesign?tab=repositories", "/warpdesign?tab=repositories"],
  ["/warpdesign/react-explorer", "/warpdesign/react-explorer"],
  ["/facebook", "/facebook"],
  ["/facebook/react", "/facebook/react"],
  ["/a", "/a (no profile readme)"],
  ["/about", "About"],
];

export default function TheHeader(): JSX.Element {
  const [showDrawer, setShowDrawer] = useState(false);
  const open = () => setShowDrawer(true);
  const close = () => setShowDrawer(false);
  return (
    <>
      <header className="bg-brand-primary h-12 shadow-lg">
        <div className="flex h-full items-center p-2">
          <button
            type="button"
            className="h-10 w-10 rounded-full text-brand-secondary focus:outline-none focus:bg-brand-primary-light hover:bg-brand-primary-light"
            onClick={open}
            aria-label="Open"
          >
            <HamburgerIcon className="h-6 w-6 inline-block text-center fill-current" />
          </button>
          <h1 className="text-brand-secondary m-2">
            <Link href="/">nextjs-github-browser</Link>
          </h1>
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
              className="h-10 w-10 absolute top-1 left-2 rounded-full text-brand-secondary focus:outline-none focus:text-primary hover:bg-brand-primary-light hover:text-brand-secondary"
              onClick={close}
              aria-label="Close"
            >
              <CloseIcon className="h-6 w-6 fill-current text-center inline-block" />
            </button>
            {links.map(([href, title]) => (
              <li key={href} className="text-s list-none hover:text-secondary">
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
