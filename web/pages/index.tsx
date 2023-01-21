import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { PostCard } from "../components/PostCard";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!data && !fetching) {
    <div className="f">Your query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div className="f">loading...</div>
      ) : (
        <>
          <div className="mt-4 space-y-8">
            {data?.posts?.posts?.map((p) =>
              !p ? null : <PostCard key={p.id} post={p} />
            )}
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
// 8:46:46
// 9:23:06
// 9:51:57
// 10:04:08
// 10:38:18
// 11:09:23
