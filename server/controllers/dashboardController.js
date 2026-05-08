import Lead from "../models/Lead.js";

export const getDashboardStats = async (req, res) => {
  try {
    const leads = await Lead.find();

    const totalLeads = leads.length;

    const newLeads = leads.filter((l) => l.status === "New").length;

    const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;

    const wonLeads = leads.filter((l) => l.status === "Won").length;

    const lostLeads = leads.filter((l) => l.status === "Lost").length;

    // 🔥 FIX: use dealValue (NOT value)
    const totalDealValue = leads.reduce(
      (sum, lead) => sum + (lead.dealValue || 0),
      0,
    );

    const wonDealValue = leads.reduce(
      (sum, lead) =>
        lead.status === "Won" ? sum + (lead.dealValue || 0) : sum,
      0,
    );

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalDealValue,
      wonDealValue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
