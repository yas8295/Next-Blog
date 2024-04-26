import "@/styles/globals.css";
import Link from "next/link";
import { Bounce, ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="w-full md:py-5 md:px-24 p-3 text-teal-200 bg-slate-900 flex flex-wrap gap-4 justify-center md:justify-between items-center">
        <Link href="/" className="text-[50px] font-semibold">
          NextEvents
        </Link>
        <Link href="/events" className="text-[30px]">
          Browse All Events
        </Link>
      </nav>
      <Component {...pageProps} />;
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
