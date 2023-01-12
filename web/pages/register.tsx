import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  useRegisterMutation,
  UsernamePasswordInput,
} from "../generated/graphql";
import { showError } from "../utils/showError";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UsernamePasswordInput>();

  const [errors, setErrors] = React.useState({ field: "", message: "" });

  const onSubmit: SubmitHandler<UsernamePasswordInput> = async (values) => {
    const response = await graphRegister({ options: values });
    if (response.data?.register.errors) {
      // shape of gql errors [{field: 'username', message: 'something wrong'}]
      setErrors(response.data.register.errors[0]);
      // setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      //worked
      router.push("/");
    }
  };

  // create a function that takes errors state with input name arg to display error state

  const [, graphRegister] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputField
          register={register}
          name={"username"}
          placeholder={"username"}
          label={"Username"}
          className="mb-4"
          error={showError(errors, "username")}
        />
        <InputField
          register={register}
          name={"email"}
          placeholder={"email"}
          label={"Email"}
          className="mb-4"
          error={showError(errors, "email")}
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

        <button
          type="submit"
          className="w-full rounded p-2 bg-red-600 text-white"
        >
          Register
        </button>
      </form>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
