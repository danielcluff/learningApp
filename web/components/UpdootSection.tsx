import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, doot] = useVoteMutation();
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-6 w-10 p-2">
      <ChevronUpIcon
        onClick={() => {
          if (post.voteStatus === 1) return;
          doot({
            postId: post.id,
            value: 1,
          });
        }}
        className={`w-6 h-6 cursor-pointer ${
          post.voteStatus === 1 ? "text-green-600" : null
        }`}
      />
      <div className="text-center w-full text-sm tracking-tighter">
        {post.points}
      </div>
      <ChevronDownIcon
        onClick={() => {
          if (post.voteStatus === -1) return;
          doot({
            postId: post.id,
            value: -1,
          });
        }}
        className={`w-6 h-6 cursor-pointer ${
          post.voteStatus === -1 ? "text-red-600" : null
        }`}
      />
    </div>
  );
};
