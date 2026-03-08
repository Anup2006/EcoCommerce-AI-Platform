import mongoose from "mongoose";
import dotenv from "dotenv";
import { Order } from "../models/order.model.js";
import { DB_NAME } from "../constant.js";

dotenv.config();
const orders = [
  {
    orderId: "ORD1001",
    user: new mongoose.Types.ObjectId("64f000000000000000000001"),
    productId: "69ac3bc887ffd8c51d62de0e",
    productTitle: "Recycled Plastic Water Bottle",
    totalAmount: 19.99,
    status: "Shipped",
    estimatedDelivery: new Date("2026-03-10")
  },
  {
    orderId: "ORD1002",
    user: new mongoose.Types.ObjectId("64f000000000000000000002"),
    productId: "69ac3ef787ffd8c51d62de14",
    productTitle: "Organic Cotton T-Shirt",
    totalAmount: 30,
    status: "Processing",
    estimatedDelivery: new Date("2026-03-12")
  },
  {
    orderId: "ORD1003",
    user: new mongoose.Types.ObjectId("64f000000000000000000003"),
    productId: "69ac463f87ffd8c51d62de1e",
    productTitle: "Hemp Backpack",
    totalAmount: 79.89,
    status: "Delivered",
    estimatedDelivery: new Date("2026-03-06")
  }
];


const seed = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

  await Order.deleteMany();

  for (const order of orders) {
    await Order.create(order);
  }

  console.log("Orders seeded successfully");

  process.exit();
};

seed();