import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Notification from "../../models/notificaiton";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/sendNotification") {
    const { receiverid, date, subject, message, sendername } = req.body;
    console.log(receiverid);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("CREATING NOTIFICATION DOCUMENT...");
      const newNotification = new Notification({
        to: receiverid,
        date: date,
        subject: subject,
        message: message,
        sendername: sendername,
      });
      const sentNotification = await newNotification.save();
      console.log("NOTIFICATION SENT SUCCESSFULLY...");
      console.log({ sentNotification });

      // console.log("UPDATING USER DOCUMENT WITH NOTIFICATION...");
      // const updateUser = await User.findOneAndUpdate(
      //   { email: receiverid },
      //   {
      //     notifications: newNotification,
      //   }
      // );
      // console.log("USERS DOCUMENT UPDATED SUCCESSFULLY...");
      // console.log({ updateUser });
      return res.status(200).send({ sentNotification });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
