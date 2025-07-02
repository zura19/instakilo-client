export type storyType = {
  id: string;
  image: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  viewedBy: { id: string }[];
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
};
