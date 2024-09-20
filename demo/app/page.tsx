"use client";

import { AdSense } from "react-nextjs-adsense";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="max-w-screen-md mx-auto bg-gray-100 p-4">
      <div className="w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
          React Adsense
        </h1>
        <p className="text-lg text-gray-500 mb-4 text-center">
          A react component for Google Adsense
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mb-8">
          <button
            onClick={() =>
              router.push(
                "https://github.com/mahmudul-hasan-hridoy/react-nextjs-adsense",
              )
            }
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            GitHub
          </button>
          <button
            onClick={() =>
              router.push("https://www.npmjs.com/package/react-nextjs-adsense")
            }
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            NPM
          </button>
        </div>

        {/* Installation Instructions */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Install</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-gray-600">
            npm install react-nextjs-adsense
          </pre>
          {/* <a
            href="https://bundlephobia.com"
            className="text-indigo-600 hover:underline mt-2 inline-block"
          >
            Check the bundle size on bundlephobia.com →
          </a> */}
        </div>

        {/* Demo Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Demo</h2>
        <p className="text-gray-500 mb-4">Adblock must be disabled</p>

        {/* AdSense Component */}
        <div className="w-full mb-8">
          <AdSense
            client="ca-pub-6380030036040607"
            slot="8412192778"
            style={{ display: "block" }}
            layout="in-article"
            format="fluid"
          />
        </div>
      </div>
    </div>
  );
}
