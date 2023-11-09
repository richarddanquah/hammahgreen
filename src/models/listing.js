import { Schema, models, model } from "mongoose";

const listingSchema = new Schema({
  mainImage: String,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  paragraph1: String, //added
  paragraph2: String, //added
  price: String,
  type: String,
  location: String,
  saleTag: String,
  garages: String,
  bedrooms: String,
  baths: String,
  sqft: String,
  amenities: Array, //added
  built: String, //added
  featured: String, //added
  homepageheader: String, //added
  posterName: String,
  posted: String,
  imgList: Array,
  youtubeVideoID: String, //added
  attachmenturl: String, //added
});

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing;
