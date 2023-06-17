import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";
export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addListing") {
    const {
      mainImg,
      title,
      description,
      paragraph1,
      paragraph2,
      saletag,
      price,
      type,
      location,
      bedrooms,
      baths,
      sqft,
      amenities,
      built,
      featured,
      homepageheader,
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
        paragraph1: paragraph1,
        paragraph2: paragraph2,
        price: price,
        type: type,
        location: location,
        saleTag: saletag,
        garages: garages,
        bedrooms: bedrooms,
        baths: baths,
        sqft: sqft,
        amenities: amenities,
        built: built,
        featured: featured,
        homepageheader: homepageheader,
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
