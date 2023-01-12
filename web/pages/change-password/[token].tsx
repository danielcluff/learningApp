import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { showError } from "../../utils/showError";
import { useChangePasswordMutation } from "../../generated/graphql";
import { InputError } from "../../components/InputError";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

type Inputs = {
  newPassword: string;
};

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm<Inputs>();
  const [errors, setErrors] = React.useState({ field: "", message: "" });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const response = await changePassword({
      newPassword: values.newPassword,
      token,
    });
    if (response.data?.changePassword.errors) {
      setErrors(response.data.changePassword.errors[0]);
    } else if (response.data?.changePassword.user) {
      //worked
      router.push("/");
    }
  };
  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputField
          register={register}
          name={"newPassword"}
          placeholder={"New password"}
          label={"New password"}
          className="mb-4"
          type="password"
          error={showError(errors, "newPassword")}
        />
        {showError(errors, "token") && (
          <>
            <InputError error={showError(errors, "token")} />
            <NextLink href="/forgot-password">
              <a href="/reset">Resend forgot password reset email</a>
            </NextLink>
          </>
        )}
        {/* <InputError error={showError(errors, "token")} /> */}
        <button
          type="submit"
          className="w-full rounded p-2 bg-teal-600 text-white"
        >
          Change password
        </button>
      </form>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
