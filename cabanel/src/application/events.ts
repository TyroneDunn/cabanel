import EventEmitter from 'events';

export const HalsEventEmitter : EventEmitter = new EventEmitter();

export const userRegisteredEvent : string = '[User Registered]';
export const userLoggedInEvent   : string = '[User Logged In]';
export const userLoggedOutEvent  : string = '[User Logged Out]';
