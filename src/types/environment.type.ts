import { ThingService } from "../services";

export type Environment = {
  Variables: {
    "services.thing": ThingService;
  }
}