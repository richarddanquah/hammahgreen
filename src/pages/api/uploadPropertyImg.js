const fs = require("fs");
const path = require("path");
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadPropertyImg") {
    console.log(req.body);

    const { filename, data, propertyId } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING PROPERTY LISTING IMAGE");
      const updateImg = await Listing.findByIdAndUpdate(
        { _id: propertyId },
        { mainImage: `/assets/images/property/${filename}` }
      );
      console.log("PROPERTY IMAGE UPDATED ✔");

      /////////////////////////////////////////////////

      const base64Image = data.split(";base64,").pop();

      // Set the file path to the uploads directory
      const filePath = path.join(
        __dirname,
        "../../../../public/assets/images/property/",
        filename
      );

      // Save the file to the server
      fs.writeFile(filePath, base64Image, { encoding: "base64" }, (err) => {
        if (err) {
          console.error(err);
          console.error("Error Saving File");
          res.statusCode = 500;
          res.end("Error saving file");
        } else {
          res.statusCode = 200;
          res.end("File saved successfully");
          console.log("File " + filename + " saved successfully");
        }
      });

      return res.status(200).send({ updateImg });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
