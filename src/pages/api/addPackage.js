import connectDB from "../../lib/connectMongoDB";
import Package from "../../models/greenpackages";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addPackage") {
    const { price, name, details } = req.body;
    console.log(req.body);
    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("CREATING DOCUMENT...");
      const createNewPackage = new Package({
        price: price,
        name: name,
        details: details,
      });
      const createdPackage = await createNewPackage.save();
      console.log("PACKAGE DOCUMENT CREATED SUCCESSFULLY ✔");
      return res.status(200).send({ createdPackage });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
