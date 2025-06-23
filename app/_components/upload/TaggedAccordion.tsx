import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import UserProfilePicture from "../UserProfilePicture";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

async function handleSearchUsers(username: string) {
  const res = await fetch(`${api}/users/many/${username}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export type tagType = {
  id: string;
  name: string;
  image: string;
};

export default function TaggedAccordion({
  tagged,
  addTag,
  removeTag,
}: {
  tagged: tagType[] | [];
  addTag: (id: string, name: string, image: string) => void;
  removeTag: (id: string) => void;
}) {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery<
    { success: true; users: tagType[] } | { success: false; message: string }
  >({
    queryKey: ["tags", query],
    queryFn: () => handleSearchUsers(query),
    enabled: query.length >= 3,
  });
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm text-primary cursor-pointer underline-offset-2">
          Tagged ({tagged.length})
        </AccordionTrigger>
        <AccordionContent className="h-[234px] grid grid-rows-[auto_auto_1fr] space-y-2">
          <div className="flex flex-wrap gap-2">
            {tagged?.map((user) => (
              <TaggedUser
                key={user.id}
                name={user.name}
                removeTag={() => removeTag(user.id)}
              />
            ))}
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="rounded-xs"
          />
          <div
            className={`${
              !query ? "opacity-0 h-0" : "opacity-100 h-full"
            }   overflow-scroll p-2 space-y-1 transition-all duration-500`}
          >
            {isLoading && (
              <Loader boxClassName="flex items-center justify-center" />
            )}

            {!isLoading && !data?.success && (
              <p className="text-sm text-center text-primary">
                {data?.message}
              </p>
            )}

            {!isLoading &&
              data?.success &&
              data?.users.map((user) => (
                <User
                  alreadyTagged={tagged.some((tag) => tag.id === user.id)}
                  key={user.id}
                  image={user.image}
                  name={user.name}
                  addTag={() => {
                    addTag(user.id, user.name, "");
                    setQuery("");
                  }}
                />
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function TaggedUser({
  name,
  removeTag,
}: {
  name: string;
  removeTag: () => void;
}) {
  const renderedName = name.length > 15 ? `${name.slice(0, 15)}...` : name;
  return (
    <div className="flex items-center  gap-2 text-sm text-primary bg-accent py-0.5 px-2 w-fit rounded-full hover:bg-accent/50 transition-all duration-500">
      <p>{renderedName}</p>
      <X onClick={removeTag} className=" cursor-pointer" size={15} />
    </div>
  );
}

function User({
  name,
  image,
  addTag,
  alreadyTagged,
}: {
  name: string;
  image: string;
  addTag: () => void;
  alreadyTagged?: boolean;
}) {
  return (
    <div
      onClick={() => addTag()}
      className={`flex items-center gap-2 ${
        alreadyTagged && "opacity-50"
      } hover:bg-accent rounded-xs p-1 cursor-pointer tarnsition-colors duration-300`}
    >
      <UserProfilePicture image={image} imageSize="xs" iconSize="xs" />
      <p>{name}</p>
    </div>
  );
}
