import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/editListing") {
    // console.log(req.body);
    const {
      id,
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
      youtubeVideoID,
      postername,
      posted,
    } = req.body;

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("EDITING PROPERTY LISTING");

      const updatedListing = await Listing.findByIdAndUpdate(
        { _id: id },
        {
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
          youtubeVideoID: youtubeVideoID,
          posterName: postername,
          posted: posted,
        }
      );
      console.log(updatedListing);
      console.log("LISTING DOCUMENT UPDATED SUCCESSFULLY ✔");
      return res.status(200).send({ updatedListing });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
