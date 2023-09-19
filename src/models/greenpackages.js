import { Schema, model, models } from "mongoose";

const packageSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  price: String,
  features: [],
  // featureI: String,
  // featureII: String,
  // featureIII: String,
  // featureIV: String,
});

const Package = models.Package || model("Package", packageSchema);

export default Package;
