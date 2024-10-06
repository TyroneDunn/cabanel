import {RestServerApplicationSchema} from "../../src/application/rest-server-application";
import {localHost, ok} from "../../src";
import {cabanel} from "../../src";
import {CorsOptions} from "../../src/http/cors";
import {LocalAuthDatabaseProvider, LocalAuthStrategy} from "../../src/application/local-auth-strategy";
import {HashAlgorithm} from "../../src/password/password";

const corsOptions: CorsOptions = {
    origin              : [
        '*',
    ],
    allowedHeaders      : 'Content-Type,credentials',
    credentials         : true,
    optionsSuccessStatus: ok,
    methods             : [ "GET", "POST", "DELETE", "PATCH" ],
};

const localAuthStrategy: LocalAuthStrategy = {
    databaseOptions: {
        databaseProvider : "MongoDB" as LocalAuthDatabaseProvider,
        databaseUrl      : "mongodb://127.0.0.1:27017/test",
        usersDatabaseName: "users",
    },
    sessionSecret  : "lorem",
    passwordOptions: {
        hashingAlgorithm : "sha256" as HashAlgorithm,
        hashingIterations: 8,
        passwordLength   : 8,
        passwordSalt     : "lorem",
    },
};

const runMinimalApp = () => {
    const schema: RestServerApplicationSchema = {
        nodeEnv: "development",
        serverOption: 'Express',
        title: "mock",
        version: "0.0.1",
        host: localHost,
        port: 6800,
        corsOptions: corsOptions,
        authStrategy: localAuthStrategy,
        routerSchemas: [],
    };

    const app = cabanel(schema);
    app.run();
};

runMinimalApp();