import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaColumns } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Leads", path: "/leads", icon: <FaUsers /> },
    { name: "Pipeline", path: "/pipeline", icon: <FaColumns /> },
  ];

  return (
    <div className="sidebar-container">
      <div className="logo">CRM</div>

      <div className="menu">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${active ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="footer">v1.0 CRM</div>

      <style>
        {`
          .sidebar-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px 12px;
          }

          .logo {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 30px;
          }

          .menu {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 8px;
            color: #cbd5e1;
            text-decoration: none;
            transition: 0.2s;
          }

          .menu-item:hover {
            background: rgba(255,255,255,0.06);
          }

          .active {
            background: rgba(96,165,250,0.15);
            color: #60A5FA;
            font-weight: 600;
          }

          .icon {
            font-size: 16px;
          }

          .footer {
            margin-top: auto;
            font-size: 12px;
            color: #64748b;
          }
        `}
      </style>
    </div>
  );
}
