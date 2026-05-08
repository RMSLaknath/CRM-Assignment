import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Layout from "../components/layout/Layout";
import LeadTable from "../components/leads/LeadTable";
import LeadForm from "../components/leads/LeadForm";
import LeadModal from "../components/leads/LeadModal";

import { getLeads, deleteLead, createLead, updateLead } from "../api/leadApi";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  /* FILTER STATES */
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  /* FETCH LEADS */
  const fetchLeads = async () => {
    try {
      const res = await getLeads();

      setLeads(res.data);
    } catch {
      toast.error("Failed to load leads");
    }
  };

  /* CREATE LEAD */
  const handleCreate = async (data) => {
    try {
      await createLead({
        ...data,
        dealValue: Number(data.dealValue),
      });

      toast.success("Lead created");

      fetchLeads();
    } catch {
      toast.error("Failed to create lead");
    }
  };

  /* EDIT OPEN */
  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setIsOpen(true);
  };

  /* UPDATE LEAD */
  const handleUpdate = async (data) => {
    try {
      await updateLead(selectedLead._id, {
        ...data,
        dealValue: Number(data.dealValue),
      });

      toast.success("Lead updated");

      setIsOpen(false);

      fetchLeads();
    } catch {
      toast.error("Update failed");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    try {
      await deleteLead(id);

      toast.success("Lead deleted");

      fetchLeads();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* FILTERING */
  const filteredLeads = leads.filter((lead) => {
    return (
      lead.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? lead.status === statusFilter : true) &&
      (sourceFilter ? lead.source === sourceFilter : true) &&
      (assignedFilter ? lead.assignedTo === assignedFilter : true)
    );
  });

  /* CSV EXPORT */
  const exportCSV = () => {
    const headers = [
      "Name",
      "Company",
      "Email",
      "Phone",
      "Source",
      "Assigned To",
      "Status",
      "Deal Value",
      "Created Date",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.company,
      lead.email,
      lead.phone,
      lead.source,
      lead.assignedTo,
      lead.status,
      lead.dealValue,
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    let csvContent =
      headers.join(",") + "\n" + rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", "crm_leads.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* PDF EXPORT */
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("CRM Leads Report", 14, 15);

    autoTable(doc, {
      startY: 25,

      head: [["Name", "Company", "Email", "Status", "Deal Value"]],

      body: filteredLeads.map((lead) => [
        lead.name,
        lead.company,
        lead.email,
        lead.status,
        `$${lead.dealValue ?? 0}`,
      ]),
    });

    doc.save("crm_leads.pdf");
  };

  return (
    <Layout>
      {/* PAGE */}
      <div className="page">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Leads</h1>
            <p>Manage and track your CRM leads</p>
          </div>

          <div className="header-right">
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={exportCSV}>Export CSV</button>

            <button onClick={exportPDF}>Export PDF</button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters card">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <input
            type="text"
            placeholder="Filter by source"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by salesperson"
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
          />
        </div>

        {/* CREATE LEAD */}
        <div className="card">
          <div className="card-title">
            <h3>Create New Lead</h3>
            <span>Add new CRM lead</span>
          </div>

          <LeadForm onSubmit={handleCreate} />
        </div>

        {/* TABLE */}
        <div className="card table-card">
          <div className="table-header">
            <h3>All Leads</h3>

            <span>{filteredLeads.length} records</span>
          </div>

          <LeadTable
            leads={filteredLeads}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

        {/* MODAL */}
        <LeadModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleUpdate}
          initialData={selectedLead}
        />
      </div>

      {/* STYLES */}
      <style>
        {`
          .page {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          /* HEADER */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .header h1 {
            margin: 0;
            font-size: 28px;
          }

          .header p {
            margin-top: 5px;
            color: #6b7280;
          }

          .header-right {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .header-right input {
            padding: 10px 12px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            width: 240px;
          }

          .header-right button {
            padding: 10px 14px;
            border: none;
            border-radius: 8px;
            background: #111827;
            color: white;
            cursor: pointer;
            font-size: 13px;
          }

          .header-right button:hover {
            opacity: 0.9;
          }

          /* FILTERS */
          .filters {
            display: flex;
            gap: 10px;
          }

          .filters input,
          .filters select {
            padding: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
          }

          /* CARD */
          .card {
            background: white;
            border-radius: 14px;
            padding: 18px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          }

          .card-title {
            margin-bottom: 16px;
          }

          .card-title h3 {
            margin: 0;
          }

          .card-title span {
            font-size: 13px;
            color: #6b7280;
          }

          /* TABLE */
          .table-card {
            padding: 0;
            overflow: hidden;
          }

          .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 18px;
            border-bottom: 1px solid #eee;
            background: #fafafa;
          }

          .table-header h3 {
            margin: 0;
          }

          .table-header span {
            font-size: 12px;
            background: #eef2ff;
            padding: 4px 10px;
            border-radius: 999px;
          }

          /* MOBILE */
          @media (max-width: 768px) {
            .header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }

            .header-right {
              width: 100%;
              flex-wrap: wrap;
            }

            .header-right input {
              width: 100%;
            }

            .filters {
              flex-direction: column;
            }
          }
        `}
      </style>
    </Layout>
  );
}
