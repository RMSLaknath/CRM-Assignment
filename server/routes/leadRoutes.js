import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
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

// UPDATE STATUS
router.patch("/:id/status", protect, updateLeadStatus);

// DELETE
router.delete("/:id", protect, deleteLead);

export default router;
