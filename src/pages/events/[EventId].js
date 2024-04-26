import path from "path";
import fs from "fs/promises";
import React, { useState } from "react";
import Image from "next/image";
import EventsForm from "./EventsForm";
import Comments from "./Comments";

export default function EventId({ event }) {
  const [addComment, setAddComment] = useState(false);

  if (!event) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
      <div className="w-full text-center p-8 bg-teal-600 text-white">
        <h1 className="md:text-[73px] text-[40px] font-semibold z-50 relative">
          {event[0]?.title}
        </h1>
      </div>
      <div className="flex flex-wrap gap-8 items-center bg-gray-800 md:p-7 p-2 mt-[-5.5%] rounded-md">
        <Image
          src={`${event[0]?.image}`}
          className="w-80 h-80 object-cover rounded-full border-4"
          width={600}
          height={600}
          alt="hello"
          priority
        ></Image>
        <div className="flex flex-grow gap-4 flex-col text-teal-100 text-[27px]">
          <div className="flex flex-col gap-1">
            <h1>🎂</h1>
            <h1>
              {new Date(event[0]?.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h1>🏠</h1>
            <h1>{event[0]?.location?.replace(", ", "\n")}</h1>
          </div>
        </div>
      </div>
      <p className="text-[24px] text-center px-4 mt-5">
        {event[0]?.description}
      </p>
      <div className="p-5 shadow-2xl flex flex-col justify-center items-center gap-5 backdrop-blur-md rounded-lg border-2 border-cyan-600">
        <Comments id={event[0].id}></Comments>
        <button
          onClick={() => {
            setAddComment(!addComment);
          }}
          className="py-2 px-6 bg-teal-500 rounded-lg text-white"
        >
          {addComment ? "Close" : "Add comment"}
        </button>
        {addComment && (
          <EventsForm
            id={event[0].id}
            setAddComment={setAddComment}
          ></EventsForm>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const events = JSON.parse(data);
  const event = events.events.filter((e) => e.id === context.params.EventId);

  if (event.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const events = JSON.parse(data);
  const Ids = [];
  for (const event of events.events) {
    Ids.push({ params: { EventId: event.id } });
  }

  return {
    paths: [
      {
        params: { EventId: "e2" },
      },
    ],
    fallback: true,
  };
}
