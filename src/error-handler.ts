import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { HTTPResponseError } from "hono/types";

import { DatabaseException } from "./exceptions";

export const errorHandler = (error : Error | HTTPResponseError, { json }: Context) => {
  let message;
  let statusCode;

  if (error instanceof DatabaseException) {
    const errorResponse = error.getResponse();
    message = errorResponse?.message;
    statusCode = errorResponse?.statusCode;
  }
  else if (error instanceof HTTPException) {
    message = error?.message;
    statusCode = error?.status;
  }

  message = message ?? error.message;
  statusCode = statusCode ?? 500;

  return json({
    message,
    statusCode,
  }, statusCode);
};