import Link from "next/link";

export default function Notfound() {
  return (
    <div className="flex flex-col items-center gap-2 justify-center h-dvh">
      <h1 className="text-xl font-bold">
        Sorry this page isn&apos;t available
      </h1>
      <p className="text-sm">
        The link you followed may be broken, or the page may have been removed.
        <Link href="/" className="text-blue-400">
          {" "}
          Go back to Instakilo.
        </Link>
      </p>
    </div>
  );
}
