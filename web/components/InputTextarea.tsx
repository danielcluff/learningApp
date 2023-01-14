import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
// import Register from "../pages/register";
import { InputError } from "./InputError";

type InputTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  type?: string;
  className?: string;
  error?: any;
  register: any;
};

export const InputTextarea: React.FC<InputTextareaProps> = ({
  name,
  label,
  placeholder,
  className,
  type = "text",
  defaultValue,
  error,
  register,
  ...restProps
}) => {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  return (
    <div className={className}>
      <label htmlFor={name} className="font-lg">
        {label}
      </label>
      <textarea
        {...register(name)}
        id={name}
        className="block p-2 w-full rounded border border-gray-300"
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        {...restProps}
      />

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {error && <InputError error={error} />}
    </div>
  );
};
