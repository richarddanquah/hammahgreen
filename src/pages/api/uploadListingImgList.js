const fs = require("fs");
const path = require("path");
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadListingImgList") {
    // console.log(req.body);

    const { filename, data } = req.body;

    try {
      // Specify the desired folder where files will be saved
      const filePath = path.join(
        __dirname,
        "../../../../public/assets/images/property/",
        filename
      );
      // console.log(filePath);
      // Write the file to the specified folder
      fs.writeFile(
        filePath,
        data.split(";base64,").pop(),
        { encoding: "base64" },
        (err) => {
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
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
