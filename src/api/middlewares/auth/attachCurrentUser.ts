import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../../database/models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ _id: req.token.data._id });

    if (!user) res.status(401).end();

    req.currentUser = user;
    return next();
  } catch (error) {
    return res.json(error).status(501);
  }
};
