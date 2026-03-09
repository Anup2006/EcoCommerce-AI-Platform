import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generatechatBotResponse } from "../utils/aiChatbotService.js";
import { ConversationLog } from "../models/conversation.model.js";
import { Order } from "../models/order.model.js";
import { AILog } from "../models/aiLog.model.js";

const chatWithBot = asyncHandler(async (req, res) => {

  let { message, orderId, sessionId } = req.body;

  if (!message) {
    throw new apiError(400, "Message is required");
  }

  if (!sessionId) {
    throw new apiError(400, "Session ID is required");
  }

  if (!orderId) {
    const match = message.match(/ORD\d+|\b\d{4}\b/i);
    if (match) {
      orderId = match[0];
    }
  }

  if (!orderId) {

    const lastConversation = await ConversationLog
      .findOne({
        sessionId,
        orderId: { $ne: null }
      })
      .sort({ createdAt: -1 });

    if (lastConversation) {
      orderId = lastConversation.orderId;
    }

  }

  let orderData = null;

  if (orderId) {

    orderData = await Order.findOne({
      orderId: { $regex: orderId, $options: "i" }
    });

  }

  const aiResult = await generatechatBotResponse({
    message,
    orderData
  });

  const conversation = await ConversationLog.create({

    sessionId,
    customerMessage: message,
    aiResponse: aiResult.reply,
    priority: aiResult.priority,
    orderId: orderId || null

  });

  await AILog.create({

    module: "Support Bot",
    action: "Customer Inquiry",
    details: message,
    confidence: aiResult.confidence || 90,
    status: aiResult.escalate ? "Escalated" : "Success"

  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        reply: aiResult.reply,
        priority: aiResult.priority,
        escalate: aiResult.escalate,
        confidence: aiResult.confidence,
        conversation
      },
      "AI response generated successfully"
    )
  );

});

const getConversationLogs = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    throw new apiError(400, "Session ID is required");
  }

  const logs = await ConversationLog
    .find({ sessionId })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(200, logs, "Logs fetched")
  );
});

export { 
  chatWithBot,
  getConversationLogs
};