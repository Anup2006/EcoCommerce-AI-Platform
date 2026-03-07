import { Router } from "express";
import { generateProductMetadata,saveProductMetadata,getProducts} from "../controllers/aiGenerator.controller.js";

const router = Router();

router.route("/generate-product-metadata").post(generateProductMetadata);
router.route("/save-product").post(saveProductMetadata);
router.route("/products").get(getProducts);

export default router;