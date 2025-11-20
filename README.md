# MERN Training Boilerplate

Full-stack MERN starter tailored for classroom training. It demonstrates modern Express patterns, MongoDB integration, and a React front-end with routing, context-based auth, and API consumption.

## Stack

- **Server**: Express 5, MongoDB via Mongoose, Zod validation, JWT auth, Nodemon.
- **Client**: React 19 + Vite, React Router, Axios, Context API.
- **Tooling**: ESLint + Prettier configured for both workspaces.

## Getting Started

```bash
# Terminal 1 – backend
cd /Users/adminn/Documents/teach/MERN_CLASS/server
cp .env.example .env    # create and adjust if needed
npm install
npm run dev

# Terminal 2 – frontend
cd /Users/adminn/Documents/teach/MERN_CLASS/client
npm install
npm run dev
```

Navigate to `http://localhost:5173` for the client and ensure the API runs on `http://localhost:5000`.

## Training Scenarios

- User lifecycle: register → login → logout → profile update → password change → delete.
- Auth guards with `ProtectedRoute` demonstrate conditional routing.
- Concept deck demonstrates fetching training content from the backend and filtering client-side.
- Forgot-password flow returns mock reset tokens for classroom demos.

## Scripts

| Location | Command | Description |
| --- | --- | --- |
| `server` | `npm run dev` | Nodemon dev server |
| `server` | `npm run seed` | Seeds sample users |
| `server` | `npm run lint` | ESLint check |
| `client` | `npm run dev` | Vite dev server |
| `client` | `npm run build` | Production build |
| `client` | `npm run lint` | Frontend lint |

## Environment

Copy `.env.example` inside each workspace (if not already present) and adjust:

```
# server/.env
MONGO_URI=mongodb://127.0.0.1:27017/mern_training
PORT=5000
JWT_SECRET=super-secret

# client/.env
VITE_API_URL=http://localhost:5000/api
```

> NOTE: On this machine `.env.example` files may be hidden by default; create them manually if needed.

You're ready to extend the boilerplate with new models, routes, or UI lessons. Have fun teaching! 🎓
