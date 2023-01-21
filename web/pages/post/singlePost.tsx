import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostActions } from "../../components/EditDeletePostActions";
import { useMeQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="border rounded-sm shadow px-4 py-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="mb-4 text-2xl font-bold capitalize">
              {data.post.title}
            </h1>
            <p>{data.post.text}</p>
          </div>
          <EditDeletePostActions
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
