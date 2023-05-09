const fs = require("fs");
const path = require("path");
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/uploadProfileImg") {
    console.log(req.body);

    const { filename, data, userId } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("UPDATING USER IMAGE");
      const updateImg = await User.findByIdAndUpdate(
        { _id: userId },
        { userImg: `/assets/images/profileImgs/${filename}` }
      );
      console.log("USER IMAGE UPDATED ✔");

      //   const fileName = req.body.filename;
      //   const fileData = req.body.data;

      const base64Image = data.split(";base64,").pop();

      // Set the file path to the uploads directory
      const filePath = path.join(
        __dirname,
        "../../../../public/assets/images/profileImgs/",
        filename
      );
      //   console.log(filePath);
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
