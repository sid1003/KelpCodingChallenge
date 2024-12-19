import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;
import { createTableIfNotExists } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

dotenv.config({
  path: "./.env",
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res.rows;
  } catch (e) {
    let msg = "Error executing query: " + text + ": " + e.message;
    console.error(msg);
    throw new ApiError(500, msg);
  }
};

const dbConnectionTest = async () => {
  try {
    await createTableIfNotExists();
    console.log("\nDatabase connected successfully");
  } catch (e) {
    let msg = "Error connecting to the database: " + e.message;
    console.error(msg);
    throw new ApiError(500, msg);
  }
};

export { pool, query, dbConnectionTest };
