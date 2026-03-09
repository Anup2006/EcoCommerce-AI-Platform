import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ProductMetadata } from "../models/productMetadata.model.js";
import { Order } from "../models/order.model.js";
import { ConversationLog } from "../models/conversation.model.js";
import { AILog } from "../models/aiLog.model.js";

export const getDashboardData = asyncHandler(async (req, res) => {

  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  const productCount = await ProductMetadata.countDocuments();
  const activeOrders = await Order.countDocuments({ status: "Processing" });
  const aiConversations = await ConversationLog.countDocuments();

  const conversationLogs = await ConversationLog.find()
    .sort({ createdAt: -1 })
    .lean();

  const aiLogs = await AILog.find({ module: "Product Generator" })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const recentActivity = [
    ...conversationLogs.map(log => ({
      title: "Customer Support Resolved",
      description: log.aiResponse,
      time: log.createdAt,
      icon: "MessageSquare",
    })),
    ...aiLogs.map(log => ({
      title:"AI Generated Product Metadata",
      description: log.details,
      time: log.createdAt,
      icon: "Sparkles",
    }))
  ]

  .sort((a, b) => new Date(b.time) - new Date(a.time))

  .slice(0, 3)

  .map(act => ({
    ...act,
    time: new Date(act.time).toLocaleString()
  }));

  return res.status(200).json(new apiResponse(200, {
    stats: {
      totalRevenue,
      productCount,
      activeOrders,
      aiConversations
    },
    recentActivity
  }, "Dashboard data fetched"));
});