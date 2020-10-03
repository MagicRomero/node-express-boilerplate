import express, { Application } from "express";
import config from "./config";
import loaders from "./loaders";

const startServer = async () => {
  const app: Application = express();

  await loaders(app);

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
};

startServer();
