import { useEffect } from "react";

type props = {
  key: string;
  fn: () => void;
};

export default function useKeyDown({ key, fn }: props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        fn();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, fn]);
}
