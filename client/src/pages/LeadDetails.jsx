import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getLeadById } from "../api/leadApi";

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    const res = await getLeadById(id);
    setLead(res.data);
  };

  if (!lead) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="container">
        <h1>{lead.name}</h1>

        <div className="grid">
          <div>
            <b>Company:</b> {lead.company}
          </div>
          <div>
            <b>Email:</b> {lead.email}
          </div>
          <div>
            <b>Phone:</b> {lead.phone}
          </div>
          <div>
            <b>Source:</b> {lead.source}
          </div>
          <div>
            <b>Assigned:</b> {lead.assignedTo}
          </div>
          <div>
            <b>Status:</b> {lead.status}
          </div>
          <div>
            <b>Deal Value:</b> ${lead.dealValue}
          </div>
          <div>
            <b>Created:</b> {new Date(lead.createdAt).toLocaleString()}
          </div>
          <div>
            <b>Updated:</b> {new Date(lead.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>

      <style>{`
        .container {
          background: white;
          padding: 20px;
          border-radius: 12px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        h1 {
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
}
