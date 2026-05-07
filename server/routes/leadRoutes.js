import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// CREATE
router.post("/", protect, createLead);

// READ ALL
router.get("/", protect, getLeads);

// READ ONE
router.get("/:id", protect, getLeadById);

// UPDATE
router.put("/:id", protect, updateLead);

// DELETE
router.delete("/:id", protect, deleteLead);

export default router;
