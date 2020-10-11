import { Router } from "express";
import { user } from "./routes";

export default () => {
  const router = Router();

  user(router);
  // auth(router);

  return router;
};
