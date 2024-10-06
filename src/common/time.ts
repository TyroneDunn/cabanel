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

export type CreatedAtDateRange = DateRange;
export type UpdatedAtDateRange = DateRange;

export const timestamp = (date: Date): string => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');
   const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

   return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`;
};