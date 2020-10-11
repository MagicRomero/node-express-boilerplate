import { Document, Model } from "mongoose";

export enum Role {
  SUPERADMIN = "super-admin",
  ADMIN = "admin",
  NORMAL = "normal",
}

export enum NotificationChannels {
  EMAIL = "email",
  SMS = "sms",
}

export interface User {
  firstname: string;
  lastname?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role: Role;
  notification_channels: Array<NotificationChannels>;
  createdAt?: Date;
}

export interface IUserDocument extends User, Document {}
export interface IUserDocumentModel extends Model<IUserDocument> {}
