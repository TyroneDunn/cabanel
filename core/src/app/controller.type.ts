import {Method} from "./method.type";

export type Controller = {
    path: string,
    guarded?: boolean,
    methods: Method[],
};