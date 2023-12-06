import {Config} from "./app/config.type";
import {Method} from "./app/method.type";
import {init, run} from "./app/app";
import {BuildConfig as BuildConfigType, buildConfig} from "./app/config.utility";

export const App = {
    init: init,
    run: run
};

export type AppConfig = Config;
export type BuildConfig = BuildConfigType;
export const buildAppConfig: BuildConfig = buildConfig;
export type AppMethod = Method;