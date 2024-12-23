import { Hono } from "hono";
import { validator } from "hono/validator";

import { requiresAuthentication } from "../authentication";
import { Service } from "../enums";
import { Environment } from "../types";
import { asPaginatedResponse } from "../utilities";
import { paginationQueryValidator, thingJsonValidator } from "../validators";

export const thingsController = new Hono<Environment>();

/**
 * Delete thing
 */
thingsController.delete(
  "/:id",
  requiresAuthentication,
  async ({ body, get, req }) => {
    const { id } = req.param();

    const thingService = get(Service.Thing);
    await thingService.delete(id);

    return body(null, 204);
  }
);

/**
 * Get all things
 */
thingsController.get(
  "/",
  validator("query", paginationQueryValidator),
  async ({ get, json, notFound, req }) => {
    const pagination = req.valid("query");
    const thingService = get(Service.Thing);

    const response = await thingService.getAll(pagination);
    
    if (response.isEmpty) {
      return notFound();
    }
    
    return json(asPaginatedResponse(pagination, response));
  },
);

/**
 * Get a specific thing by id
 */
thingsController.get(
  "/:id",
  async ({ get, json, notFound, req }) => {
    const { id } = req.param();
    const thingService = get(Service.Thing);

    const response = await thingService.getById(id);
    
    if (!response.exists) {
      return notFound();
    }
    
    return json(response.item);
  },
);

/**
 * Create a new thing
 */
thingsController.post(
  "/",
  requiresAuthentication,
  validator("json", thingJsonValidator),
  async ({ body, get, req }) => {
    const thing = await req.valid("json");

    const thingService = get(Service.Thing);
    await thingService.add(thing);
    
    return body(null, 201);
  },
);

/**
 * Edit thing
 */
thingsController.put(
  "/:id",
  requiresAuthentication,
  validator("json", thingJsonValidator),
  async ({ body, get, req }) => {
    const { id } = req.param();
    const thing = await req.valid("json");

    const thingService = get(Service.Thing);
    await thingService.update(id, thing);

    return body(null, 204);
  }
);