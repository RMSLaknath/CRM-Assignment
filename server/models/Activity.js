import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    type: {
      type: String,
      enum: ["CREATED", "STATUS_CHANGED", "NOTE_ADDED", "UPDATED"],
    },

    message: String,

    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Activity", activitySchema);
