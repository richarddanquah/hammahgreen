const fs = require("fs");
const path = require("path");
import { Buffer } from "node:buffer";
import multer from "multer";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadListingImg") {
    console.log(req.body);
    // console.log("Successfully received");

    // const fileName = req.body.filename;
    // const fileData = req.body.data;

    // // Set the file path to the uploads directory
    // const filePath = path.join(
    //   __dirname,
    //   "../../../../public/assets/images/property/",
    //   fileName
    // );
    // console.log(filePath);
    // // Save the file to the server
    // fs.writeFile(filePath, Buffer.from(fileData), (err) => {
    //   if (err) {
    //     console.error(err);
    //     console.error("Error Saving File");
    //     res.statusCode = 500;
    //     res.end("Error saving file");
    //   } else {
    //     res.statusCode = 200;
    //     res.end("File saved successfully");
    //     console.error("File saved successfully");
    //   }
    // });
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
