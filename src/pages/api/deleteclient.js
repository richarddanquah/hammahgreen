import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import BcryptCompare from "../../lib/bcryptcompare";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/deleteclient") {
    console.log(req.body);
    const { clientId } = req.body;
    const { password } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("Finding User...");
      const foundUser = await User.find({ _id: clientId });
      //   console.log(foundUser);
      console.log("Comparing Passwords...");
      const comparePasswordResult = await BcryptCompare(
        password,
        foundUser[0].password
      );
      console.log(comparePasswordResult);

      if (comparePasswordResult !== true) {
        return res.status(400).send({ passworderror: "Incorrect password" });
      } else {
        console.log("DELETING CLIENT...");
        const deletedClient = await User.findByIdAndDelete({ _id: clientId });
        // const deletedClient = await User.find({ _id: clientId });
        console.log("CLIENT DELETED...");
        return res.status(200).send({ deletedClient });
        // console.log(deletedClient);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
