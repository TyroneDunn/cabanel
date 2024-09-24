import {LocalAuthDatabaseProvider, LocalAuthStrategy} from "../../src/application/local-auth-strategy";
import {HashAlgorithm} from "../../src/password/password";

export const localAuthStrategy: LocalAuthStrategy = {
   databaseOptions: {
      databaseProvider : "MongoDB" as LocalAuthDatabaseProvider,
      databaseUrl      : "mongodb://localhost:27017/test",
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