import { StatusCode } from "hono/utils/http-status";

import { ErrorResponse, WithMessage } from "../types";

export class DatabaseException extends Error {
  private error: WithMessage;

  constructor(error: WithMessage) {
    super();
    this.error = error;
  }

  getResponse(): ErrorResponse {
    let message = this.error.message;
    let statusCode = 500;

    if (this.error?.message?.includes("SQLITE_CONSTRAINT")) {
      message = "A record with that key already exists";
      statusCode = 409;
    }

    return {
      message,
      statusCode: statusCode as StatusCode,
    }
  }
}