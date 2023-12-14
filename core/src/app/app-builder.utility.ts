import {Config} from "./config.type";
import {Application} from "./application.type";
import {Controller} from "./controller.type";
import {expressAppBuilder} from "../express/express-app-builder.utility";

export type AppBuilder = {
    buildApp: (config: Config, controllers: Controller[]) => Application,
};

export const appBuilder: AppBuilder = {
    buildApp(config: Config, controllers: Controller[]): Application {
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
