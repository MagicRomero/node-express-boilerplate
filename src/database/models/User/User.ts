import { model, Schema } from "mongoose";
import { beforeSave } from "./hooks";
import { IUserDocument } from "./types";
import { buildFullname } from "./virtuals";

const UserSchema: Schema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, "The firstname is required"],
  },
  lastname: {
    type: String,
    trim: true,
    required: false,
    default: "",
  },
  username: {
    type: String,
    trim: true,
    required: [true, "The username field is required"],
    unique: true,
    match: [
      /^[\w\s\d-_.]{3, 20}$/,
      "Min length is 3 and max length is 20 characters, we only allow specials like . - _",
    ],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "The email field is mandatory"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  phone: {
    type: String,
    trim: true,
    required: false,
    unique: true,
    match: [/^[\d-+\(\)]{6,20}$/, "Please add a valid phone number"],
  },
  role: {
    type: String,
    enum: ["admin", "normal"],
    default: "normal",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    maxlength: 150,
    select: false,
  },
  notification_channels: {
    type: [String],
    enum: ["email", "sms"],
    default: ["email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", beforeSave);
UserSchema.virtual("fullName").get(buildFullname);

export default model<IUserDocument>("User", UserSchema);
