import { Schema, models, model } from "mongoose";

const listingSchema = new Schema({
  mainImage: String,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  paragraph1: String,
  paragraph2: String,
  price: String,
  type: String,
  location: String,
  saleTag: String,
  garages: String,
  bedrooms: String,
  baths: String,
  sqft: String,
  amenities: String, //new
  built: String, //new
  featured: String, //new
  homepageheader: String,
  posterName: String,
  posted: String,
  imgList: Array,
});

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing;
