import { FieldError } from "../generated/graphql";

export const showError = (error: FieldError, input: string) => {
    if (error.field ===  input) {
        return error.message;
    }
};