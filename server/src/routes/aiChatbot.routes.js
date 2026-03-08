import { Router } from "express";
import { chatWithBot,getConversationLogs} from "../controllers/aiChatbot.controller.js";

const router = Router();

router.route("/chat").post( chatWithBot);
router.route("/logs").get(getConversationLogs);

export default router;