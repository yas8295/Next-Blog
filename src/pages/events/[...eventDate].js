import React from "react";
import path from "path";
import fs from "fs/promises";
import EventItems from "./EventItems";
import Link from "next/link";

export default function EventDate({ events, date }) {
  if (!events) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-center mt-10 text-[30px] font-semibold">
        Events in{" "}
        {new Date(date.eventDate[0], date.eventDate[1] - 1).toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        )}
      </h1>
      <div className="w-full text-center mt-4">
        <button className="py-2 px-6 bg-teal-500 rounded-lg text-white">
          <Link href={`/events`}>Show all events</Link>
        </button>
      </div>
      <EventItems events={events}></EventItems>
    </>
  );
}

export async function getStaticProps({ params }) {
  const date = [params.eventDate[0], params.eventDate[1]];
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const readFile = await fs.readFile(filePath);
  const data = JSON.parse(readFile);
  const events = data.events.filter(
    (e) => e.date.split("-").slice(0, 2).join("-") === date.join("-")
  );

  if (events.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      events: events,
      date: params,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { eventDate: ["2021", "05"] },
      },
    ],
    fallback: true,
  };
}
