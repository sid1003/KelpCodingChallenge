import { Router } from "express";
import { uploadCSV } from "../controllers/csv.controller.js"

const router = Router()

router.route("/upload").post(uploadCSV)

export default router