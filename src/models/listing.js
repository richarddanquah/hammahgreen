import { Schema, models, model } from "mongoose";

const listingSchema = new Schema({
  img: String,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: String,
  type: String,
  location: String,
  saleTage: String,
  garages: String,
  bedrooms: String,
  baths: String,
  sqft: String,
  posterName: String,
  posted: {
    type: Date,
    default: Date.now,
  },
});

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing;
