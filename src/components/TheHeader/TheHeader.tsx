import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import "@reach/dialog/styles.css";
import style from "./style.module.css";

import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";
import AppDarkModeSwitch from "../AppDarkModeSwitch/AppDarkModeSwitch";

type LinkOptionsType = {
  target?: "_blank";
};

export default function TheHeader(): JSX.Element {
  const router = useRouter();
  // const { owner, repositoryName } = router.query;
  const [showDrawer, setShowDrawer] = useState(false);
  const open = () => setShowDrawer(true);
  const close = () => setShowDrawer(false);
  useEffect(() => {
    router.events.on("routeChangeComplete", close);
    return () => {
      router.events.off("routeChangeComplete", close);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const links: [string | null, string, LinkOptionsType][] = [
    ["/", "Home", {}],
    process.env.NODE_ENV === "production"
      ? ["/explore/storybook/index.html", "Storybook", { target: "_blank" }]
      : null,
    [null, "separator-1", {}],
    ["https://github.com/topheman/nextjs-github-browser", "Github", {}],
    ["https://twitter.com/topheman", "Twitter", {}],
  ].filter(Boolean);
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
      <DialogOverlay
        isOpen={showDrawer}
        onDismiss={close}
        className={style.dialog}
      >
        <DialogContent
          style={{
            width: "80vw",
            maxWidth: "320px",
            height: "100%",
            margin: "0",
          }}
          aria-label="Links"
        >
          <div className="pt-10">
            <button
              type="button"
              className="absolute top-1 left-2 w-10 h-10 text-brand-secondary hover:text-brand-secondary focus:text-primary hover:bg-brand-primary-light rounded-full focus:outline-none"
              onClick={close}
              aria-label="Close"
            >
              <CloseIcon className="inline-block w-6 h-6 text-center fill-current" />
            </button>
            {links.map(([href, title]) => {
              if (href && title) {
                return (
                  <li
                    key={title}
                    className="list-none hover:text-secondary break-words"
                  >
                    <Link href={href}>
                      <a className=" block py-2 px-2 hover:bg-brand-secondary">
                        {title}
                      </a>
                    </Link>
                  </li>
                );
              }
              return <li key={title} className="list-none border" />;
            })}
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
