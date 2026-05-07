import Note from "../models/Note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      leadId: req.params.leadId,
      content: req.body.content,
      createdBy: "Admin",
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET NOTES FOR A LEAD
export const getNotesByLead = async (req, res) => {
  try {
    const notes = await Note.find({
      leadId: req.params.leadId,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
