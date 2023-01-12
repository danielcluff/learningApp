import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

type Inputs = {
  email: string;
};

const forgotPassword: React.FC<{}> = ({}) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    await forgotPassword(values);
    setComplete(true);
  };
  return (
    <Wrapper variant="small">
      {complete ? (
        <div>if an account with that emails exists, we sent you an email</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <InputField
            register={register}
            name={"email"}
            placeholder={"email"}
            label={"Email"}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full rounded p-2 bg-teal-600 text-white"
          >
            Forgot password
          </button>
        </form>
      )}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(forgotPassword);
