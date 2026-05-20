# Frontend — React (Vite)

Overview
- A small React app (Vite) that manages contacts and talks to the backend API.

Features
- List contacts, create new contact, update existing contact, delete contact.
- Simple modal form for create/update (`ContactForm.jsx`) and a table list (`ContactList.jsx`).

Prerequisites
- Node.js 18+ and npm or yarn.

Install

1. Change into the frontend folder:

	cd frontend

2. Install dependencies:

	npm install

Run (development)

	npm run dev

This starts Vite's dev server (usually at `http://localhost:5173`). The frontend expects the backend API to be available at `http://127.0.0.1:5000` by default.

Available scripts (package.json)
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

API (backend) endpoints used
- GET `/contacts` — load all contacts
- POST `/create_contact` — create a new contact (JSON body)
- PATCH `/update_contact/<id>` — update a contact
- DELETE `/delete_contact/<id>` — delete a contact

Notes & tips
- If your backend runs on a different host/port, update the fetch URLs in `src` (or add a small `config.js` and reference it).
- To persist the backend database between runs, the SQLite file `mydatabase.db` is created in the backend folder.

Want help?
- I can add environment-based API URL handling, a Docker Compose setup, or convert the frontend to use a small state manager if you want — tell me which and I'll implement it.

