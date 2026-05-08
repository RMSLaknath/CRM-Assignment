import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Layout from "../components/layout/Layout";
import { getLeads, updateLeadStatus } from "../api/leadApi";

export default function Pipeline() {
  const [leads, setLeads] = useState([]);

  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const leadId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await updateLeadStatus(leadId, newStatus);

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: newStatus } : lead,
        ),
      );

      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
      fetchLeads();
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <div className="header">
        <h1>Pipeline</h1>
        <p>Drag & drop leads through your sales process</p>
      </div>

      {/* BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="column-title">
                    <h3>{status}</h3>
                    <span>
                      {leads.filter((l) => l.status === status).length}
                    </span>
                  </div>

                  {leads
                    .filter((lead) => lead.status === status)
                    .map((lead, index) => (
                      <Draggable
                        key={lead._id}
                        draggableId={lead._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <div className="name">{lead.name}</div>
                            <div className="email">{lead.email}</div>
                            <div className="value">${lead.dealValue ?? 0}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* STYLES */}
      <style>
        {`
          .header {
            margin-bottom: 20px;
          }

          .header h1 {
            margin: 0;
          }

          .header p {
            color: #6b7280;
            margin-top: 4px;
          }

          .board {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .column {
            background: #f3f4f6;
            padding: 14px;
            border-radius: 14px;
            width: 270px;
            min-height: 500px;
            flex-shrink: 0;
          }

          .column-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .column-title h3 {
            margin: 0;
            font-size: 14px;
          }

          .column-title span {
            font-size: 12px;
            background: #e5e7eb;
            padding: 4px 8px;
            border-radius: 999px;
          }

          .card {
            background: white;
            padding: 12px;
            border-radius: 10px;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            cursor: grab;
            transition: 0.2s;
          }

          .card:hover {
            transform: translateY(-2px);
          }

          .name {
            font-weight: 600;
          }

          .email {
            font-size: 12px;
            color: #6b7280;
          }

          .value {
            margin-top: 6px;
            font-size: 12px;
            font-weight: 600;
            color: #10b981;
          }
        `}
      </style>
    </Layout>
  );
}
