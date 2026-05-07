import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    content: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
