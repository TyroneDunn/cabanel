import {Config} from "./config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "./app-wrapper.type";

export type AppBuilder = {
    buildApp: (config: Config, controllers: Controller[]) => AppWrapper,
};
