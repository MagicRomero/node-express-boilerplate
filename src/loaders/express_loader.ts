import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";

export default async ({ app }: { app: Application }) => {
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

  return app;
};
