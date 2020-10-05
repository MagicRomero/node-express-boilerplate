import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import routes from "../api";
import { loggerMiddleware } from "../api/ middlewares";
import config from "../config";

export default async ({ app }: { app: Application }) => {
  app.enable("trust proxy");
  app.disable("x-powered-by");

  app.use(helmet());
  app.use(express.json({ limit: "2000kb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(hpp());
  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        return req.headers["x-no-compression"]
          ? false
          : compression.filter(req, res);
      },
    })
  );

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

  app.use(loggerMiddleware);

  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 50,
    message: "Too many request attempt detected, please try again after 15 min",
  });

  app.use(globalLimiter);

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
