import {Config} from "./app/config.type";
import {init, run} from "./app/app";
import {BuildConfig as BuildConfigType, buildConfig as buildAppConfig} from "./app/config.utility";
import {Controller} from "./app/controller.type";
import {AppWrapper} from "./app/app-wrapper.type";
import {appBuilder} from "./app/app-builder.utility";

export const App = {
    init: init,
    run: run
};

export type BuildConfig = BuildConfigType;
export const buildConfig: BuildConfig = buildAppConfig;

export type AppBuilder = {
    buildApp: (config: Config, controllers: Controller[]) => AppWrapper,
};

export const AppBuilder: AppBuilder = appBuilder;