import {AppWrapper} from "./app-wrapper.interface";
import {Config} from "./config.type";
import {Controller} from "./controller.type";

let apps: AppWrapper[] = [];

const DEFAULT_CONFIG: Config = {};
const init = (config: Config = DEFAULT_CONFIG, controllers: Controller[]): void => {};

const run = (): void => {
    for (const app of apps) app.run();
};

export const app = {
    init: init,
    run: run,
}