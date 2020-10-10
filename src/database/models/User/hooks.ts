import * as argon2 from "argon2";
import { HookNextFunction } from "mongoose";
import { IUserDocument } from "./types";

export const beforeSave = async function (
  this: IUserDocument,
  next: HookNextFunction
) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await argon2.hash(this.password);
};
