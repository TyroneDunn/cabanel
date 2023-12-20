import { LocalStrategy } from "./local-strategy.type";
import { JwtStrategy } from "./jwt-strategy.type";

export type AuthStrategy = "None" | LocalStrategy | JwtStrategy;
