import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import * as gtag from "../lib/gtag";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
