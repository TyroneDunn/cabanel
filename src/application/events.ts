import { BehaviorSubject, Observable } from 'rxjs';

export const init : string = '[Init]';
export const userRegisteredEvent : string = '[User Registered]';
export const userLoggedInEvent   : string = '[User Logged In]';
export const userLoggedOutEvent  : string = '[User Logged Out]';

export type CabanelEvent = {
   name: string,
   payload?: any,
};

export const cabanelEventsSubject: BehaviorSubject<CabanelEvent> =
   new BehaviorSubject<CabanelEvent>({ name: init });

export const cabanelEvent$: Observable<CabanelEvent> = cabanelEventsSubject.asObservable();