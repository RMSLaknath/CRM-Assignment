import Lead from "../models/Lead.js";

/* =========================
   CREATE LEAD (FIXED)
========================= */
export const createLead = async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      source,
      status,
      dealValue,
      assignedTo,
    } = req.body;

    const lead = await Lead.create({
      name,
      company,
      email,
      phone,
      source,
      status,
      dealValue: Number(dealValue || 0),
      assignedTo,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL LEADS (UNCHANGED)
========================= */
export const getLeads = async (req, res) => {
  try {
    const { status, source, assignedTo, search } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (assignedTo) filter.assignedTo = assignedTo;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET SINGLE LEAD
========================= */
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE LEAD (FIXED FULL)
========================= */
export const updateLead = async (req, res) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      source,
      status,
      dealValue,
      assignedTo,
    } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        name,
        company,
        email,
        phone,
        source,
        status,
        dealValue: Number(dealValue || 0),
        assignedTo,
      },
      { new: true },
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE STATUS (PIPELINE)
========================= */
export const updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE LEAD
========================= */
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
