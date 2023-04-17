import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(422).send("req_method_not_supported");
  }

  const {
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
    posted
  } = req.body;

//   console.log(req.body);
//   const data = req.body;
//   return res.status(200).send({ data });

  try {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("CREATING DOCUMENT...");
    const newListing = await new Listing({
        // img: ,
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
}
