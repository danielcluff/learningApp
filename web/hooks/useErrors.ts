import React from "react";
import { FieldError } from "../generated/graphql";

export const useErrors = () => {
    const [errors, setErrors] = React.useState({});
    console.log('e', errors);

    return [errors, setErrors];
};