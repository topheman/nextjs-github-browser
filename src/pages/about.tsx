import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function PageAbout(): JSX.Element {
  return (
    <div className={`${styles.container} text-primary`}>
      <Head>
        <title>nextjs-github-browser</title>
        <meta name="description" content="nextjs-github-browser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>

      <main className={styles.main}>
        <h1 className={styles.title}>nextjs-github-browser</h1>
        <h2>About page</h2>
      </main>
    </div>
  );
}
