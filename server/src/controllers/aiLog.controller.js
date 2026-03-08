import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { AILog } from "../models/aiLog.model.js";

const getAILogs = asyncHandler(async (req, res) => {

  const logs = await AILog
    .find()
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(
      200,
      logs,
      "AI logs fetched successfully"
    )
  );

});

export { getAILogs };