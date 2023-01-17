import React from "react";

interface PostCardProps {
  title: string;
  text: string;
  user: string;
}

export const PostCard: React.FC<PostCardProps> = ({ title, text, user }) => {
  return (
    <div className="border rounded-sm shadow">
      <div className="flex">
        <div className="flex flex-col bg-white bg-opacity-6 w-8 p-2">
          <div className="up">^</div>
          <div className="num">updoot</div>
          <div className="down">V</div>
        </div>
        <div className="flex-1 bg-white px-4 py-2">
          <div className="text-sm font-thin text-gray-500">
            Posted by u/{user}
          </div>
          <h4 className="text-lg text-red-700 tracking-tight">{title}</h4>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};
