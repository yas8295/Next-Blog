import React, { useRef } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSWRConfig } from "swr";

export default function EventsForm({ id, setAddComment }) {
  const name = useRef();
  const comment = useRef();

  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/comments/${id}`,
    sendRequest,
    {
      onSuccess: () => {
        mutate(`/api/comments/${id}`);
        setAddComment(false);
      },
    }
  );

  async function sendRequest(url) {
    if (!comment.current.value || !name.current.value) {
      toast.error("fill all field");
      return;
    }

    return await toast.promise(
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name.current.value,
          comment: comment.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
      {
        pending: "loading...",
        success: "added comment successfully",
        error: "failed try again!",
      }
    );
  }

  function submit(e) {
    e.preventDefault();
    trigger(sendRequest);
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 min-w-72 ">
      <input
        autoFocus
        className="p-2 shadow-xl"
        type="text"
        placeholder="Name"
        ref={name}
      />
      <textarea
        className="p-2 resize-none min-h-52 shadow-xl"
        type="text"
        placeholder="Comment"
        ref={comment}
      />
      <button
        disabled={isMutating}
        className="py-2 px-6 bg-teal-500 rounded-lg text-white self-end"
      >
        {isMutating ? "sending..." : "Post"}
      </button>
    </form>
  );
}
