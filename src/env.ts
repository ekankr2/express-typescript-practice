/**
 * Load the .env file with the value set in process.env.NODE_ENV
 */
require("dotenv").config({
  path: `config/.env.${process.env.NODE_ENV || "development"}`,
});

/**
 * Environment variable
 */
export const env = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  app: {
    port: Number(process.env.PORT) || 4000,
    apiPrefix: process.env.API_PREFIX || "/api",
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};
