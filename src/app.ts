import express, { Application } from "express";
import config from "./config";
import loaders from "./loaders";

async function startServer() {
  const app: Application = express();

  await loaders({ app });

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });

  process.on("uncaughtException", (error, promise) => {
    console.log("PROMISE REJECTION: ", promise);
    console.log("AN IMPORTANT ERROR HAPPENED: ", error);

    process.exit(1); // exit application
  });
}

startServer();
