import React from "react";

interface InputErrorProps {
  error: String | undefined;
}

export const InputError: React.FC<InputErrorProps> = ({ error }) => {
  return <p className="mt-1 text-sm text-red-500 capitalize">{error}</p>;
};
