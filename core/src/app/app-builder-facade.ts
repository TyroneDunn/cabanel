import {AppBuilder} from "./app-builder.type";
import {Config} from "./config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "./app-wrapper.interface";
import {expressAppBuilder} from "../express/express-app-builder.service";

export const AppBuilderFacade: AppBuilder = {
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
