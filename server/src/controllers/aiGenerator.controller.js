import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateProductMetadataAI } from "../utils/aiService.js";
import { ProductMetadata } from "../models/productMetadata.models.js";

const generateProductMetadata = asyncHandler(async (req, res) => {

  const { title, description, material, price } = req.body;

  if (!title || !description) {
    throw new apiError(400, "Title and description required");
  }

  const metadata = await generateProductMetadataAI({
    title,
    description,
    material,
    price
  });

  return res.status(200).json(
    new apiResponse(
      200,
      metadata,
      "Metadata generated successfully"
    )
  );

});

const saveProductMetadata = asyncHandler(async (req, res) => {

  const product = await ProductMetadata.create({
    ...req.body,
    generatedAt: new Date()
  });

  return res.status(201).json(
    new apiResponse(
      201,
      product,
      "Product saved successfully"
    )
  );

});

const getProducts = asyncHandler(async (req, res) => {

  const products = await ProductMetadata
    .find()
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        products,
        "Products fetched successfully"
      )
    );
});

export {
  generateProductMetadata,
  saveProductMetadata,
  getProducts
};