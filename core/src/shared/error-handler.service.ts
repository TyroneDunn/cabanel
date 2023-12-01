export const throwErrors = (errors: Error[]) => {
    const errorMessages: string = '';
    for (const error of errors) errorMessages.concat(error.message, '\n');
    throw new Error(errorMessages);
};
