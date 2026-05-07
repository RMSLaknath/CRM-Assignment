import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    email: String,
    phone: String,
    source: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New",
    },
    dealValue: Number,
    assignedTo: String,
  },
  { timestamps: true },
);

export default mongoose.model("Lead", leadSchema);
