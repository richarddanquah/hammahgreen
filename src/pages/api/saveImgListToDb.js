import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/saveImgListToDb") {
    console.log(req.body);
    const { ID, imagePaths } = req.body;
    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");
      console.log("UPDATING IMAGE LIST ✔");
      const updateImgList = await Listing.findByIdAndUpdate(
        { _id: ID },
        {
          imgList: imagePaths,
        }
      );
      console.log("IMAGE LIST UPDATED SUCCESSFULLY ✔");
      return res.status(200).json({ updateImgList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
