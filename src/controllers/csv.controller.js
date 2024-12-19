import { processCSVFile } from "../utils/csvParser.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { insertUserDataInBatches } from "../models/user.model.js";
import { validateCSVFileType } from "../utils/fileValidator.js";
import { query } from "../db/index.js";
import { printTable } from "console-table-printer";
import { BATCH_SIZE } from "../constants.js";
import { calculateAgeDistribution } from "../utils/calculateAgeDistribution.js";

const uploadCSV = async (req, res) => {
  try {
    const filePath = process.env.FILE_LOCATION;
    validateCSVFileType(filePath);

    const jsonData = await processCSVFile(filePath);
    if (!jsonData.length) {
      throw new ApiError(400, "No data found in the uploaded CSV");
    }

    await insertUserDataInBatches(jsonData, BATCH_SIZE);

    const ageDistribution = await calculateAgeDistribution();
    console.log("\n=== Age Distribution Report ===\n");
    printTable(ageDistribution)

    res
      .status(200)
      .json(new ApiResponse(200, jsonData, "csv upload complete", true));
  } catch (e) {
    let msg = "Error while uploadingCSV: " + e.message 
    console.log(msg);
    res.status(500).json(
      new ApiResponse(500, null, msg, false)
    );
  }
};

export { uploadCSV };
