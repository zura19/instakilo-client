import { Button } from "@/components/ui/button";
import Link from "next/link";

type props = {
  message: string;
  btnClassName?: string;
};

export default function LoginToSee({ message, btnClassName }: props) {
  return (
    <div>
      <p>{message}</p>
      <Button className={`mt-3 ${btnClassName}`} asChild>
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </Button>
    </div>
  );
}
