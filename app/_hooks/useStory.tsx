import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const DURATION = 5000;
const stArr = [
  {
    id: 1,
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQFifuSkIMPGeQ/feedshare-shrink_800/B56ZdL0rD.GsAg-/0/1749323790221?e=1752105600&v=beta&t=KX7FMliPXgv-vwNDZXXth3mpX-iYl0zam_tWa7r7PZQ",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/demai8flb/image/upload/v1750354698/go9485ljlcxz0wd9rors.png",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/demai8flb/image/upload/v1750342173/iwdp5u95uzlt2kmop6oy.jpg",
  },
];

export default function useStory() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const dissableNext = active === stArr.length - 1;
  const dissablePrev = active === 0;

  useEffect(() => {
    if (isPaused || active >= stArr.length) return;

    const int = setInterval(() => {
      setActive((prev) => {
        if (prev + 1 >= stArr.length) {
          clearInterval(int);
          redirect("/");
        }
        return prev + 1;
      });
    }, DURATION);

    return () => clearInterval(int);
  }, [active, isPaused]);

  function next() {
    setActive((prev) => prev + 1);
    setIsPaused(false);
  }

  function prev() {
    setActive((prev) => prev - 1);
    setIsPaused(false);
  }

  function togglePause() {
    setIsPaused((prev) => !prev);
  }

  return {
    active,
    isPaused,
    next,
    dissableNext,
    prev,
    dissablePrev,
    stArr,
    togglePause,
  };
}
