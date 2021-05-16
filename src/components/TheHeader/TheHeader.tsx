import Link from "next/link";
import React from "react";

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

export default function TheHeader(
  props: React.HTMLProps<HTMLElement>
): JSX.Element {
  return (
    <header {...props}>
      <ul className="bg-primary text-primary">
        {links.map(([href, title]) => (
          <li key={href} className="hover:text-secondary">
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
