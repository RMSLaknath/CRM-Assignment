export default function Topbar() {
  return (
    <div className="topbar">
      <h3>CRM Dashboard</h3>
      <div className="user">👤 Admin</div>

      <style>
        {`
          .topbar {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
          }

          h3 {
            margin: 0;
          }

          .user {
            font-size: 14px;
            color: #374151;
          }
        `}
      </style>
    </div>
  );
}
