import {AppWrapper} from "./app-wrapper.interface";
import {Config} from "./config.type";
import {Controller} from "../controller/controller.type";
import {validateAppConfig} from "./validator.service";
import {ValidationOutcome} from "../shared/validation-outcome.type";
import {throwErrors} from "../shared/error-handler.service";
import {AppBuilderFacade} from "./app-builder-facade";

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
    if (validationOutcome.errors.length > 0) throwErrors(validationOutcome.errors);
    apps.push(AppBuilderFacade.buildApp(config, controllers));
};


export type Run = () => void;
export const run: Run = (): void => {
    for (const app of apps) app.run();
};
