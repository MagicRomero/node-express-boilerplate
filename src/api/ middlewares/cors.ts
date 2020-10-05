import cors from "cors";
import config from "../../config";

export default cors({
  origin: function (origin, callback: Function) {
    if (config.whitelist_origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
});
