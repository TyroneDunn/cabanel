import {AppWrapper} from "./app-wrapper.interface";
import {Config} from "./config.type";
import {Controller} from "./controller.type";

const apps: AppWrapper[] = [];

export const init = (config: Config, controllers: Controller[]): void => {};
export const run = (): void => {
    for (const app of apps) app.run();
};