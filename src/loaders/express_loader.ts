import express, { Application } from "express";
import helmet from "helmet";

export default async ({ app }: { app: Application }) => {
  app.use(helmet());
  app.use(express.json());

  return app;
};
