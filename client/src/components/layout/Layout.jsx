import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* MAIN */}
      <div className="main">
        <header className="topbar">
          <Topbar />
        </header>

        <main className="content">{children}</main>
      </div>

      {/* STYLES */}
      <style>
        {`
          .layout {
            display: flex;
            min-height: 100vh;
            background: #f4f6f9;
          }

          .sidebar {
            width: 260px;
            background: #0b1220;
            color: white;
            position: fixed;
            height: 100vh;
            left: 0;
            top: 0;
          }

          .main {
            margin-left: 260px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .topbar {
            position: sticky;
            top: 0;
            z-index: 10;
            background: white;
            border-bottom: 1px solid #e5e7eb;
          }

          .content {
            padding: 24px;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
          }

          @media (max-width: 768px) {
            .sidebar {
              width: 70px;
            }

            .main {
              margin-left: 70px;
            }
          }
        `}
      </style>
    </div>
  );
}
