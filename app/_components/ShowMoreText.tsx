"use client";

import { useState } from "react";

type props = {
  text: string;
  limit: number;
};

export default function ShowMoreText({ text, limit }: props) {
  const [showMore, setShowMore] = useState(false);
  const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.`;

  const renderText = showMore
    ? text + lorem + lorem
    : text.slice(0, limit) + "...";
  const btnClass =
    "text-xs text-muted-foreground cursor-pointer hover:text-muted-foreground/70 transition-all duration-300 ";

  return (
    <span>
      {renderText}

      <span className={btnClass} onClick={() => setShowMore(!showMore)}>
        {showMore ? " Show less" : " Show more"}
      </span>
    </span>
  );
}
