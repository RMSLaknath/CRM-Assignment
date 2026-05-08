import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import { getDashboardStats } from "../api/dashboardApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  // mock fallback data (replace later with backend analytics)
  const leadData = [
    { name: "New", value: stats.newLeads || 0 },
    { name: "Won", value: stats.wonLeads || 0 },
    { name: "Lost", value: stats.lostLeads || 0 },
  ];

  const revenueData = [
    { name: "Week 1", revenue: 1200 },
    { name: "Week 2", revenue: 2100 },
    { name: "Week 3", revenue: 1800 },
    { name: "Week 4", revenue: stats.wonDealValue || 2500 },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <div className="header">
        <h1>Dashboard</h1>
        <p>Overview of your CRM performance</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <StatCard title="Total Leads" value={stats.totalLeads || 0} />
        <StatCard title="New Leads" value={stats.newLeads || 0} />
        <StatCard title="Won Leads" value={stats.wonLeads || 0} />
        <StatCard title="Lost Leads" value={stats.lostLeads || 0} />
      </div>

      {/* CHART SECTION */}
      <div className="chart-grid">
        {/* LEADS BAR CHART */}
        <div className="card">
          <h3>Leads Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* REVENUE LINE CHART */}
        <div className="card">
          <h3>Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REVENUE CARDS */}
      <div className="grid-2">
        <StatCard
          title="Total Deal Value"
          value={`$${stats.totalDealValue || 0}`}
        />
        <StatCard title="Won Revenue" value={`$${stats.wonDealValue || 0}`} />
      </div>

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
          }

          .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 20px;
          }

          .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 20px;
          }

          .chart-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 20px;
          }

          .card {
            background: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .card h3 {
            margin-bottom: 10px;
          }

          @media (max-width: 1024px) {
            .grid-4 {
              grid-template-columns: repeat(2, 1fr);
            }

            .chart-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 600px) {
            .grid-4,
            .grid-2 {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </Layout>
  );
}
