import { query } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { TABLE_NAME, BATCH_SIZE } from "../constants.js";


const createTableIfNotExists = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.${TABLE_NAME} (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      address JSONB,
      additional_info JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

    await query(createTableQuery);
  } catch (e) {
    let msg = "Error creating table: \n" + e.message;
    console.log(msg);
    throw new ApiError(500, msg);
  }
};

const insertUserDataInBatches = async (userDataArray, BATCH_SIZE) => {
  try {

    console.log("\n Batch size: " + BATCH_SIZE + "\n");

    for (let i = 0; i < userDataArray.length; i += BATCH_SIZE) {
      const batch = userDataArray.slice(i, i + BATCH_SIZE);
      await insertUserDataBulk(batch);
      console.log(`Batch ${i / BATCH_SIZE + 1} inserted successfully \n`);
    }

    console.log("All batches inserted successfully");
  } catch (error) {
    let msg = "Error inserting user data in batch: " + error.message;
    console.log(msg);
    throw new ApiError(500, msg);
  }
};

// Bulk insert function for a single batch
const insertUserDataBulk = async (userDataArray) => {
  try {
    const insertQuery = `
    INSERT INTO public.users (name, age, address, additional_info)
    VALUES 
    ${userDataArray
      .map(
        (_, index) =>
          `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${
            index * 4 + 4
          })`
      )
      .join(", ")}
  `;

    const queryParams = userDataArray.flatMap((user) => {
      const { name, age, address, ...additionalInfo } = user;

      return [
        `${name.firstName} ${name.lastName}`, 
        age, 
        JSON.stringify(address || {}), 
        JSON.stringify(additionalInfo || {}), 
      ];
    });


    await query(insertQuery, queryParams);
  } catch (e) {
    let msg = "Error while inserting records " + e.message;
    console.log(msg);
    throw new ApiError(500, msg);
  }
};

export { createTableIfNotExists, insertUserDataInBatches };
