import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { showError } from "../utils/showError";
import NextLink from "next/link";

type Inputs = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  const { register, handleSubmit } = useForm<Inputs>();
  const [errors, setErrors] = React.useState({ field: "", message: "" });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const response = await login(values);
    if (response.data?.login.errors) {
      // shape of gql errors [{field: 'username', message: 'something wrong'}]
      setErrors(response.data.login.errors[0]);
      // setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      //worked
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  // create a function that takes errors state with input name arg to display error state

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputField
          register={register}
          name={"usernameOrEmail"}
          placeholder={"username or email"}
          label={"Username or Email"}
          className="mb-4"
          error={showError(errors, "usernameOrEmail")}
        />
        <InputField
          register={register}
          name={"password"}
          placeholder={"password"}
          label={"Password"}
          type="password"
          className="mb-4"
          error={showError(errors, "password")}
        />
        <NextLink
          className="-mt-2 mb-4 flex justify-end"
          href="/forgot-password"
        >
          <p>Forgot password?</p>
        </NextLink>

        <button
          type="submit"
          className="w-full rounded p-2 bg-teal-600 text-white"
        >
          Login
        </button>
      </form>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
