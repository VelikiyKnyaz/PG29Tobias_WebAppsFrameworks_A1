# Vue + Express: Leaderboard & Contact Screens
## Student: Tobias Arrieta

This exercise extends an existing Vue (frontend) + Express (backend) app by adding two new screens:
- **Leaderboard**: displays backend data in a basic table + small supporting widgets
- **Contact**: submits a feedback/inquiry form to the backend

## Requirements Covered
- Fetch backend data with barebones API calls
- Add routes for new screens (Vue Router)
- Integrate new links into the existing navigation bar
- Smooth navigation via router configuration

---

## Install & Run

### 1) Backend (Express)
```bash
# from the backend folder
npm install
npm run dev
```
Backend runs on:
- http://localhost:3000

```bash
# from the frontend folder (Vue/Vite project)
npm install
npm run dev
```
Frontend runs on:
- http://localhost:5173
---

## New/Updated Routes
- `/leaderboard` → Leaderboard screen
- `/contact` → Contact screen

Navigation bar was updated to include links to:
- Home, About, Leaderboard, Contact

---

## Backend APIs Added
- `GET /api/leaderboard`, returns a simple array of leaderboard rows (mock data).
- `POST /api/contact`, accepts JSON `{ name, email, message }` and returns `{ ok: true }` if valid.

---

## Code Developed
### Backend
- Updated `server.ts`:
### Frontend
- Updated router (`src/router/index.ts`):
  - Added routes for `/leaderboard` and `/contact`
- Updated navigation (`App.vue`):
  - Added links for Leaderboard + Contact
### New Views
- `src/views/LeaderboardPage.vue`
- `src/views/ContactPage.vue`
### New Components
- `src/components/LeaderboardTable.vue` (fetch + table)
- `src/components/LeaderboardStats.vue` (basic derived stats)
- `src/components/LeaderboardSidebar.vue` (selected row detail)
- `src/components/ContactForm.vue` (form + POST submit)

