import Lead from "../models/Lead.js";

export const getDashboardStats = async (req, res) => {
  try {
    // GET ALL LEADS
    const leads = await Lead.find();

    // TOTAL LEADS
    const totalLeads = leads.length;

    // STATUS COUNTS
    const newLeads = leads.filter((lead) => lead.status === "New").length;

    const qualifiedLeads = leads.filter(
      (lead) => lead.status === "Qualified",
    ).length;

    const wonLeads = leads.filter((lead) => lead.status === "Won").length;

    const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

    // TOTAL DEAL VALUE
    const totalEstimatedDealValue = leads.reduce(
      (total, lead) => total + (lead.dealValue || 0),
      0,
    );

    // WON DEAL VALUE
    const totalWonDealsValue = leads
      .filter((lead) => lead.status === "Won")
      .reduce((total, lead) => total + (lead.dealValue || 0), 0);

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalEstimatedDealValue,
      totalWonDealsValue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
