const fs = require("fs");
const path = require("path");
// import { uploadToS3 } from "../../lib/s3Utils";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadListingImg") {
    console.log(req.body);

    try {
      const { name, type } = req.body;

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: name, // File name you want to save as in S3
        Expires: 600,
        ContentType: type,
        ACL: "public-read",
      };

      const url = await s3.getSignedUrlPromise("putObject", params);

      console.log(url);
      res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }

    ///////////////////////////////////

    // const fileName = req.body.filename;
    // const fileData = req.body.data;
    // const base64Image = fileData.split(";base64,").pop();
    //  // Specify the desired folder where files will be saved
    // const filePath = path.join(
    //   __dirname,
    //   "../../../../public/assets/images/property/",
    //   fileName
    // );
    // console.log(filePath);
    // // Save the file to the server
    // fs.writeFile(filePath, base64Image, { encoding: "base64" }, (err) => {
    //   if (err) {
    //     console.error(err);
    //     console.error("Error Saving File");
    //     res.statusCode = 500;
    //     res.end("Error saving file");
    //   } else {
    //     res.statusCode = 200;
    //     res.end("File saved successfully");
    //     console.log("File" + fileName + " saved successfully");
    //   }
    // });
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
