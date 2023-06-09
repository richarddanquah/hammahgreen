import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadProfileImg") {
    console.log(req.body);

    const { userId, userImgUrl } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING USER IMAGE");
      const updateImg = await User.findByIdAndUpdate(
        { _id: userId },
        { userImg: userImgUrl }
      );
      console.log("USER IMAGE UPDATED ✔");

      return res.status(200).send({ updateImg });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
