import { ApiError } from "./ApiError.js";

import fs from "fs"
import readline from "readline"

function parseLineToJSON(line, headers) {
  try {
    const values = line.split(",").map((value) => value.trim());
    const jsonObject = {};

    headers.forEach((header, index) => {
      const value = values[index];
      if (!value) return;

      const keys = header.split(".");
      let current = jsonObject;
      
      keys.forEach((key, idx) => {       
        if (idx === keys.length - 1) {
          current[key] = isNaN(value) ? value : Number(value);
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    });

    return jsonObject;
  } catch (e) {
    let msg = "Error while converting line to json: " + e.message;
    console.log(msg);
    throw new ApiError(500, msg);
  }
}

async function processCSVFile(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let headers = [];
    const jsonResults = [];

    for await (const line of rl) {
      if (!line.trim()) continue;
      if (!headers.length) {
        headers = line.split(",").map((header) => header.trim());
        continue;
      }
      const jsonObject = parseLineToJSON(line, headers);
      jsonResults.push(jsonObject);
      if (jsonResults.length % 10 === 0) {
        console.log(`\nProcessed ${jsonResults.length} rows so far...`);
      }
    }

    console.log("\nCSV processing completed");
    console.log(`\nTotal rows processed: ${jsonResults.length}`);

    return jsonResults;
  } catch (e) {
    let msg = "Error while processing CSV file: " + e.message;
    console.error(msg);
    throw new ApiError(500, msg);
  }
}

export { processCSVFile };
