import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing"
export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addListing") {

    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    // })

    const {
      mainImg,
      title,
      description,
      saletag,
      price,
      type,
      location,
      bedrooms,
      baths,
      sqft,
      garages,
      postername,
      posted,
    } = req.body;

    console.log(req.body);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("CREATING DOCUMENT...");
      const newListing = await new Listing({
        mainImage: mainImg,
        title: title,
        description: description,
        price: price,
        type: type,
        location: location,
        saleTag: saletag,
        garages: garages,
        bedrooms: bedrooms,
        baths: baths,
        sqft: sqft,
        posterName: postername,
        posted: posted,
      });

      const listingCreated = await newListing.save();
      console.log("LISTING DOCUMENT CREATED SUCCESSFULLY ✔");
      return res.status(200).send({ listingCreated });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
