# Vue + Express Multi-Database App
**Student:** Tobias Arrieta

This project is a full-stack application utilizing a dual database setup. The **Frontend** uses Vue 3 + Pinia for state management, while the **Backend** uses Node.js/Express to handle data operations simultaneously with **MySQL** and **MongoDB**.

## Tech Stack
- **Frontend:** Vue 3, Vue Router, Pinia (State Management), Axios
- **Backend:** Node.js, Express, `mysql2`, `mongoose`
- **Databases:**
  - **MySQL (Local):** Stores numerical Data (Leaderboard ranks and scores).
  - **MongoDB (Atlas):** Stores document Data (Contact form submissions).

---

## Features

1. **Leaderboard Screen (`/leaderboard`)**
   - Fetches and displays top player scores via Pinia state management.
   - Connected to MySQL (`vue_express_app.leaderboard`).

2. **Contact Screen (`/contact`)**
   - Form that accepts User feedback/inquiries.
   - Posts data to MongoDB Atlas via Mongoose correctly handling field validation.

---

## Setup & Running

You need two separate terminal windows to run both the frontend and backend servers.

### 1. Database Configuration
1. Execute the MySQL schema file (`setup.sql` or create an identical schema via Workbench) to create the local relational DB.
2. In the `backend` folder, duplicate `.env.example` and rename it to `.env`.
3. Add your real local MySQL credentials and MongoDB Atlas connection string to the `.env` file.

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
```
*(Runs on `http://localhost:3000`)*

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## API Endpoints
- `GET /api/leaderboard`: Returns a sorted array of players from MySQL.
- `GET /api/leaderboard-summary`: Returns the top 3 players from MySQL.
- `POST /api/contact`: Saves a `{ name, email, message }` JSON payload into MongoDB.
