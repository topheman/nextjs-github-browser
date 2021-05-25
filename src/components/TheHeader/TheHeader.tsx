import Link from "next/link";

import HamburgerIcon from "../icons/HamburgerIcon";

// const links = [
//   ["/", "Home"],
//   ["/topheman", "/topheman"],
//   ["/topheman?tab=repositories", "/topheman?tab=repositories"],
//   ["/topheman/nextjs-movie-browser", "/topheman/nextjs-movie-browser"],
//   ["/warpdesign", "/warpdesign"],
//   ["/warpdesign?tab=repositories", "/warpdesign?tab=repositories"],
//   ["/warpdesign/react-explorer", "/warpdesign/react-explorer"],
//   ["/facebook", "/facebook"],
//   ["/facebook/react", "/facebook/react"],
//   ["/a", "/a (no profile readme)"],
//   ["/about", "About"],
// ];

// {links.map(([href, title]) => (
//   <li key={href} className="hover:text-secondary">
//     <Link href={href}>{title}</Link>
//   </li>
// ))}

export default function TheHeader(): JSX.Element {
  return (
    <header className="bg-brand-primary h-12 shadow-lg">
      <div className="flex h-full items-center p-2">
        <button
          type="button"
          className="h-10 w-10 rounded-full focus:outline-none focus:bg-brand-primary-light hover:bg-brand-primary-light"
        >
          <HamburgerIcon className="fill-current text-brand-secondary h-6 w-6 text-center inline-block" />
        </button>
        <h1 className="text-brand-secondary m-2">
          <Link href="/">nextjs-github-browser</Link>
        </h1>
      </div>
    </header>
  );
}
