import Link from "next/link";
import React from "react";

import styles from "./TheHeader.module.css";

const links = [
  ["/", "Home"],
  ["/topheman", "/topheman"],
  ["/topheman/nextjs-movie-browser", "/topheman/nextjs-movie-browser"],
  ["/warpdesign", "/warpdesign"],
  ["/warpdesign/react-explorer", "/warpdesign/react-explorer"],
  ["/facebook", "/facebook"],
  ["/facebook/react", "/facebook/react"],
  ["/a", "/a (no profile readme)"],
  ["/about", "About"],
];

export default function TheHeader(props: React.HTMLProps<HTMLElement>) {
  return (
    <header {...props} className={styles.root}>
      <ul className="bg-yellow-300">
        {links.map(([href, title]) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
