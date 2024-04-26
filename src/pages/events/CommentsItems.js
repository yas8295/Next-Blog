import React, { useState } from "react";
import prettyMilliseconds from "pretty-ms";
import { Modal } from "react-responsive-modal";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

export default function CommentsItems({ c }) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    `/api/comments/${c?._id}`,
    sendRequest,
    {
      onSuccess: () => {
        mutate(`/api/comments/${c?.id}`);
        onCloseModal();
      },
    }
  );

  async function sendRequest(url) {
    return await toast.promise(
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
      {
        pending: "loading...",
        success: "deleted comment successfully",
        error: "failed try again!",
      }
    );
  }

  return (
    <div
      key={c?._id}
      className="relative py-4 px-6 gap-3 rounded-md flex flex-col justify-between min-w-72 bg-white shadow-xl border-[1px] border-cyan-400"
    >
      <div>
        <button
          className="absolute right-2 top-2 text-[13px]"
          onClick={onOpenModal}
        >
          🗑️
        </button>
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <h2 className="me-10 text-[20px] font-semibold">
            confirm deleting comment
          </h2>
          <div className="flex gap-3 w-full justify-end items-center mt-10">
            <button
              onClick={() => trigger(sendRequest)}
              className="py-2 px-6 bg-teal-500 rounded-lg text-white"
            >
              confirm
            </button>
            <button
              onClick={onCloseModal}
              className="py-2 px-6 bg-red-500 rounded-lg text-white"
            >
              close
            </button>
          </div>
        </Modal>
      </div>
      <div className="flex items-center justify-between gap-6 w-full">
        <h1 className="text-[30px] font-semibold capitalize">{c?.name}</h1>
        <h1 className="text-[16px]">
          {prettyMilliseconds(new Date().getTime() - Number(c?.time || 400), {
            compact: true,
          })}{" "}
          ago
        </h1>
      </div>
      <h1 className="text-[20px]">{c?.comment}</h1>
    </div>
  );
}
