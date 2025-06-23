"use client";

import { ArrowLeftCircleIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CloseConversation({
  classname,
}: {
  classname: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleClose() {
    const params = new URLSearchParams(searchParams);
    params.delete("cId");
    params.delete("with");
    router.push(`${pathname}?${params.toString()}`);
  }

  return <ArrowLeftCircleIcon onClick={handleClose} className={classname} />;
}
