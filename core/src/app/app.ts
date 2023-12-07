import {AppWrapper} from "./app-wrapper.type";
import {Config} from "./config.type";
import {Controller} from "./controller.type";
import {validateAppConfig} from "./validator.service";
import {ValidationOutcome} from "../shared/validation-outcome.type";
import {throwErrors} from "../shared/error-handler.service";
import {appBuilder} from "./app-builder.utility";

const apps: AppWrapper[] = [];

export type Init = (
    config: Config,
    controllers: Controller[]
) => void;

export const init: Init = (
    config: Config,
    controllers: Controller[] = []
): void => {
    const validationOutcome: ValidationOutcome = validateAppConfig(config);
    if (validationOutcome.errors.length)
        throwErrors(validationOutcome.errors.map(error => new Error(error.message)));
    apps.push(appBuilder.buildApp(config, controllers));
};

export type Run = () => void;
export const run: Run = (): void =>
    apps.forEach(app => app.run());
