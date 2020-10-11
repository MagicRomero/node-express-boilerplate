import { Router } from "express";
import { user, auth } from "./routes";

export default () => {
  const router = Router();

  user(router);
  // auth(router);

  return router;
};
