# Installation guide

Step-by-step setup for **Outdoor Adventure Shop** (React + Express + MongoDB). For a shorter overview, see [README.md](README.md).

---

## Prerequisites

- **Node.js** version **18** or newer (20 LTS recommended). [Download Node.js](https://nodejs.org/)
- **npm** (bundled with Node)
- A **MongoDB** database — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or a local MongoDB instance with a standard connection string

Optional:

- [Git](https://git-scm.com/) to clone the repository  
- [Railway CLI](https://docs.railway.app/develop/cli) if you deploy from the terminal  

---

## 1. Clone the repository

```bash
git clone https://github.com/haimgalata/fullstack-outdoor-store.git
cd fullstack-outdoor-store
```

---

## 2. Install dependencies

Install **both** the client and the server:

```bash
cd client
npm install
cd ../server
npm install
cd ..
```

---

## 3. MongoDB Atlas (recommended)

### Create a cluster

1. Sign in at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Create a **project** if needed, then **Build a Database** → choose the **free** shared tier and a region close to you.
3. Wait until the cluster is **ready**.

### Create a database user

1. Open **Database Access** → **Add New Database User**.
2. Choose **Password** authentication, save the **username** and **password** (you will need them in the URI).

### Network access (IP allowlist)

1. Open **Network Access** → **Add IP Address**.
2. For **local development**, add **your current IP** or temporarily **`0.0.0.0/0`** (allow anywhere — convenient but less strict).
3. For **Railway** (or any cloud VM with a changing IP), **`0.0.0.0/0`** is commonly used so Atlas accepts connections from the host. Tighten this when you move to production.

### Connection string

1. In **Database** → **Connect** → **Drivers**, copy the connection string.
2. Replace `<password>` with your user’s password (URL-encode special characters if needed).
3. Replace the default database name in the path if you like, e.g. `...mongodb.net/outdoor_shop?retryWrites=true&w=majority`.

Example shape:

```text
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/outdoor_shop?retryWrites=true&w=majority
```

---

## 4. Environment configuration

1. In the **`server`** folder, create a **`.env`** file (it is gitignored).

   **Linux / macOS**

   ```bash
   cp server/.env.example server/.env
   ```

   **Windows (PowerShell)**

   ```powershell
   Copy-Item server\.env.example server\.env
   ```

2. Edit **`server/.env`** and set **`MONGO_URI`** to your connection string (or use **`MONGODB_URI`** instead — the server accepts either).

3. Optionally set **`PORT=5000`** for local API port (default is 5000 if omitted).

There are **no** JWT or third-party API keys in this project.

---

## 5. Local development

### Option A — Two processes (hot reload for React)

**Terminal 1 — backend**

```bash
cd server
npm start
```

You should see logs such as `Server running on port 5000` and `MongoDB connected`.

**Terminal 2 — frontend**

```bash
cd client
npm start
```

The browser should open **http://localhost:3000**.  
The Create React App **proxy** forwards **`/api/*`** to **http://localhost:5000**, so you do not need to change the frontend when developing.

### Option B — One process (API + built static UI)

Useful to verify production behavior locally:

```bash
# From repo root, after server/.env is configured
npm run build
npm start
```

Open **http://localhost:5000**. Express serves **`client/build`** and the same **`/api/*`** routes.

---

## 6. First run and seeding

- If the **`products`** collection is **empty**, the server **inserts** the built-in seed products once (see [`server/server.js`](server/server.js)).
- If you already have documents in that collection, seeding is skipped.

---

## 7. Troubleshooting

| Symptom | What to check |
|--------|----------------|
| **`Missing MongoDB URI`** then exit | `server/.env` exists and contains **`MONGO_URI`** or **`MONGODB_URI`**. |
| **`MongoDB connection error`** / timeout | Atlas **Network Access** allows your IP or `0.0.0.0/0`; user/password correct; cluster is running. |
| **Blank products or fetch errors** in dev | Server is running on **5000**; client uses **`/api/products`**. Check the browser **Network** tab. |
| **CORS errors** (rare with this repo) | Usually only if you host the **static build** on a **different origin** than the API without a proxy. Prefer the **single Railway service** in the README, or configure CORS and a **`REACT_APP_*`** API base URL for split hosting. |
| **Broken product images** | Add image files under **`client/public/`** matching names in the seed (e.g. `HikingBackpack.jpg`) or change **`imageUrl`** values in [`server/server.js`](server/server.js). |
| **`EADDRINUSE`** on port 5000 | Another app uses the port — change **`PORT`** in `server/.env` and set the CRA **`proxy`** in [`client/package.json`](client/package.json) to the same host/port. |

---

## 8. Railway deployment

1. Push this repository to GitHub (or connect your Git provider).
2. In [Railway](https://railway.app), **New Project** → deploy from the repo.
3. Ensure the service **root directory** is the **repository root** (where the root [`package.json`](package.json) lives).
4. Set **build** to: `npm run build`  
5. Set **start** to: `npm start`  
6. Add variable **`MONGO_URI`** (your Atlas SRV string) in the Railway **Variables** UI.
7. Deploy and open the generated **public URL**.

Railway injects **`PORT`** automatically; do not hardcode it in Atlas.

---

## 9. Useful commands reference

| Location | Command | Purpose |
|----------|---------|---------|
| `client/` | `npm start` | React dev server (port 3000) |
| `client/` | `npm run build` | Production build → `client/build/` |
| `server/` | `npm start` | Express API (and static UI if `client/build` exists) |
| repo root | `npm run build` | Install + build client + install server (for Railway / full build) |
| repo root | `npm start` | Start server package (same as `cd server && npm start` with correct cwd) |

---

## Need more detail?

See [README.md](README.md) for architecture, environment variable tables, and badges.
