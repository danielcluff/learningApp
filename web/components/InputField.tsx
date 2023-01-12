import React, { InputHTMLAttributes } from "react";
// import Register from "../pages/register";
import { InputError } from "./InputError";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type?: string;
  className?: string;
  error?: any;
  register: any;
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  className,
  type = "text",
  defaultValue,
  error,
  register,
}) => {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  return (
    <div className={className}>
      <label htmlFor={name} className="font-lg">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        className="block p-2 w-full rounded border border-gray-300"
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
      />

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {error && <InputError error={error} />}
    </div>
  );
};
