import {buildConfig, Config, BuildConfig as BuildConfigType} from "./app/config.type";
import {Method} from "./controller/method.type";
import {init, run} from "./app/app";

export const App = {
    init: init,
    run: run
};

export type AppConfig = Config;
export type BuildConfig = BuildConfigType;
export const buildAppConfig: BuildConfig = buildConfig;
export type AppMethod = Method;