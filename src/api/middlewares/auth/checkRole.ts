import { NextFunction, Request, Response } from "express";
import { Role } from "../../../database/models/User/types";

export default (requiredRole: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser.role !== requiredRole) {
      return res.status(401).end();
    } else {
      return next();
    }
  };
};
