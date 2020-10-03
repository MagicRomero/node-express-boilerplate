const dotenv = require("dotenv");

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  api_prefix: process.env.API_PREFIX,
};
