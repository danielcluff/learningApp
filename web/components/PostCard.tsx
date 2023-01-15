import React from "react";

interface PostCardProps {
  title: string;
  text: string;
}

export const PostCard: React.FC<PostCardProps> = ({ title, text }) => {
  return (
    <div className="border rounded-sm shadow px-4 py-2">
      <h4 className="mb-4">{title}</h4>
      <p className="text-sm">{text}</p>
    </div>
  );
};
