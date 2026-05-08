export default function PipelineColumn({ title, leads }) {
  return (
    <div className="column">
      {/* HEADER */}
      <div className="column-header">
        <h3>{title}</h3>
        <span>{leads.length}</span>
      </div>

      {/* CARDS */}
      <div className="cards">
        {leads.map((lead) => (
          <div key={lead._id} className="card">
            <div className="card-title">{lead.name}</div>
            <div className="card-email">{lead.email}</div>

            <div className="card-footer">
              <span className="value">${lead.dealValue ?? 0}</span>
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>
        {`
          .column {
            background: #f3f4f6;
            padding: 14px;
            border-radius: 14px;
            width: 270px;
            min-height: 500px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
          }

          .column-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .column-header h3 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }

          .column-header span {
            font-size: 12px;
            background: #e5e7eb;
            padding: 4px 8px;
            border-radius: 999px;
          }

          .cards {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .card {
            background: white;
            padding: 12px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            cursor: grab;
            transition: 0.2s;
          }

          .card:hover {
            transform: translateY(-2px);
          }

          .card-title {
            font-weight: 600;
            margin-bottom: 4px;
          }

          .card-email {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 8px;
          }

          .card-footer {
            display: flex;
            justify-content: flex-end;
          }

          .value {
            font-size: 12px;
            font-weight: 600;
            color: #10b981;
          }
        `}
      </style>
    </div>
  );
}
