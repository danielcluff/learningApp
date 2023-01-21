import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { PostInput, useUpdatePostMutation } from "../../generated/graphql";
import { showError } from "../../utils/showError";
import { InputTextarea } from "../../components/InputTextarea";
import { Layout } from "../../components/Layout";
import { useIsAuth } from "../../utils/useIsAuth";
import { useRouter } from "next/router";
import { useGetIntId } from "../../utils/useGetIntId";
import { usePostQuery } from "../../generated/graphql";

const EditPost: React.FC<{}> = ({}) => {
  useIsAuth();
  const intId = useGetIntId();

  const router = useRouter();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  const { register, handleSubmit } = useForm<PostInput>();
  const [errors, setErrors] = React.useState({ field: "", message: "" });

  const onSubmit: SubmitHandler<PostInput> = async (values) => {
    await updatePost({ id: intId, ...values });
    // if (!errors) {
    router.back();
    // }
  };

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
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
            defaultValue={data.post.title}
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
            defaultValue={data.post.text}
          />

          <button
            type="submit"
            className="w-full rounded p-2 bg-orange-600 text-white"
          >
            Update post
          </button>
        </form>
      </Wrapper>
    </Layout>
  );
};

export default EditPost;
