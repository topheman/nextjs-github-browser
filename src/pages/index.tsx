import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function PageIndex(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>nextjs-github-browser</title>
        <meta name="description" content="nextjs-github-browser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl md:text-5xl">nextjs-github-browser</h1>
        <h2 className="mt-2 md:mt-6 text-2xl md:text-5xl">Work in progress</h2>
        <p className="md:mt-6">
          <span role="img" aria-label="Construction panel" className="text-9xl">
            🚧
          </span>
        </p>
        <p className="md:mt-6">
          <a href="https://github.com/topheman" className="text-brand-primary">
            @topheman
          </a>
        </p>
      </main>
    </div>
  );
}
