import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EventItems({ events }) {
  return (
    <div className="w-full h-full mt-10 flex flex-col gap-5 md:p-5 p-2">
      {events?.map((event) => (
        <div
          key={event.id}
          className="flex xl:flex-nowrap flex-wrap lg:w-6/12 gap-3 mx-auto rounded-2xl shadow-2xl bg-gray-50"
        >
          <Image
            src={`${event.image}`}
            className="w-72 h-52 object-cover rounded-l-2xl xl:flex-grow-0 flex-grow"
            width={600}
            height={600}
            alt="hello"
            priority
          ></Image>
          <div className="flex flex-col gap-2 p-5 flex-grow">
            <h1 className="text-[23px] font-bold">{event.title}</h1>
            <h1 className="font-bold">
              🎂{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h1>
            <div className="flex items-center gap-2">
              <h1>🏠</h1>
              <h1>{event.location.replace(", ", "\n")}</h1>
            </div>
            <button className="self-end py-2 px-6 bg-teal-500 mt-6 rounded-lg text-white">
              <Link href={`/events/${event.id}`}>Explore Event →</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
