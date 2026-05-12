# Outdoor Adventure Shop

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Full-stack demo store for outdoor equipment: a **React** storefront talks to a **Node.js + Express** REST API backed by **MongoDB**. Suitable for local development, **MongoDB Atlas**, and **Railway** (single-service deploy).

---

## Features

- Product catalog loaded from the database (`GET /api/products`)
- Client-side search (name and description)
- Shopping cart with quantities, persisted in **localStorage**
- Checkout form (customer details, shipping method, totals) and order submission (`POST /api/orders`)
- Automatic **seed catalog** when the products collection is empty (first connection)

---

## Tech stack

| Area | Stack |
|------|--------|
| **Frontend** | React 18, Create React App, React Router 6, Bootstrap 5 |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB (local or **MongoDB Atlas**) |
| **Authentication** | None — guest checkout only; cart lives in the browser |
| **Deployment** | **Railway** (see below): root `build` + `start`, Express serves API and production static build |

---

## Architecture

```text
client/                 # React app (CRA)
  src/
    App.jsx             # Products fetch, cart state, routes
    pages/              # Home, Checkout
    components/         # Navbar, Banner, Cart
  public/               # Static assets (add product images here — see note below)

server/                 # Express API
  server.js             # App entry: MongoDB connect, seed, routes, optional SPA static
  routes/               # products.js, orders.js
  models/               # Product, Order (Mongoose)
```

**Flow:** The browser calls **`/api/products`** and **`/api/orders`** (same origin in production; in local dev the CRA dev server **proxies** `/api` to port 5000). Orders and catalog are stored in MongoDB. There is no separate auth service.

---

## Screenshots / preview

Screenshots are not included in the repository. After you run the app locally or on Railway, capture:

- Home page with the product grid  
- Cart drawer  
- Checkout page and success state  

Place images in a `docs/` folder or your wiki and link them here if you like.

**Product images:** Seed data references files such as `/HikingBackpack.jpg` under the React **`public/`** folder. Add matching image files to [`client/public/`](client/public/) (or change URLs in the seed data in [`server/server.js`](server/server.js)) so images load correctly.

---

## Installation

### Clone repository

```bash
git clone https://github.com/haimgalata/fullstack-outdoor-store.git
cd fullstack-outdoor-store
```

### Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### Configure environment variables

1. Copy the example env file:

   ```bash
   cp server/.env.example server/.env
   ```

2. Edit **`server/.env`** and set at least **`MONGO_URI`** (see table below).

> **Railway:** Add the same variables in the service **Variables** tab (no need to commit `.env`).

### MongoDB Atlas setup

1. In [Atlas](https://www.mongodb.com/atlas), create a **cluster** (free tier is fine).
2. **Database Access:** create a database user (username + password).  
3. **Network Access:** add your IP for local development, or **`0.0.0.0/0`** for cloud hosts (e.g. Railway). Restrict IPs in production when possible.
4. **Connect** your app: choose **Drivers**, copy the **connection string**, insert the user password and a database name in the path (e.g. `...mongodb.net/outdoor_shop?...`).
5. Paste the string into **`MONGO_URI`** in `server/.env`.

### Run locally (recommended: two terminals)

**Terminal 1 — API (from repo root)**

```bash
cd server
npm start
```

Runs on **http://localhost:5000** by default.

**Terminal 2 — React dev server**

```bash
cd client
npm start
```

Opens **http://localhost:3000**; API requests to **`/api/*`** are proxied to port **5000** ([`client/package.json`](client/package.json) `proxy`).

**Optional — single port (production-style locally)**

From the repository root, after configuring `server/.env`:

```bash
npm run build
npm start
```

Then open **http://localhost:5000** (Express serves the built UI and the API).

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| **`MONGO_URI`** | Yes (unless `MONGODB_URI` is set) | MongoDB connection string (e.g. Atlas `mongodb+srv://...`). |
| **`MONGODB_URI`** | No | Alternative name for the same string; used if `MONGO_URI` is unset. |
| **`PORT`** | No | HTTP port for Express (default **5000** locally). **Railway** sets this automatically. |

No JWT secrets or third-party API keys are used by this codebase.

---

## Railway deployment

Deploy as **one** Railway service from the **repository root** (where [`package.json`](package.json) lives).

1. **New project** → **Deploy from GitHub** (or CLI) and select this repo.
2. **Build command:** `npm run build`  
   - Installs client + server dependencies, runs `react-scripts build`, produces `client/build`.
3. **Start command:** `npm start`  
   - Runs `npm start --prefix server` → `node server.js` with `cwd` **server/** so **`server/.env`** is picked up by dotenv if you upload vars to the filesystem (on Railway, prefer **Variables** instead of committing `.env`).
4. **Variables:** set **`MONGO_URI`** to your Atlas SRV string (same as local). Do not commit secrets.
5. **Generate domain** (or attach a custom domain) and open the URL — UI and **`/api/*`** share the same origin.

If the build fails, check Railway logs: Node **≥ 18** and a valid **`MONGO_URI`** are required.

---

## Future improvements

- User accounts and authentication  
- Server-side cart or session  
- Payment integration (e.g. Stripe)  
- Order confirmation email  
- Automated tests and CI  
- Rate limiting and input hardening on public APIs  
- CDN or object storage for product images  

---

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE).

---

## Author

**Haim Galata** — originally developed for a Web Development Environments course; repository maintained for learning and deployment demos.
