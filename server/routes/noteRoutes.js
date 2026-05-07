import express from "express";

import { createNote, getNotesByLead } from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE NOTE
router.post("/:leadId", protect, createNote);

// GET NOTES FOR LEAD
router.get("/:leadId", protect, getNotesByLead);

export default router;
