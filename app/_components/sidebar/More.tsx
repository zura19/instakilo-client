"use client";
import { Menu } from "lucide-react";
// import { usePathname } from "next/navigation";

type props = {
  showSmallSidebar: () => boolean;
};

export default function More({ showSmallSidebar }: props) {
  // const pathname = usePathname();
  const ICONSIZE = 22;
  const ICONCLASS = "text-primary";
  const TEXTCLASS = `hidden text-sm sm:inline font-light`;
  const DIVCLASS = `block hover:bg-accent hover:text-accent-foreground sm:text-sm px-1.5 py-2 rounded-md transition-colors duration-300`;

  return (
    <p className={DIVCLASS + " mt-auto"}>
      <span className="sm:flex sm:items-center gap-3 cursor-pointer">
        <Menu className={ICONCLASS} size={ICONSIZE} />
        {!showSmallSidebar() && <span className={TEXTCLASS}>More</span>}
      </span>
    </p>
  );
}
