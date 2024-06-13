export type DateRange =
   | StartOnlyDateRange
   | EndOnlyDateRange
   | StartAndEndDateRange;

export type StartOnlyDateRange = {
   start : string,
};

export type EndOnlyDateRange = {
   end   : string,
};

export type StartAndEndDateRange = {
   start : string,
   end   : string,
};

export const isStartOnlyDateRange = (range : DateRange) : range is StartOnlyDateRange => (
   range !== null
   && typeof range === 'object'
   && 'start'     in range
   && !('end'     in range)
);

export const isEndOnlyDateRange = (range : DateRange) : range is EndOnlyDateRange => (
   range !== null
   && typeof range === 'object'
   && 'end'     in range
   && !('start'     in range)
);

export const isStartAndEndDateRange = (range : DateRange) : range is StartAndEndDateRange => (
   range !== null
   && typeof range === 'object'
   && 'start'      in range
   && 'end'        in range
);
