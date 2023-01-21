import React from "react";
import { PostSnippetFragment, useMeQuery } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { EditDeletePostActions } from "./EditDeletePostActions";

interface PostCardProps {
  post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [{ data: meData }] = useMeQuery();

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
            <EditDeletePostActions id={post.id} creatorId={post.creator.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
