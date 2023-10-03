import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Bcrypt from "../../lib/bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addUser") {
    console.log(req.body);
    const { fname, lname, email, role, createdby } = req.body;
    var { password } = req.body;
    password = await Bcrypt(password);
    
    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("CREATING DOCUMENT...");
      const newUser = await new User({
        fname: fname,
        lname: lname,
        email: email,
        role: role,
        password: password,
        createdby: createdby,
      });
      const userCreated = await newUser.save();
      console.log("USER DOCUMENT CREATED SUCCESSFULLY ✔");
      // console.log(userCreated);
      return res.status(200).send({ userCreated });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
