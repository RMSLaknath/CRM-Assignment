import express from "express";
import { getActivities } from "../controllers/activityController.js";

const router = express.Router();

router.get("/:leadId", getActivities);

export default router;
