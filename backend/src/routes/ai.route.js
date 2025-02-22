import express from "express"
import { aiController } from "../controllers/ai.controller.js"

// creating routes
const router = express.Router()

// routes
router.route("/get-review").post(aiController)

export default router