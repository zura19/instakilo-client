"use client";

import { useState } from "react";

type props = {
  content: string;
  className?: string;
};

export default function PostContent({ content, className }: props) {
  //   const tempText = "Lorem ipsum dolor sit amet.";
  // const tempText =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [showMore, setShowMore] = useState(content.length > 100);

  const renderContent = showMore ? content.slice(0, 100) + "... " : content;
  return (
    <section className={`px-1 py-1.5 break-words ${className}`}>
      <p className="text-xs text-accent-foreground ">
        {renderContent}
        <span
          onClick={() => setShowMore(!showMore)}
          className=" text-muted-foreground cursor-pointer hover:underline"
        >
          {showMore ? "Show more" : content.length > 100 && "Show less"}
        </span>
      </p>
    </section>
  );
}
