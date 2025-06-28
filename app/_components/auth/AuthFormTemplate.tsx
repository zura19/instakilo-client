// import { cn } from "@/lib/utils";
// import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function AuthFormTemplate({
  // className,
  children,
}: // ...props
React.ComponentProps<"div">) {
  return (
    <div className="grid grid-cols-[46fr_90fr] items-center justify-center gap-28">
      <Image
        src={"/ig-mocked.webp"}
        width={100}
        height={100}
        alt="Image"
        className="object-contain w-full h-full "
      />
      {children}
      <div className="col-span-2 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/">Terms of Service</Link> and{" "}
        <Link href="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}
