import React from "react";

export default function Loader({
  boxClassName = "",
  className = "",
}: {
  boxClassName?: string;
  className?: string;
}) {
  return (
    <div className={boxClassName}>
      <div className={`loader text opacity-80 ${className}`}></div>
    </div>
  );
}
