import {ValidationOutcome} from "../shared/validation-outcome.type";
import {Config} from "./config.type";

export const validateAppConfig = (config: Config): ValidationOutcome => {
    const errors: Error[] = [];
    return {errors: errors};
};
