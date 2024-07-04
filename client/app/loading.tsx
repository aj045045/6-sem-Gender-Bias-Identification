'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

function Loading() {
  const [load, setLoad] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoad(prevDots => {
        if (prevDots.length >= 3) {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center h-full">
      <Image src="/icons/loading.png" className="w-1/3 mt-20 text-center animate-pulse" alt="Image Loading" width={0} height={0} unoptimized />
      <div className="mt-10 text-6xl text-center">Loading.{load}</div>
    </div>
  )
}
export default Loading;