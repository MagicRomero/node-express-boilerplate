import { Request, Response, Router } from "express";
import { attachCurrentUser, isAuth, checkRole } from "../middlewares/auth";
import { UserModel } from "database/models";
import { Role } from "database/models/User/types";
import AuthService from "services/AuthService";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signin-as-user",
    isAuth,
    attachCurrentUser,
    checkRole(Role.SUPERADMIN),
    async (req: Request, res: Response) => {
      const userRecord = await UserModel.findOne({ email: req.body.email });

      if (!userRecord) return res.status(404).send("User not found");

      return res
        .json({
          user: {
            email: userRecord.email,
            username: userRecord.username,
          },
          jwt: AuthService.generateToken(userRecord),
        })
        .status(200);
    }
  );
};
