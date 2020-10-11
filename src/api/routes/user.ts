import { Router, Request, Response } from "express";
import { attachCurrentUser, isAuth } from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/me", (req: Request, res: Response) => {
    return res.status(200).json({ user: req.currentUser });
  });
};
