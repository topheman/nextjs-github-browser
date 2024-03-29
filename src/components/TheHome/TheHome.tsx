import Link from "next/link";
import clsx from "clsx";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import BaseMetaTags, {
  commonMetaTagsExtractProps,
} from "../BaseMetaTags/BaseMetaTags";
import BaseSearchInput from "../BaseSearchInput/BaseSearchInput";
import AppListRoutePatterns from "../AppListRoutePatterns/AppListRoutePatterns";

import style from "./TheHome.module.css";

export type TheHomeProps = {
  helpActive: boolean;
  onExit?: () => void;
} & React.HTMLProps<HTMLDivElement>;

export default function TheHome({
  className,
  helpActive,
  onExit,
  ...props
}: TheHomeProps): JSX.Element {
  const profileLinks: [string, string][] = [
    ["/topheman", "@topheman"],
    ["/twitter", "@twitter"],
    ["/microsoft", "@microsoft"],
  ];
  const repositoryLinks: [string, string][] = [
    ["/microsoft/vscode", "microsoft/vscode"],
    ["/tailwindlabs/tailwindcss", "tailwindlabs/tailwindcs"],
    ["/facebook/react", "facebook/react"],
    ["/vuejs/vue", "vuejs/vue"],
    ["/angular/angular", "angular/angular"],
    ["/topheman/nextjs-movie-browser", "topheman/nextjs-movie-browser"],
    ["/topheman/nextjs-github-browser", "topheman/nextjs-github-browser"],
  ];
  const metaTagsProps = commonMetaTagsExtractProps({
    pathname: "/",
  });
  const router = useRouter();

  const searchButtonRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchButtonRef.current) {
      searchButtonRef.current.focus();
    }
  }, []);

  const [helpIndex, setHelpIndex] = useState(-1);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (!helpActive) {
          return;
        }
        if (helpIndex > 1) {
          setHelpIndex(-1);
        } else {
          setHelpIndex((s) => s + 1);
        }
      },
      helpIndex === -1 ? 800 : 3000
    );
    return () => clearTimeout(timer);
  }, [helpIndex, helpActive]);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      if (typeof onExit === "function") {
        onExit();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onExit]);

  return (
    <div className={className} {...props}>
      <BaseMetaTags
        {...metaTagsProps}
        title={metaTagsProps.siteName}
        twitterCard="summary_large_image"
      />

      <main className="px-2 lg:px-0 mx-auto mt-4 max-w-5xl">
        <h1 className="text-2xl">Home</h1>
        <p className="-mt-8 text-right">
          <a
            href="https://github.com/topheman/nextjs-github-browser"
            className="p-2 text-white-always hover:text-brand-primary rounded border border-brand-primary bg-brand-primary hover:bg-white-always"
            title="View source code directly on github"
          >
            Source code on github
          </a>
        </p>
        <div
          className={clsx(
            "mt-10 lg:mt-4 text-center",
            helpIndex === 0 && style.top
          )}
          data-help="👇 Search for a user"
        >
          <BaseSearchInput
            placeholder="Type a username ..."
            className="max-w-lg"
            onSearch={(value, { resetValue }) => {
              resetValue();
              router.push(`/${value}`);
            }}
            ref={searchButtonRef}
          />
        </div>
        <p className="mt-4">
          This project is a{" "}
          <strong className="text-brand-primary">
            <Link href="/vercel/next.js">
              <a title="NextJS">NextJS</a>
            </Link>
          </strong>{" "}
          partial implementation of the github website, based on their GraphQL
          api.
        </p>
        <p className="mt-4">
          The goal of this project is not to replace the github ui in any way
          but to get better in the following:
        </p>
        <ul
          className={clsx("ml-10 list-disc", helpIndex === 1 && style.right)}
          data-help="👈 Or follow one of these links"
        >
          <li>
            <Link href="/apollographql/apollo-client">
              <a
                title="appolo GraphQL"
                className="text-brand-primary hover:underline"
              >
                Apollo
              </a>
            </Link>{" "}
            /{" "}
            <Link href="/graphql">
              <a title="GraphQL" className="text-brand-primary hover:underline">
                GraphQL
              </a>
            </Link>
          </li>
          <li>
            <Link href="/microsoft/TypeScript">
              <a
                title="microsoft/TypeScript"
                className="text-brand-primary hover:underline"
              >
                TypeScript
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tailwindlabs/tailwindcss">
              <a
                title="tailwindlabs/tailwindcss"
                className="text-brand-primary hover:underline"
              >
                Tailwind
              </a>
            </Link>
          </li>
        </ul>
        <p className="mt-4">
          The <strong className="text-brand-primary">storybook</strong> of the
          project is also{" "}
          <Link href="/explore/storybook/index.html">
            <a target="_blank" className="text-brand-primary hover:underline">
              available online
            </a>
          </Link>
          .
        </p>
        <div className={clsx("md:flex")}>
          <div className={clsx("w-6/12")}>
            <p className="mt-4">Take a tour (and more):</p>
            <ul className="ml-10 list-disc">
              <li>
                Profile pages (user and organizations) - ex:
                <ul className="ml-10 list-disc">
                  {profileLinks.map(([href, label]) => {
                    return (
                      <li key={href}>
                        <Link href={href}>
                          <a className="text-brand-primary hover:underline">
                            {label}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                Repository pages - ex:
                <ul className="ml-10 list-disc">
                  {repositoryLinks.map(([href, label]) => {
                    return (
                      <li key={href}>
                        <Link href={href}>
                          <a className="text-brand-primary hover:underline">
                            {label}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <p>Show this QRCode to share the url of the website:</p>
            <p>
              <img
                className="inline-block"
                src="/qrcode.png"
                width="300"
                height="300"
                alt="QRCode to access website"
              />
            </p>
          </div>
        </div>
        <div className="mt-4">
          <AppListRoutePatterns className="overflow-scroll" />
        </div>
      </main>
    </div>
  );
}
