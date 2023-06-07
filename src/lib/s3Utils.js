import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

export async function uploadToS3(fileName, file) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, // The name of the bucket.
    Key: fileName, // The name of the object. For example, 'sample_upload.txt'.
    Body: file, // The content of the object. For example, 'Hello world!".
  };

  const results = await s3Client.send(new PutObjectCommand(params));
  console.log(
    "Successfully created " +
      params.Key +
      " and uploaded it to " +
      params.Bucket +
      "/" +
      params.Key
  );
  console.log(results.$metadata);

  return results;
}

// const selectedFile = (e) => {
//   const image = e.target.files[0];
//   if (image) {
//     setLoading3(true);
//     const s3 = new AWS.S3({
//       accessKeyId: awsID,
//       secretAccessKey: awsSECRET,
//     });

//     const params = {
//       Bucket: awsBucketName,
//       Key: create_UUID() + image.name, // File name you want to save as in S3
//       Body: image,
//       ContentType: image.type,
//       ACL: "public-read",
//     };

//     s3.upload(params, function (err, data) {
//       if (err) {
//         console.log(err, "failure");
//         setLoading3(false);
//       }
//       // console.log("success");

//       // console.log(data.Location, "link");
//       let photoUrl = data.Location;
//       setimage(photoUrl);
//       setLoading3(false);

//       // Editor.insertEmbed(cursorLocation, "image", photoUrl);
//       // resetUploader();
//     }).on("httpUploadProgress", function (progress) {
//       let uploaded = Math.round((progress.loaded / progress.total) * 100);
//       setProgress(uploaded);
//     });
//   }
// };