import { Context, Next } from "hono";

import { Service } from "../enums";
import { ThingService } from "../services";

export const registerServices = async ({ env, set }: Context, next: Next) => {
  set(Service.Thing, new ThingService(env.DB));
  await next();
}