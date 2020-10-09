import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import routes from "../api";
import {
  loggerMiddleware,
  rateLimit,
  cors,
  compression,
} from "../api/ middlewares";
import config from "../config";

export default async ({ app }: { app: Application }) => {
  app.enable("trust proxy");
  app.disable("x-powered-by");

  app.use(helmet());
  app.use(express.json({ limit: "2000kb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(hpp());

  app.use(compression);

  if (config.node_env === "production") {
    app.use(cors);
  }
  app.use(loggerMiddleware);
  app.use(rateLimit);

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
