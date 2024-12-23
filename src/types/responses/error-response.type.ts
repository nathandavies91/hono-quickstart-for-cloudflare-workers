import { StatusCode } from "hono/utils/http-status";

export type ErrorResponse = {
  message?: string;
  statusCode?: StatusCode;
}