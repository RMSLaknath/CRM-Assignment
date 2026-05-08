import { useNavigate } from "react-router-dom";

export default function LeadTable({ leads, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Lead</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Deal</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads?.map((lead) => (
            <tr key={lead._id}>
              <td
                className="clickable"
                onClick={() => navigate(`/leads/${lead._id}`)}
              >
                {lead.name}
              </td>

              <td>{lead.company || "-"}</td>
              <td>{lead.email}</td>
              <td>{lead.phone || "-"}</td>
              <td>{lead.source || "-"}</td>
              <td>{lead.assignedTo || "-"}</td>

              <td>
                <span className={`status ${lead.status}`}>{lead.status}</span>
              </td>

              <td>${lead.dealValue ?? 0}</td>

              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td>{new Date(lead.updatedAt).toLocaleDateString()}</td>

              <td>
                <button onClick={() => onEdit(lead)}>Edit</button>
                <button onClick={() => onDelete(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        th {
          background: #f9fafb;
          padding: 12px;
          font-size: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }

        tr:hover {
          background: #f8fafc;
        }

        .clickable {
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
        }

        .status {
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 11px;
          color: white;
        }

        .New { background: #3b82f6; }
        .Contacted { background: #6366f1; }
        .Qualified { background: #10b981; }
        .Proposal { background: #f59e0b; }
        .Won { background: #22c55e; }
        .Lost { background: #ef4444; }

        button {
          margin-right: 5px;
          padding: 5px 8px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
