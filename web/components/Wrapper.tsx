import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <div
      className={`mt-8 mx-auto ${
        variant === "regular" ? "max-w-3xl" : "max-w-sm"
      } w-full px-4`}
    >
      {children}
    </div>
  );
};
