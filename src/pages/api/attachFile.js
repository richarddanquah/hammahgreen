import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/attachFile") {
    const { iD, url } = req.body;
    console.log(req.body);
    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");
      console.log("ADDING ATTACHMENT ✔");
      const addAttachment = await Listing.findByIdAndUpdate(
        { _id: iD },
        {
          attachmenturl: url,
        }
      );
      console.log("ATTACHMENT ADDED ✔");
      return res.status(200).json({ addAttachment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
}
