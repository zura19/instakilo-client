import { X } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";

export const grandista = localFont({
  src: "../../public/fonts/grandista.otf",
  variable: "--font-grandista",
});
type props = {
  children: React.ReactNode;
};

export default function Layout({ children }: props) {
  return (
    <div className="bg-accent/60 h-dvh p-6">
      <Link href="/" className={`text-xl ${grandista.className} text-primary`}>
        Instakilo
      </Link>
      {children}
      <Link
        href="/"
        className=" text-primary hover:text-primary/70 transition-all duration-300 "
      >
        <X className="absolute top-4 right-4 " />
      </Link>
    </div>
  );
}
