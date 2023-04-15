import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(422).send("req_method_not_supported");
  }
  console.log(req.body);
  const id = req.body.id;

  try {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("Finding and Deleting User...");
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    console.log(deletedUser);
    console.log("User Deletion Complete...");
    return res.status(200).send({deletedUser});
  } catch (error) {
    return res.status(500).send({ error });
  }
}
