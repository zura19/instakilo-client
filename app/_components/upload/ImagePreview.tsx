"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ImagePreview({ image }: { image: string }) {
  const [h, setH] = useState(" h-0 w-0 scale-0 opacity-0");
  useEffect(() => {
    setTimeout(() => {
      setH(
        "h-[520px] opacity-100 w-[400px] md:w-[600px] scale-100 opacity-100"
      );
    });
  }, [image]);

  return (
    <div className={`${h}  relative transition-all duration-500`}>
      <Image
        src={image}
        alt="Image"
        fill
        className="object-cover object-center w-full h-full "
      />
    </div>
  );
}
