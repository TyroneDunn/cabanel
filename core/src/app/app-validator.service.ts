import {ValidationOutcome} from "../shared/validation-outcome.type";
import {Schema} from "./schema.type";
import {Error} from "../shared/error.type";

export const validateAppSchema = (schema: Schema): ValidationOutcome => {
    const errors: Error[] = [];
    return {errors: errors};
};
