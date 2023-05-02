const fs = require("fs");
const path = require("path");

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadNotificationImg") {
    // console.log(req.body.filename);

    const fileName = req.body.filename;
    const fileData = req.body.data;

    const base64Image = fileData.split(";base64,").pop();

    // Set the file path to the uploads directory
    const filePath = path.join(
      __dirname,
      "../../../../public/assets/images/notifications/",
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
        console.log("File " + fileName + " saved successfully");
      }
    });
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
