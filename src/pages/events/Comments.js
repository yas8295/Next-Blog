import React, { useState } from "react";
import useSWR from "swr";
import "react-responsive-modal/styles.css";
import CommentsItems from "./CommentsItems";
import { BounceLoader } from "react-spinners";

export default function Comments({ id }) {
  const { data, isLoading } = useSWR(
    `/api/comments/${id}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 100 }
  );

  if (isLoading) {
    return <BounceLoader color="#36d7b7" />;
  }

  return data?.map((c) => <CommentsItems c={c} key={c._id}></CommentsItems>);
}
