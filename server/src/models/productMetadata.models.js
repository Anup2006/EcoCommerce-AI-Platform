import mongoose,{Schema} from "mongoose";

const productMetadataSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    material: {
      type: String
    },

    price: {
      type: Number
    },

    primaryCategory: {
      type: String,
      required: true
    },

    subCategory: {
      type: String
    },

    seoTags: [
      {
        type: String
      }
    ],

    sustainabilityFilters: [
      {
        type: String
      }
    ],

    generatedAt: {
      type: Date,
      default: Date.now
    }

  },
  { timestamps: true }
);

export const ProductMetadata = mongoose.model("ProductMetadata",productMetadataSchema);