import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import routes from "../api";
import { loggerMiddleware } from "../api/ middlewares";

export default async ({ app }: { app: Application }) => {
  app.enable("trust proxy");
  app.use(helmet());
  app.use(express.json({ limit: "2000kb" }));
  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        if (req.headers["x-no-compression"]) {
          // don't compress responses with this request header
          return false;
        }

        // fallback to standard filter function
        return compression.filter(req, res);
      },
    })
  );

  app.use(loggerMiddleware);

  app.use("/api/v1", routes());

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
