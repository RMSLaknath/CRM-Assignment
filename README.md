📌 CRM System (Full Stack Project)

A full-stack CRM (Customer Relationship Management) system built to manage leads, track sales pipeline, and analyze business performance using a modern dashboard.

🚀 Project Overview

This CRM system allows users to:

Manage leads (Create, Read, Update, Delete)
Track lead status through a sales pipeline
Add notes to leads
View analytics dashboard with charts
Search and filter leads
Authenticate users securely using JWT
🛠️ Tech Stack
Frontend
React.js
React Router
Recharts (Charts)
React Hot Toast
Axios
CSS (Inline + Custom Styling)
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcrypt
✨ Features
🔐 Authentication
User login with JWT
Protected routes
📊 Dashboard
Total leads
New / Won / Lost leads
Total deal value
Won revenue
Bar chart (lead status)
Line chart (revenue trend)
👥 Lead Management
Create leads
View leads
Edit leads
Delete leads
Update lead status
📝 Lead Notes
Add notes per lead
Track communication history
Timestamped notes
🔄 Pipeline (Drag & Drop)
New → Contacted → Qualified → Proposal Sent → Won → Lost
Drag and drop status update
🔍 Search & Filtering
Search by name
Filter by status
Filter by source
Filter by assigned salesperson
⚙️ How to Run Locally

1. Clone Repository
   git clone https://github.com/your-username/crm-project.git
2. Backend Setup
   cd server
   npm install
   npm run dev
3. Frontend Setup
   cd client
   npm install
   npm run dev
   🌍 Environment Variables

Create a .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🔑 Test Login Credentials
Email: admin@example.com
Password: password123
🗄️ Database Setup
MongoDB is used as database
Mongoose handles schema modeling
Lead data is stored in leads collection
📦 API Endpoints
Auth
POST /api/auth/login
Leads
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
PATCH /api/leads/status/:id
Notes
POST /api/notes/:leadId
GET /api/notes/:leadId
⚠️ Known Limitations
No role-based access control (admin/user separation not fully implemented)
No email notifications
Basic UI (can be improved further)
No pagination for large datasets
💡 Future Improvements
Role-based authentication (Admin / Salesperson)
Email notifications for leads
Advanced analytics dashboard
Mobile responsive UI improvements
Export reports (CSV/PDF)
🧠 Reflection

This project helped me understand full-stack development including:

REST API design
Authentication using JWT
CRUD operations with MongoDB
React state management
Drag and drop UI interactions
Dashboard data visualization

It improved my understanding of real-world CRM systems used in businesses.

👨‍💻 Author

Developed by: Shashika Laknath
