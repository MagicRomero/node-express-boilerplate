import { Router, Request, Response } from "express";

export default (app: Router) => {
  const route = Router();

  app.use("/users", route);

  route.get("/me", (req: Request, res: Response) => {
    return res.status(200).json({ me: "ESE SOY YO COLEGA" });
  });
};
