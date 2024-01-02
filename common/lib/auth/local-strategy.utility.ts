import { AuthStrategy } from "./auth-strategy.type";

export const isLocalStrategy = (authStrategy : AuthStrategy) => (
   typeof authStrategy    === 'object'
   && 'usersDbName'       in authStrategy
   && 'usersDbOption'     in authStrategy
   && 'usersDbUrl'        in authStrategy
   && 'sessionSecret'     in authStrategy
   && 'hashingAlgorithm'  in authStrategy
   && 'hashingIterations' in authStrategy
   && 'passwordLength'    in authStrategy
   && 'passwordSalt'      in authStrategy
);
