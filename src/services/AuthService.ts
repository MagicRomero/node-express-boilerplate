import jwt from "jsonwebtoken";
import { IUserDocument } from "database/models/User/types";
import config from "../config";

class AuthService {
  public static generateToken(user: IUserDocument) {
    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return jwt.sign({ data }, config.token_secret, {
      expiresIn: config.token_expiration,
    });
  }
}

export default AuthService;
