import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import SinglePost from "./singlePost";

export default withUrqlClient(createUrqlClient, { ssr: true })(SinglePost);
