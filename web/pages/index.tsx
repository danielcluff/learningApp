import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { PostCard } from "../components/PostCard";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
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
  if (!data && fetching) {
    <div className="f">Your query failed for some reason</div>;
  }

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
          {fetching && !data ? (
            <div>loading...</div>
          ) : (
            <div className="mt-4 max-w-lg space-y-8">
              {data!.posts.map((p) => (
                <PostCard key={p.id} title={p.title} text={p.textSnippet} />
              ))}
            </div>
          )}
          {data ? (
            <button className="my-4 px-4 py-2 bg-red-500 text-white rounded">
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
