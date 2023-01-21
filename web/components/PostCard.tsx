import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeletePostMutation } from "../generated/graphql";

// interface PostCardProps {
//   title: string;
//   text: string;
//   author: string;
//   points: number;
// }

interface PostCardProps {
  post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <div className="border rounded-sm shadow">
      <div className="flex">
        <UpdootSection post={post} />
        <div className="flex-1 flex bg-white px-2 py-2">
          <div className="flex-1">
            <div className="text-sm font-thin text-gray-500">
              Posted by u/{post.creator.username}
            </div>
            <NextLink href={`/post/[id]`} as={`/post/${post.id}`}>
              <h4 className="text-lg text-red-700 tracking-tight">
                {post.title}
              </h4>
            </NextLink>
            <p className="text-sm">{post.textSnippet}</p>
          </div>
          <div className="sideActions">
            <div
              aria-label="Delete post"
              onClick={() => deletePost({ id: post.id })}
              className="p-1 cursor-pointer"
            >
              <TrashIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
