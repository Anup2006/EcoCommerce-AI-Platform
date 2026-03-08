import mongoose,{Schema} from "mongoose";

const aiLogSchema = new Schema({
    module: {
      type: String,
      enum: ["Product Generator", "Support Bot"],
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    confidence: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Success", "Escalated", "Failed"],
      default: "Success",
    },
},
{ timestamps: true });

export const AILog = mongoose.model("AILog", aiLogSchema);