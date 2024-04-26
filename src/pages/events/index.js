import path from "path";
import fs from "fs/promises";
import EventItems from "./EventItems";
import EventsSearch from "./EventsSearch";

export default function Events({ events }) {
  return (
    <>
      <EventsSearch></EventsSearch>
      <EventItems events={events.events}></EventItems>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const events = JSON.parse(data);

  return {
    props: {
      events,
    },
  };
}
