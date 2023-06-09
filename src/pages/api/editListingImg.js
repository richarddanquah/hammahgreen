import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/editListingImg") {
    // console.log(req.body);

    const { propertyId, imgUrl } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING PROPERTY LISTING IMAGE");
      const updateImg = await Listing.findByIdAndUpdate(
        { _id: propertyId },
        { mainImage: imgUrl }
      );
      console.log("PROPERTY IMAGE UPDATED ✔");

      return res.status(200).send({ updateImg });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
