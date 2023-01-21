import React from "react";
import NextLink from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostActions {
  id: number;
  creatorId: number;
}

export const EditDeletePostActions: React.FC<EditDeletePostActions> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <div className="edit space-y-1">
      <NextLink href="/edit/[id]" as={`/edit/${id}`}>
        <div
          aria-label="Edit post"
          className="p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-300 cursor-pointer"
        >
          <PencilIcon className="h-5 w-5" />
        </div>
      </NextLink>
      <div
        aria-label="Delete post"
        onClick={() => deletePost({ id })}
        className="p-2 rounded text-gray-700 bg-gray-100 hover:bg-gray-300 cursor-pointer"
      >
        <TrashIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
