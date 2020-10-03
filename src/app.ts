const express = require("express");
const config = require("./config");

async function startServer() {
  const app = express();

  app.use(express.json());

  app.listen(config.port, (err) => {
    if (err) {
      console.log("An error happened ", err);
      return;
    }

    console.log(`Server listening on port ${config.port}`);
  });

  process.on("uncaughtException", (error, promise) => {
    console.log("PROMISE REJECTION: ", promise);
    console.log("AN IMPORTANT ERROR HAPPENED: ", error);

    process.exit(1); // exit application
  });
}

startServer();
