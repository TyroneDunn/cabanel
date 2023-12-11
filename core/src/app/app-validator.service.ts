import {ValidationOutcome} from "../shared/validation-outcome.type";
import {Config} from "./config.type";
import {Error} from "../shared/error.type";

export const validateAppConfig = (config: Config): ValidationOutcome => {
    const errors: Error[] = [];
    return {errors: errors};
};
