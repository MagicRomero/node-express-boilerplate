import {
  json,
  urlencoded,
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import routes from "../api";
import config from "../config";
import { loggerMiddleware } from "../api/middlewares";

export default async ({ app }: { app: Application }) => {
  app.enable("trust proxy");
  app.disable("x-powered-by");

  app.use(helmet());
  app
    .use(json({ limit: "2000kb" }))
    .use(urlencoded({ extended: true }))
    .use(hpp());

  app.use(compression());

  if (config.node_env === "production") {
    app.use(
      cors({
        origin: function (origin, callback: Function) {
          if (config.whitelist_origins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
      })
    );
  }
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 100,
      max: 50,
      message:
        "Too many request attempt detected, please try again after 15 min",
    })
  );

  app.use(
    mongoSanitize({
      replaceWith: "_",
    })
  );

  app.use(loggerMiddleware);
  app.use(config.api_prefix, routes());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  return app;
};
