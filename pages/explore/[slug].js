import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Entity, Scene } from "aframe-react";
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
      <div className="w-full h-full absolute">
        {appRendered && (
          <Scene>
            <a-sky src={entry.src} rotation="0 0 0"></a-sky>
            <a-camera look-controls="reverseMouseDrag: true" />
          </Scene>
        )}
      </div>
      <div className="w-full max-w-md absolute">
        <div className="py-2 px-2 sm:m-4 m-2 bg-white shadow-lg rounded-sm flex flex-row items-center">
          <Link href="/">
            <span className="text-blue-500 cursor-pointer">
              <i className="material-icons">arrow_back</i>
            </span>
          </Link>
          <div className="ml-3">
            <h3 className="text-lg">{entry.title}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
