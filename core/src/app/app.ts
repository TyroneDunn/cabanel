import {AppWrapper} from "./app-wrapper.interface";
import {Config} from "./config.type";
import {Controller} from "../controller/controller.type";

let apps: AppWrapper[] = [];

const DEFAULT_CONFIG: Config = {};
export const init = (config: Config = DEFAULT_CONFIG, controllers: Controller[]): void => {};

export const run = (): void => {
    for (const app of apps) app.run();
};
