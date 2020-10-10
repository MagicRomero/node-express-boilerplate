import { Document, Model } from "mongoose";

enum Role {
  ADMIN = "admin",
  NORMAL = "normal",
}

enum NotificationChannels {
  EMAIL = "email",
  SMS = "sms",
}

export interface IUserDocument extends Document {
  firstname: string;
  lastname?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role: Role;
  notification_channels: NotificationChannels;
  created_at: Date;
}

export interface IUserDocumentModel extends Model<IUserDocument> {}
