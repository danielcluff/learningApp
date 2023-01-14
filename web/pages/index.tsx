import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div> Loading 1...</div>;
  }
  if (typeof window === "undefined") {
    return <>Err...</>;
  } else {
    return (
      <Layout>
        <NextLink href={"/create-post"}>Create post</NextLink>
        <br />
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((p) => <div key={p.id}>{p.title}</div>)
        )}
      </Layout>
    );
  }
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
//6:13:13
