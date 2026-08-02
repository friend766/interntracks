# InternTrack - Internship & Job Application Tracker

> **Track Your Applications. Land Your Dream Internship.**
> Prepared for **Ammad**

InternTrack is a modern, high-performance web application designed for students and job seekers to track and manage their internship and job applications. Save applications, monitor pipeline progress, and organize company details, roles, statuses, notes, stipends, and deadlines — all in one place.

---

## 📁 Directory Structure (Matching Specification)

```text
interntrack/
├── backend/                  # Node.js + Express REST API Backend
│   ├── config/               # Database connection (MongoDB Atlas)
│   ├── middleware/           # Role-based JWT Auth middleware
│   ├── models/               # Mongoose User & Application schemas
│   ├── routes/               # Express Auth, Applications, Users, Stats routes
│   ├── .env                  # Environment configuration
│   ├── package.json
│   └── server.js
├── frontend/                 # React + Vite + Tailwind CSS Frontend Client
│   ├── src/
│   │   ├── components/       # Hero, Navbar, Kanban, Analytics, Admin, Modals
│   │   ├── context/          # Auth, Application, Theme Contexts
│   │   ├── mockData.js       # Pre-seeded dataset with Admin user
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── package.json              # Monorepo / root launcher package.json
├── preview.html              # Standalone interactive browser preview document
└── README.md                 # Project documentation
```

---

## 🔐 Seeding & User Roles

| Role | Username | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `Ammad123` | `friendly` | Full access — manage all users, view/manage all applications, tasks, and system metrics |
| **User** | Self-Registered | Self-defined | Access and view own applications, tasks, kanban board, and personal dashboard |

---

## 🎨 Color Palette Tokens

- **Primary Blue**: `#4F6DF5`
- **Primary Dark**: `#3151D4`
- **Secondary Lavender**: `#8B7CF6`
- **Main Background**: `#F8FAFF`
- **Card Background**: `#FFFFFF`
- **Soft Blue Background**: `#EEF2FF`
- **Light Lavender**: `#F3F1FF`
- **Primary Text**: `#111827`
- **Secondary Text**: `#475569`
- **Muted Text**: `#64748B`
- **Border**: `#E2E8F0`
- **Hover Blue**: `#3D5CE8`
- **Focus Ring**: `#A5B4FC`

---

## 🚀 Quick Start Instructions

### Run Concurrent Dev Server
```bash
npm install
npm run dev
```
Both backend API (`http://localhost:5000`) and frontend client (`http://localhost:5173`) will launch concurrently.
