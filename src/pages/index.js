import { Inter } from "next/font/google";
import EventItems from "./events/EventItems";
import { Suspense } from "react";
import useSWR from "swr";
import BounceLoader from "react-spinners/BounceLoader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, isLoading, error } = useSWR("/api/featuredEvents", (url) =>
    fetch(url).then((res) => res.json())
  );
  if (isLoading) {
    return (
      <div className="h-[calc(80vh)] w-full flex justify-center items-center">
        <BounceLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(80vh)] w-full flex justify-center items-center">
        Somthing went wrong!
      </div>
    );
  }

  const featuredEvents = data
    ?.filter((e) => e.isFeatured === true)
    .sort((a, b) => a + b);
  return (
    <Suspense fallback={<h1>hello</h1>}>
      <EventItems events={featuredEvents}></EventItems>
    </Suspense>
  );
}
