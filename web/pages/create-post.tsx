import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { PostInput, useCreatePostMutation } from "../generated/graphql";
import { showError } from "../utils/showError";
import { InputTextarea } from "../components/InputTextarea";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  const { register, handleSubmit } = useForm<PostInput>();
  const [errors, setErrors] = React.useState({ field: "", message: "" });

  const onSubmit: SubmitHandler<PostInput> = async (values) => {
    await createPost({ input: values });
    // if (!errors) {
    router.push("/");
    // }
  };

  return (
    <Layout>
      <Wrapper variant="small">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <InputField
            register={register}
            name={"title"}
            placeholder={"title"}
            label={"Title"}
            className="mb-4"
            error={showError(errors, "title")}
          />
          <InputTextarea
            register={register}
            name={"text"}
            placeholder={"text..."}
            label={"Body"}
            className="mb-4"
            type="textarea"
            error={showError(errors, "text")}
            rows={3}
          />

          <button
            type="submit"
            className="w-full rounded p-2 bg-orange-600 text-white"
          >
            Create post
          </button>
        </form>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
