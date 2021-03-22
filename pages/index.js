import Head from "next/head";
import Link from "next/link";
import data from "../data";

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <Head>
        <title>Welcome to Labtek V</title>
      </Head>
      <div className="my-4">
        <img src="/hmiflogo.png" width="40" alt="Logo HMIF" />
      </div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold">Welcome to Labtek V</h1>
        <p className="mt-2 text-gray-500">
          Penasaran kondisi ITB sekarang gimana? Yuk cobain 360 image
          tempat-tempat di ITB, terutama Labtek V tentunya!
        </p>
      </div>
      <div className="mt-8">
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((entry) => (
            <div
              className="shadow-sm rounded-sm p-4 border border-gray-200"
              key={entry.slug}
            >
              <h3 className="font-bold">{entry.title}</h3>
              <p className="text-gray-500 mt-1 text-sm">{entry.body}</p>
              <p className="mt-2 text-blue-500 cursor-pointer">
                <Link href={`/explore/${entry.slug}`}>Lihat &rarr;</Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 mb-6 text-gray-500 text-sm">
        Copyright &copy; 2021 HMIF ITB
      </div>
    </div>
  );
}
