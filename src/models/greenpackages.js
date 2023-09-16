import { Schema, model, models } from "mongoose";

const packageSchema = new Schema({
  price: String,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  details: String,
});

const Package = models.Package || model("Package", packageSchema);

export default Package;
