import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { PostCard } from "../components/PostCard";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div> Loading 1...</div>;
  }
  if (typeof window === "undefined") {
    return <>Err...</>;
  }
  if (!data && !fetching) {
    <div className="f">Your query failed for some reason</div>;
  }
  console.log(data);

  return (
    <Layout>
      {!data && fetching ? (
        <div className="f">loading...</div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">LiReddit</h1>
            <NextLink href={"/create-post"}>Create post</NextLink>
          </div>
          <br />
          <div className="mt-4 max-w-lg space-y-8">
            {data?.posts?.posts?.map((p) => (
              <PostCard
                key={p.id}
                title={p.title}
                text={p.textSnippet}
                user={p.creator.username}
              />
            ))}
          </div>
          {data && data.posts.hasMore ? (
            <button
              onClick={() =>
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                })
              }
              className="my-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Load more
            </button>
          ) : null}
        </>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

// 1:42:54
// 2:32:28
// 2:48:46
// 3:50:38
// 4:12:38
// 4:31:21
// 5:05:44
// 5:22:14
// 5:50:44
// 6:31:26
// 7:12:37
// 8:00:53
// 8:23:17
