import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  API_PREFIX,
  WHITELIST_ORIGINS,
  NODE_ENV,
  DATABASE_URL,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
} = process.env;

export default {
  node_env: NODE_ENV || "development",
  port: PORT || 3001,
  api_prefix: API_PREFIX || "/api/v1",
  whitelist_origins: WHITELIST_ORIGINS ? WHITELIST_ORIGINS.split(",") : [],
  database_url: DATABASE_URL || "",
  token_secret: TOKEN_SECRET || "",
  token_expiration: TOKEN_EXPIRATION || "6h",
};
