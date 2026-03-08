import { Router } from "express";
import { getAILogs } from "../controllers/aiLog.controller.js";

const router = Router();

router.route("/").get(getAILogs);

export default router;