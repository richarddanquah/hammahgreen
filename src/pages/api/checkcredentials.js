import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import BcryptCompare from "../../lib/bcryptcompare";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(422).send("req_method_not_supported");
  }

  const { email, password } = req.body;
  console.log(req.body);

  try {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("Finding User...");
    const foundUser = await User.find({ email: email });
    // console.log(foundUser[0]);

    if (foundUser[0] === undefined) {
      console.log(foundUser[0]);
      return res
        .status(401)
        .send({ Unauthorized: "That email does not exist. Try again..." });
    } else {
      console.log(foundUser[0]);
      console.log("Comparing Passwords...");
      const comparePasswordResult = await BcryptCompare(
        password,
        foundUser[0].password
      );
      console.log(comparePasswordResult); // returns true or false
      if (comparePasswordResult === true) {
        const user = {
          name: `${foundUser[0].fname} ${foundUser[0].lname}`,
          email: foundUser[0].email,
          image: foundUser[0].userImg,
        };
        console.log(user);
        return res.status(200).send(user);
      } else {
        return res.status(401).send({ 401: "Unauthorized" });
      }
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}
