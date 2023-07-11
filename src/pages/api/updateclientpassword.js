import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import BcryptCompare from "../../lib/bcryptcompare";
import Bcrypt from "../../lib/bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/updateclientpassword") {
    // console.log(req.body);
    const { clientId, currentpassword } = req.body;
    let { confirmnewpassword } = req.body;
    const encyptedpassword = await Bcrypt(confirmnewpassword);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("Finding User...");
      const foundUser = await User.find({ _id: clientId });
      //   console.log(foundUser);
      console.log("Comparing Passwords...");
      const comparePasswordResult = await BcryptCompare(
        currentpassword,
        foundUser[0].password
      );
      console.log(comparePasswordResult);

      if (comparePasswordResult !== true) {
        return res
          .status(400)
          .send({ currentpassworderror: "Incorrect password" });
      } else {
        console.log("UPDATING USER PASSWORD");
        const updatedpsw = await User.findByIdAndUpdate(
          { _id: clientId },
          { password: encyptedpassword }
        );
        console.log("USER PASSWORD UPDATED ✔");
        return res.status(200).send({ updatedpsw });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
