import { useRouter } from "next/router";
import React, { useRef } from "react";

export default function EventsSearch() {
  const router = useRouter();
  const year = useRef();
  const month = useRef();

  function submit(e) {
    e.preventDefault();
    router.push(`/events/${year.current.value}/${month.current.value}`);
  }

  return (
    <div className="text-center">
      <form
        className="flex flex-wrap gap-3 justify-center items-center p-3 bg-white w-fit mx-auto shadow-xl rounded-lg"
        onSubmit={submit}
      >
        <div className="flex-grow flex justify-between items-center gap-4">
          <label className="text-[19px] font-semibold" htmlFor="year">
            Year
          </label>
          <select
            className="border-4 py-1 pe-10 ps-3 rounded-lg flex-grow"
            id="year"
            ref={year}
            defaultValue={2021}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="flex-grow flex justify-between items-center gap-4">
          <label className="text-[19px] font-semibold" htmlFor="month">
            Month
          </label>
          <select
            className="border-4 py-1 pe-10 ps-3 rounded-lg flex-grow"
            id="month"
            ref={month}
            defaultValue={"05"}
          >
            <option value="01" className="capitalize">
              jan
            </option>
            <option value="02" className="capitalize">
              feb
            </option>
            <option value="03" className="capitalize">
              mar
            </option>
            <option value="04" className="capitalize">
              apr
            </option>
            <option value="05" className="capitalize">
              may
            </option>
            <option value="06" className="capitalize">
              jun
            </option>
            <option value="07" className="capitalize">
              jul
            </option>
            <option value="08" className="capitalize">
              aug
            </option>
            <option value="09" className="capitalize">
              sep
            </option>
            <option value="10" className="capitalize">
              oct
            </option>
            <option value="11" className="capitalize">
              nov
            </option>
            <option value="12" className="capitalize">
              dec
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="self-center py-2 px-6 bg-teal-500 rounded-lg text-white"
        >
          Find Events
        </button>
      </form>
    </div>
  );
}
