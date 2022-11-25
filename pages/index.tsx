import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <Link href={`/hello`} className={styles.card}>
            <h2>Static Routing &rarr;</h2>
            <p>Simple Routing, Navigate to Hello Page </p>
          </Link>

          <Link href={`/users`} className={styles.card}>
            <h2>Dynamic Routing &rarr;</h2>
            <p>Routing dynamically, Navigate to Users Page to learn more </p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://samraj.fyimad.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {" "}<strong> {" - "} Devs Deck Tutorial</strong>
        </a>
      </footer>
    </div>
  );
}
