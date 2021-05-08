import Link from "next/link";
import React from "react";

const links = [
  ["/", "Home"],
  ["/topheman", "User topheman"],
  ["/warpdesign", "User warpdesign"],
  ["/facebook", "Organization facebook"],
  ["/about", "About"],
];

export default function TheHeader(props: React.HTMLProps<HTMLElement>) {
  return (
    <header {...props}>
      <ul>
        {links.map(([href, title]) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
