import { pbkdf2Sync, randomBytes } from 'crypto';

export type HashUtility = {
   generateHash : (password : string) => string,
   validateHash : (password : string, hash : string) => boolean,
};

export const HashUtility = (
   salt : string,
   iterations : number,
   length : number,
   algorithm : string,
) : HashUtility => ({
   generateHash: (password : string) : string =>
      pbkdf2Sync(password, salt, iterations, length, algorithm).toString('hex'),

   validateHash: (password : string, hash : string) : boolean =>
      (hash === pbkdf2Sync(password, salt, iterations, length, algorithm)
      .toString('hex')),
});

export type GenerateSalt = () => string;

export const GenerateSalt : GenerateSalt = () : string =>
   randomBytes(256).toString('hex');