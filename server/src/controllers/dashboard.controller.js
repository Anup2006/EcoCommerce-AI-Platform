// controllers/dashboard.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ProductMetadata } from "../models/productMetadata.model.js";
import { Order } from "../models/order.model.js";
import { ConversationLog } from "../models/conversation.model.js";

export const getDashboardData = asyncHandler(async (req, res) => {

  // Fetch stats
  const totalRevenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);
  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  const productCount = await ProductMetadata.countDocuments();
  const activeOrders = await Order.countDocuments({ status: "Processing" });
  const aiConversations = await ConversationLog.countDocuments();

  // Fetch recent activity (last 10)
  const recentActivityLogs = await ConversationLog.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return res.status(200).json(new apiResponse(200, {
    stats: {
      totalRevenue,
      productCount,
      activeOrders,
      aiConversations
    },
    recentActivity: recentActivityLogs.map(log => ({
      title: log.customerMessage.includes("metadata") ? "AI Generated Product Metadata" : "Customer Support Resolved",
      description: log.aiResponse,
      time: new Date(log.createdAt).toLocaleTimeString(),
      icon: log.customerMessage.includes("metadata") ? "Sparkles" : "MessageSquare"
    }))
  }, "Dashboard data fetched"));
});