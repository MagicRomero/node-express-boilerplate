import { IUserDocument } from "./types";

export const buildFullname = function (this: IUserDocument): string {
  return `${this.firstname} ${this.lastname}`;
};
