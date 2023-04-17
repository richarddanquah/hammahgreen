import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

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

    console.log("Finding and Deleting Listing...");
    const deletedListing = await Listing.findByIdAndDelete({ _id: id });
    console.log(deletedListing);
    console.log("Listing Deletion Complete...");
    return res.status(200).send({ deletedListing });
  } catch (error) {
    return res.status(500).send({ error });
  }

}
