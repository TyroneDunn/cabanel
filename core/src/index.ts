import {init, run} from "./app/app";
import {BuildConfig, buildConfig as buildAppImpl} from "./app/config.utility";
import {appBuilder as appBuilderImpl, AppBuilder} from "./app/app-builder.utility";

export const App = {
    init: init,
    run: run
};

export const buildConfig: BuildConfig = buildAppImpl;

export const appBuilder: AppBuilder = appBuilderImpl;