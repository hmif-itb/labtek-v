import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Scene } from "aframe-react";
import data from "../../data";

export default function Explore() {
  const [appRendered, setAppRendered] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

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
          <Scene embedded light="defaultLightsEnabled: false">
            <a-assets>
              <img src={entry.src} id="sky" />
            </a-assets>
            <a-sky src="#sky" rotation="0 90 0" material="shader:flat"></a-sky>
            <a-camera look-controls="reverseMouseDrag: true" />
          </Scene>
        )}
      </div>
      <div className="max-w-md absolute">
        <div className="py-2 pl-2 pr-4 sm:m-4 m-2 bg-white shadow-lg rounded-sm">
          <div className="flex flex-row items-center">
            <Link href="/">
              <span className="text-blue-500 cursor-pointer">
                <i className="material-icons">arrow_back</i>
              </span>
            </Link>
            <h3 className="ml-3 flex-grow">{entry.title}</h3>
            <div
              className="text-blue-500 cursor-pointer text-sm ml-3"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              {!infoOpen && <i className="material-icons">expand_more</i>}
              {infoOpen && <i className="material-icons">expand_less</i>}
            </div>
          </div>
          {infoOpen && (
            <p className="mt-1 p-1 text-sm text-gray-500">{entry.body}</p>
          )}
        </div>
      </div>
    </>
  );
}
