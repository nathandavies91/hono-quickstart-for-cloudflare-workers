import { Hono } from "hono";
import { cors } from "hono/cors";

import { thingsController } from "./controllers";
import { errorHandler } from "./error-handler";
import { registerServices } from "./middleware";
import { Environment } from "./types";

const app = new Hono<Environment>({ strict: false });

app.onError(errorHandler);

app.use(cors());
app.use(registerServices);

app.route("/things", thingsController);

export default app;