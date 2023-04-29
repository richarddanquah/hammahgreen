import { Schema, model, models } from "mongoose";

export const notificationSchema = new Schema ({
    to: String,
    date: String,
    subject: String,
    message: String,
    sendername: String,
});

const Notification = models.Notification || model("Notification", notificationSchema);

export default Notification;