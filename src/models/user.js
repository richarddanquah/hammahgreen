import { Schema, model, models } from "mongoose";
import { notificationSchema } from "./notificaiton";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notifications: [notificationSchema],
});

const User = models.User || model("User", userSchema);

export default User;
