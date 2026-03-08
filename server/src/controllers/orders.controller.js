import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {

  const { orderId, customerName, items, total, status, deliveryDate } = req.body;

  if (!orderId || !customerName) {
    throw new apiError(400, "Order ID and customer name are required");
  }

  const order = await Order.create({
    orderId,
    customerName,
    items,
    total,
    status,
    deliveryDate
  });

  return res.status(201).json(
    new apiResponse(
      201,
      order,
      "Order created successfully"
    )
  );

});

const getOrders = asyncHandler(async (req, res) => {

  const orders = await Order
    .find()
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(
      200,
      orders,
      "Orders fetched successfully"
    )
  );

});

const getOrderById = asyncHandler(async (req, res) => {

  const { orderId } = req.params;

  const order = await Order.findOne({ orderId });

  if (!order) {
    throw new apiError(404, "Order not found");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      order,
      "Order fetched successfully"
    )
  );

});

export {
  createOrder,
  getOrders,
  getOrderById
};