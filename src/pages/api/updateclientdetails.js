import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/updateclientdetails") {
    // console.log(req.body);
    const { clientId, fname, lname, phone, address } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING USER DETAILS");
      const updatedDetails = await User.findByIdAndUpdate(
        { _id: clientId },
        {
          fname: fname,
          lname: lname,
          mobile: phone,
          address: address,
        }
      );
      console.log("USER DETAILS UPDATED ✔");
      return res.status(200).send({ updatedDetails });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
