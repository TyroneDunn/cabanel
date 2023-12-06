import {Config} from "./config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "./app-wrapper.type";
import {expressAppBuilder} from "../express/express-app-builder.service";

export type AppBuilder = {
    buildApp: (config: Config, controllers: Controller[]) => AppWrapper,
};

export const appBuilder: AppBuilder = {
    buildApp(config: Config, controllers: Controller[]): AppWrapper {
        switch (config.api) {
            case "Express": {
                return expressAppBuilder.buildApp(config, controllers);
            }
            default: {
                throw new Error(`"${config.api}" API not implemented. Please select a different option.`);
            }
        }
    }
};
