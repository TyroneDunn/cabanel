export type NumberRange =
   | StartOnlyNumberRange
   | EndOnlyNumberRange
   | StartAndEndNumberRange;

export type StartOnlyNumberRange = { start : number };

export type EndOnlyNumberRange = { end: number };

export type StartAndEndNumberRange = {
   start : number,
   end   : number,
};

export const isStartOnlyNumberRange = (range : NumberRange) : range is StartOnlyNumberRange => (
   range !== null
   && typeof range === 'object'
   && 'start'     in range
   && !('end'     in range)
);

export const isEndOnlyNumberRange = (range : NumberRange) : range is EndOnlyNumberRange => (
   range !== null
   && typeof range === 'object'
   && 'end'        in range
   && !('start'    in range)
);

export const isStartAndEndNumberRange = (range : NumberRange) : range is StartAndEndNumberRange => (
   range !== null
   && typeof range === 'object'
   && 'start'      in range
   && 'end'        in range
);
