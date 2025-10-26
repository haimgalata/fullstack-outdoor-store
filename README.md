# Fullstack Outdoor Store (React + Node.js)

This project is a full-stack web application developed as part of the **Web Development Environments** course in my **Computer Science degree (Year 2)**.  
It simulates an online outdoor equipment store built using **React** on the client side and **Node.js + Express** on the server side.

---

📋 **Description**

The website allows users to browse, add, and purchase outdoor products.  
It demonstrates a complete full-stack architecture including a REST API, front-end routing, and database interaction between client and server.

🔸 **Client (Front-End)**  
Built with React and styled using CSS.  
Includes pages and components such as:
- 🏕️ Home page displaying all products  
- 🛒 Shopping cart  
- ✅ Checkout page  

🔸 **Server (Back-End)**  
Developed using Node.js and Express.  
Handles RESTful routes for products and orders, connects to a MongoDB database,  
and serves the client-side build in production.

---

🧠 **Concepts Demonstrated**
- React Components and Hooks  
- REST API with Node.js and Express  
- MVC Architecture  
- Data persistence with MongoDB  
- Environment configuration using `.env`  
- Client-Server communication  

---

🚀 **How to Run**

1. **Clone the repository**
git clone https://github.com/haimgalata/fullstack-outdoor-store.git
cd fullstack-outdoor-store

2. **Install dependencies**
cd client && npm install
cd ../server && npm install

3. **Run the app**
# Start the server
cd server
npm start

# In a new terminal, start the client
cd ../client
npm start

The application will run locally on http://localhost:3000

🛠 Notes

Make sure you have Node.js and MongoDB installed.

Use a .env file in the server folder to configure your MongoDB connection string.#

---

Developed by Haim Galata
as part of the Web Development Environments course in the Computer Science degree (Year 2).
