import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

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
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">{data.post.title}</h1>
          <div
            aria-label="Delete post"
            onClick={() => console.log("delete")}
            className="-mr-1 p-1 cursor-pointer"
          >
            <TrashIcon
              onClick={() => console.log("delete")}
              className="h-5 w-5"
            />
          </div>
        </div>
        <p>{data.post.text}</p>
      </div>
    </Layout>
  );
};

export default Post;
