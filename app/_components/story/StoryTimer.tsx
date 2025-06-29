"use client";
import { useEffect, useState } from "react";

type props = {
  index: number;
  active: number;
  isPaused: boolean;
};

function StoryTimer({ index, active, isPaused }: props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
  }, [active]);

  useEffect(() => {
    if (index !== active) {
      setWidth(index < active ? 100 : 0); // fill previous, empty next
      return;
    }

    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 25); // adjust for speed

    if (isPaused) {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [index, active, isPaused]);

  return (
    <div
      className={`relative w-full h-[3px]  bg-[rgb(153,153,153)] rounded-full`}
    >
      <div
        style={{ width: `${width}%`, transition: "width 25ms  linear" }}
        className={`absolute left-0 top-0 bg-primary h-[3px]`}
      />
    </div>
  );
}

export default StoryTimer;
