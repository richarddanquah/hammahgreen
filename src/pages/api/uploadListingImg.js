const fs = require("fs");
const path = require("path");

// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from "../../lib/s3Client";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadListingImg") {
    // console.log(req.body);

    // const base64Image = req.body.data.split(";base64,").pop();

    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET_NAME, // The name of the bucket. For example, 'sample-bucket-101'.
    //   Key: req.body.filename, // The name of the object. For example, 'sample_upload.txt'.
    //   ContentType: image.type,
    //   Body: base64Image, // The content of the object. For example, 'Hello world!".
    // };

    // const results = await s3Client.send(new PutObjectCommand(params));
    // console.log(
    //     "Successfully created " +
    //     params.Key +
    //     " and uploaded it to " +
    //     params.Bucket +
    //     "/" +
    //     params.Key
    // );

    // console.log(results);

    const fileName = req.body.filename;
    const fileData = req.body.data;

    const base64Image = fileData.split(";base64,").pop();

     // Specify the desired folder where files will be saved
    const filePath = path.join(
      __dirname,
      "../../../../public/assets/images/property/",
      fileName
    );
    console.log(filePath);
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
        console.log("File" + fileName + " saved successfully");
      }
    });
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
