"use client";
import useCreatePost from "@/app/_hooks/useCreatePost";
import { Button } from "@/components/ui/button";
import FormButtonComp from "../FormButtonComp";
import { Textarea } from "@/components/ui/textarea";
import useUser from "@/app/_hooks/useUser";
import UserProfilePicture from "../UserProfilePicture";
// import { Smile } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import TaggedAccordion, { tagType } from "./TaggedAccordion";
import UploadCarousel from "./UploadCarousel";
import Emojy from "../Emojy";

// prettier-ignore
type props = { closeModal: () => void; oldPost?: { content: string; tags: tagType[] }; updateSession: boolean; postId?: string};

// prettier-ignore
export default function UploadPost({closeModal, updateSession, oldPost, postId }: props) {
  const inputRef = useRef(null);
  const [content, setContent] = useState(updateSession ? oldPost?.content : "");
  const [tagged, setTagged] = useState<tagType[]>(
    updateSession && oldPost ? oldPost?.tags : []
  );
  const { handlePrevPage, post, handleCreate, isLoading, handleUpdate } =
    useCreatePost();
  const { user } = useUser();
  const MAXIMUMCHARS = 500;

  const dissableToUpdate = updateSession && oldPost?.content === content && oldPost?.tags === tagged 

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > MAXIMUMCHARS) {
      toast.error(`Content must be less than ${MAXIMUMCHARS} characters`);
      return;
    }


    setContent(e.target.value);
  }

  function addTag(id: string, name: string, image: string) {
    if (tagged?.find((user) => user.id === id)) return;
    if (tagged.length >= 5) {
      toast.error("You can only tag up to 5 people");
    }
    setTagged((tagged) => [...tagged, { id, name, image }]);
  }

  function removeTag(id: string) {
    setTagged(tagged?.filter((user) => user.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (updateSession) {
      // prettier-ignore
      await handleUpdate(postId as string, content as string, tagged,post.images,closeModal);
      return;
    }

    await handleCreate(content as string, tagged, post.images, closeModal);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
      <div className="grid grid-cols-[auto_1fr] gap-2 ">
        <UploadCarousel images={post.images} />
        <div>
          <div className="flex items-center gap-1">
            <UserProfilePicture
              image={user?.image}
              imageSize="xs"
              iconSize="xs"
            />
            <p className="text-primary text-sm font-semibold">{user?.name}</p>
          </div>
          <Textarea
            ref={inputRef}
            className="dark:bg-background px-0 max-w-[350px]   w-full h-[40%] resize-none  rounded-none border-0 focus-visible:ring-0 focus-visible:border-0"
            value={content}
            onChange={handleContentChange}
            placeholder="What's on your mind?"
          />
          <div className="flex items-center justify-between text-primary/70 text-xs">
          <Emojy iconClass=" cursor-pointer hover:text-primary/60"  setText={setContent as React.Dispatch<React.SetStateAction<string>>}
          // @ts-expect-error idk
           inputRef={inputRef} text={content as string} />
            {/* <Smile size={18} className="opacity-100 text-primary" /> */}
            <span>
              {content?.length}/{MAXIMUMCHARS}
            </span>
          </div>
          <TaggedAccordion
            tagged={tagged}
            addTag={addTag}
            removeTag={removeTag}
          />
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-3 items-center">
        <Button
          className="w-full"
          variant={"secondary"}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <FormButtonComp
          isLoading={isLoading}
          disabled={!content || isLoading || dissableToUpdate}
          text={updateSession ? "Update Post" : "Create Post"}
          className="w-full"
          type="submit"
        />
      </div>
    </form>
  );
}
