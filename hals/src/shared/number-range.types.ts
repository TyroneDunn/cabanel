export type NumberRange =
   | StartOnly
   | EndOnly
   | StartAndEnd;

export type StartOnly = { start : number };

export const isStartOnly = (range : NumberRange) : range is StartOnly => (
   range !== null
   && typeof range === 'object'
   && 'start'     in range
   && !('end'     in range)
);

export type EndOnly = { end: number };

export const isEndOnly = (range : NumberRange) : range is EndOnly => (
   range !== null
   && typeof range === 'object'
   && 'end'        in range
   && !('start'    in range)
);

export type StartAndEnd = {
   start : number,
   end   : number,
};

export const isStartAndEnd = (range : NumberRange) : range is StartAndEnd => (
   range !== null
   && typeof range === 'object'
   && 'start'      in range
   && 'end'        in range
);
