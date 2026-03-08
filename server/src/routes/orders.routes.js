import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById
} from "../controllers/orders.controller.js";

const router = Router();

router.route("/create").post(createOrder);
router.route("/").get( getOrders);
router.route("/:orderId").get( getOrderById);

export default router;