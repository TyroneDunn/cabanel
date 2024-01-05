export type CommandResult = {
   success       : boolean,
   affectedCount : number
};

export const CommandResult = (success: boolean, affectedCount: number): CommandResult => ({
   success: success,
   affectedCount: affectedCount
});