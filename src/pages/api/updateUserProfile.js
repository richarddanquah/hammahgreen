import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/updateUserProfile") {
    // console.log(req.body);

    const {
      userId,
      firstname,
      lastname,
      email,
      position,
      license,
      mobile,
      company,
      address,
      about,
    } = req.body;

    // console.log(userId, email, company);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING USER INFO");
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          fname: firstname,
          lname: lastname,
          email: email,
          position: position,
          license: license,
          mobile: mobile,
          company: company,
          address: address,
          about: about,
        }
      );
      console.log("USER INFO UPDATED SUCCESSFULLY");
      return res.status(200).send({ updateUser });

    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
