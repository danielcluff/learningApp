import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";

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
  return (
    <div className="border rounded-sm shadow">
      <div className="flex">
        <UpdootSection post={post} />
        <div className="flex-1 bg-white px-2 py-2">
          <div className="text-sm font-thin text-gray-500">
            Posted by u/{post.creator.username}
          </div>
          <h4 className="text-lg text-red-700 tracking-tight">{post.title}</h4>
          <p className="text-sm">{post.textSnippet}</p>
        </div>
      </div>
    </div>
  );
};
