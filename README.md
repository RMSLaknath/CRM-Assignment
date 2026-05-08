# 📌 CRM System (Full Stack MERN Project)

A full-stack CRM (Customer Relationship Management) system built using the MERN stack.  
It helps manage leads, track sales pipeline, and visualize business performance with a dashboard.

---

# 🚀 Project Overview

This CRM system is designed to manage sales leads efficiently.

### Main capabilities:

- Lead management (CRUD)
- Sales pipeline tracking (drag & drop)
- Lead notes system
- Dashboard analytics
- Search & filtering system
- JWT authentication

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Recharts (Charts)
- Axios
- React Hot Toast
- Inline CSS styling

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

# ✨ Features

## 🔐 Authentication

- User login with JWT
- Protected routes for dashboard and CRM data

---

## 📊 Dashboard

Displays CRM analytics:

- Total Leads
- New Leads
- Won Leads
- Lost Leads
- Total Deal Value
- Won Revenue

### Charts:

- Bar Chart → Lead status distribution
- Line Chart → Revenue trends

---

## 👥 Lead Management

Each lead includes:

- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source
- Assigned Salesperson
- Status (New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Estimated Deal Value
- Created Date
- Last Updated Date

### Features:

- Create lead
- View leads
- Edit lead
- Delete lead
- View lead details

---

## 🔄 Pipeline (Drag & Drop)

Sales pipeline stages:

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

### Features:

- Drag & drop leads between stages
- Automatic status update in backend

---

## 📝 Lead Notes

- Add notes to leads
- Each note includes:
  - Content
  - Created By
  - Created Date
- Helps track communication history

---

## 🔍 Search & Filtering

Supports:

- Search by lead name
- Filter by status
- Filter by source
- Filter by assigned salesperson

---

# ⚙️ How to Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/RMSLaknath/CRM-Assignment
```

Backend Setup

cd server
npm install
npm run dev

Frontend Setup

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
Mongoose handles schema
Lead data stored in leads collection
Notes stored separately per lead

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

No role-based access control (Admin/User)
No email notifications
Basic UI (can be improved further)
No pagination for large datasets

💡 Future Improvements

Role-based authentication system
Email notifications for leads
Advanced analytics dashboard
Mobile responsive UI improvements
Export reports (CSV/PDF)
Activity logs per user

🧠 Learning Outcome / Reflection

This project helped me understand:

Full-stack MERN development
REST API design
Authentication using JWT
CRUD operations with MongoDB
State management in React
Data visualization using charts
Drag and drop functionality

👨‍💻 Author

Developed by Shashika Rathnayake
