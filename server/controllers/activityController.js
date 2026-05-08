import Activity from "../models/Activity.js";

// GET activities for a lead
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      leadId: req.params.leadId,
    }).sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
