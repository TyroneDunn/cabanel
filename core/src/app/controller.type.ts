import {Method} from "./method.type";

export type Controller<T> = {
    path: string,
    guarded?: boolean,
    methods: Method<T>[],
};