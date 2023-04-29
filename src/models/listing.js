import { Schema, models, model } from "mongoose";

const listingSchema = new Schema({
  mainImage: String,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: String,
  type: String,
  location: String,
  saleTag: String,
  garages: String,
  bedrooms: String,
  baths: String,
  sqft: String,
  posterName: String,
  posted: String,
});

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing;
