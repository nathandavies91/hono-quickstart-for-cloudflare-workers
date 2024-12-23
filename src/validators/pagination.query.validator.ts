import { HTTPException } from "hono/http-exception";

import { PaginationRequest } from "../types";
import { withMessage } from "../utilities";

export const paginationQueryValidator = (query: { page?: string, pageSize?: string; }): PaginationRequest => {
  let currentPage = 1;
  let pageSize = 24;

  if (query.page) {
    currentPage = Number.parseInt(query.page);

    if (isNaN(currentPage) || currentPage < 1) {
      throw new HTTPException(400, withMessage("'page' query invalid"));
    }
  }

  if (query.pageSize) {
    pageSize = Number.parseInt(query.pageSize);

    if (isNaN(pageSize) || pageSize < 1) {
      throw new HTTPException(400, withMessage("'pageSize' query invalid"));
    }
    else if (pageSize > 100) {
      throw new HTTPException(400, withMessage("'pageSize' value should be less than or equal to 100"));
    }
  }

  return {
    currentPage,
    offset: (currentPage - 1) * pageSize,
    pageSize,
  }
}