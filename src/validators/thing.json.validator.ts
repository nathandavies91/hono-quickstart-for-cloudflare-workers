import { HTTPException } from "hono/http-exception";

import { ThingRequest } from "../types";
import { withMessage } from "../utilities";

export const thingJsonValidator = (body: ThingRequest): ThingRequest => {
  if (!body.title) {
    throw new HTTPException(400, withMessage("'title' value missing"));
  }

  return body;
}
