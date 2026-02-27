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

### 1. .env Configuration

1. Create a `.env` file with the following content:
```
PORT=3000

# MySQL Configuration
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root
DB_NAME=vue_express_app

# MongoDB Configuration
MONGO_URI=mongodb+srv://Spencer:root@cluster0.yriuuvb.mongodb.net/?appName=Cluster0

```

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
