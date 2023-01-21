import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import EditPost from "./editPost";

export default withUrqlClient(createUrqlClient)(EditPost);
