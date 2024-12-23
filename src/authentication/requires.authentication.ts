import { bearerAuth } from "hono/bearer-auth";

export const requiresAuthentication = bearerAuth({
  verifyToken: async (token, { get, set }) => {
    // Logic to determine if bearer token is valid
    return true;
  },
});