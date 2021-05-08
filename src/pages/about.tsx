import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ user }) {
  console.log(user);
  return (
    <div className={styles.container}>
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
      </main>
    </div>
  );
}
