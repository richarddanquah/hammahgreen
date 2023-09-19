import connectDB from "../../lib/connectMongoDB";
import Package from "../../models/greenpackages";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/delPackage") {
    console.log(req.body);
    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("Finding and Deleting Package...");
      const deleted = await Package.findByIdAndDelete({ _id: req.body.id });
    //   console.log(deleted);
      console.log("Package Deletion Complete...");
      return res.status(200).send({ deleted });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
