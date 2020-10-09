const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  API_PREFIX,
  WHITELIST_ORIGINS,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

export default {
  node_env: NODE_ENV,
  port: PORT || 3001,
  api_prefix: API_PREFIX || "/api",
  whitelist_origins: WHITELIST_ORIGINS ? WHITELIST_ORIGINS.split(",") : [],
  database_url: DATABASE_URL || "",
};
