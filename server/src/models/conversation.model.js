import mongoose,{Schema} from "mongoose";

const conversationSchema = new Schema({
  customerMessage: String,
  aiResponse: String,
  priority: {
    type: String,
    enum: ["Normal", "High"],
    default: "Normal"
  },
  orderId: {
    type: String,
    default: null
  }
}, { timestamps: true });

export const ConversationLog = mongoose.model("ConversationLog", conversationSchema);