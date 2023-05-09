import { Schema, model, models } from "mongoose";
import { notificationSchema } from "./notificaiton";

const userSchema = new Schema({
  userImg: String,
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  notifications: [notificationSchema],
  position: String,
  license: String,
  mobile: Number,
  company: String,
  address: String,
  about: String,
});

const User = models.User || model("User", userSchema);

export default User;
