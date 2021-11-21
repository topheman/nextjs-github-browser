import Head from "next/head";
import Link from "next/link";
import styles from "../styles/basic.module.css";

export default function PageIndex(): JSX.Element {
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
  return (
    <div className={styles.root}>
      <Head>
        <title>nextjs-github-browser</title>
        <meta name="description" content="nextjs-github-browser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-2 lg:px-0 mx-auto mt-4 max-w-5xl">
        <h1 className="text-2xl">Home</h1>
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
        <p>
          The goal of this project is not to replace the github ui in any way
          but to get better in the following:
        </p>
        <ul className="ml-10 list-disc">
          <li>
            <Link href="/apollographql/apollo-client">
              <a title="appolo GraphQL">Apollo</a>
            </Link>{" "}
            /{" "}
            <Link href="/graphql">
              <a title="GraphQL">GraphQL</a>
            </Link>
          </li>
          <li>
            <Link href="/microsoft/TypeScript">
              <a title="microsoft/TypeScript">TypeScript</a>
            </Link>
          </li>
          <li>
            <Link href="/tailwindlabs/tailwindcss">
              <a title="tailwindlabs/tailwindcss">Tailwind</a>
            </Link>
          </li>
        </ul>
        <p className="mt-4">Take a tour (and more):</p>
        <ul>
          <li>
            Profile pages (user and organizations) - ex:
            <ul>
              {profileLinks.map(([href, label]) => {
                return (
                  <li key={href}>
                    <Link href={href}>
                      <a>{label}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            Repository pages - ex:
            <ul>
              {repositoryLinks.map(([href, label]) => {
                return (
                  <li key={href}>
                    <Link href={href}>
                      <a>{label}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </main>
    </div>
  );
}
