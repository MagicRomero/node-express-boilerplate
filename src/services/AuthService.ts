import jwt from "jsonwebtoken";
import { IUserDocument, User } from "../database/models/User/types";
import config from "../config";
import { UserModel } from "../database/models";
import * as argon2 from "argon2";

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

  public static async signUp(data: User): Promise<any> {
    const userRecord = await UserModel.create(data);

    return {
      user: {
        ...userRecord,
      },
    };
  }

  public static async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      throw new Error("User not found with this credentials");
    } else {
      const correctPassword = await argon2.verify(
        userRecord.password,
        password
      );
      if (!correctPassword) {
        throw new Error(
          "This credentials doesn't match any record on our database"
        );
      }
    }

    return {
      user: {
        email: userRecord.email,
        username: userRecord.username,
      },
      token: this.generateToken(userRecord),
    };
  }
}

export default AuthService;
