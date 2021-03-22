import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Scene } from "aframe-react";
import data from "../../data";

export default function Explore() {
  const [appRendered, setAppRendered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
      setAppRendered(true);
    }
  }, []);

  const router = useRouter();
  const slug = router.query.slug;
  const entry = useMemo(() => data.find((d) => d.slug === slug), [slug]);

  if (!entry) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>Explore {entry.title}</title>
      </Head>
      <div className="w-full h-full absolute">
        {appRendered && (
          <Scene embedded>
            <a-assets>
              <img src={entry.src} id="sky" />
            </a-assets>
            <a-sky src="#sky" rotation="0 90 0"></a-sky>
            <a-camera look-controls="reverseMouseDrag: true" />
          </Scene>
        )}
      </div>
      <div className="max-w-md absolute">
        <div className="py-2 pl-2 pr-4 sm:m-4 m-2 bg-white shadow-lg rounded-sm flex flex-row content-center items-center">
          <Link href="/">
            <span className="text-blue-500 cursor-pointer">
              <i className="material-icons">arrow_back</i>
            </span>
          </Link>
          <div className="ml-3">
            <h3 className="text-md">{entry.title}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
