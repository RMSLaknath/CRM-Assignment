import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { getLeadById } from "../api/leadApi";
import { getNotes, createNote } from "../api/noteApi";
import { getActivities } from "../api/activityApi";

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchLead();
    fetchNotes();
    fetchActivities();
  }, [id]);

  /* FETCH LEAD */
  const fetchLead = async () => {
    const res = await getLeadById(id);
    setLead(res.data);
  };

  /* FETCH NOTES */
  const fetchNotes = async () => {
    const res = await getNotes(id);
    setNotes(res.data);
  };

  /* FETCH ACTIVITIES */
  const fetchActivities = async () => {
    const res = await getActivities(id);
    setActivities(res.data);
  };

  /* ADD NOTE */
  const handleAddNote = async () => {
    if (!content.trim()) return;

    await createNote(id, { content });

    setContent("");

    fetchNotes();
  };

  if (!lead) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="page">
        {/* HEADER */}
        <div className="header-card">
          <div>
            <h1>{lead.name}</h1>
            <p>{lead.company || "No company"}</p>
          </div>

          <span className={`status ${lead.status}`}>{lead.status}</span>
        </div>

        {/* DETAILS */}
        <div className="card">
          <h3>Lead Information</h3>

          <div className="grid">
            <div>
              <b>Email</b>
              <p>{lead.email}</p>
            </div>

            <div>
              <b>Phone</b>
              <p>{lead.phone || "-"}</p>
            </div>

            <div>
              <b>Lead Source</b>
              <p>{lead.source || "-"}</p>
            </div>

            <div>
              <b>Assigned Salesperson</b>
              <p>{lead.assignedTo || "-"}</p>
            </div>

            <div>
              <b>Estimated Deal Value</b>
              <p>${lead.dealValue ?? 0}</p>
            </div>

            <div>
              <b>Created Date</b>
              <p>{new Date(lead.createdAt).toLocaleString()}</p>
            </div>

            <div>
              <b>Last Updated</b>
              <p>{new Date(lead.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="card">
          <h3>Lead Notes</h3>

          <div className="note-input">
            <textarea
              placeholder="Write a note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={handleAddNote}>Add Note</button>
          </div>

          <div className="notes-list">
            {notes.length === 0 ? (
              <p className="empty">No notes yet</p>
            ) : (
              notes.map((note) => (
                <div className="note-card" key={note._id}>
                  <p>{note.content}</p>

                  <small>
                    {note.createdBy} •{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ACTIVITIES */}
        <div className="card">
          <h3>Activity Timeline</h3>

          <div className="timeline">
            {activities.length === 0 ? (
              <p className="empty">No activities yet</p>
            ) : (
              activities.map((act) => (
                <div className="timeline-item" key={act._id}>
                  <div className="dot"></div>

                  <div className="timeline-content">
                    <strong>{act.type}</strong>

                    <p>{act.message}</p>

                    <small>{new Date(act.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .page {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .card {
            background: white;
            padding: 20px;
            border-radius: 14px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          }

          .header-card {
            background: linear-gradient(
              135deg,
              #2563eb,
              #1e40af
            );

            color: white;

            padding: 24px;

            border-radius: 16px;

            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .header-card h1 {
            margin: 0;
          }

          .header-card p {
            margin-top: 5px;
            opacity: 0.9;
          }

          .status {
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.2);
            font-size: 13px;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
            gap: 20px;
            margin-top: 20px;
          }

          .grid b {
            display: block;
            margin-bottom: 5px;
            color: #374151;
          }

          .grid p {
            margin: 0;
            color: #111827;
          }

          /* NOTES */
          .note-input {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          textarea {
            min-height: 100px;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #d1d5db;
            resize: vertical;
          }

          button {
            align-self: flex-start;
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            background: #2563eb;
            color: white;
            cursor: pointer;
          }

          .notes-list {
            margin-top: 20px;
          }

          .note-card {
            background: #f9fafb;
            padding: 14px;
            border-radius: 10px;
            margin-bottom: 12px;
          }

          .note-card p {
            margin: 0 0 8px 0;
          }

          /* TIMELINE */
          .timeline {
            margin-top: 20px;
          }

          .timeline-item {
            display: flex;
            gap: 12px;
            margin-bottom: 18px;
          }

          .dot {
            width: 12px;
            height: 12px;
            background: #2563eb;
            border-radius: 50%;
            margin-top: 5px;
          }

          .timeline-content {
            background: #f9fafb;
            padding: 12px;
            border-radius: 10px;
            flex: 1;
          }

          .timeline-content p {
            margin: 6px 0;
          }

          .empty {
            color: #6b7280;
          }
        `}
      </style>
    </Layout>
  );
}
