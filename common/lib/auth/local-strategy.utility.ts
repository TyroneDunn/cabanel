import { AuthStrategy } from "./auth-strategy.type";
import { LocalStrategy } from './local-strategy.type';

export const isLocalStrategy = (authStrategy : AuthStrategy) : authStrategy is LocalStrategy => (
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
