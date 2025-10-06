🏢 Company Directory
📘 Overview

A full-stack MERN application to view and filter company information from MongoDB.
Users can search by company name, filter by industry, size, rating, and location, sort results, and view paginated data.

This project includes:

Backend (Express + MongoDB) — provides a filtered companies API.

Frontend (React + Redux + MUI) — displays data with responsive UI and dark/light theme.

Seed script — to insert initial company data into MongoDB.

⚙️ Tech Stack

Frontend: React, Redux Toolkit, Material UI, Axios, Lodash (Debounce), Framer Motion

Backend: Node.js, Express.js, MongoDB, Mongoose, CORS, Dotenv

Database: MongoDB (Atlas or Local)

🌟 Features

✅ Search & Filter – By name, industry, company size, rating, and location
✅ Sort – Sort companies alphabetically, by founded year, or rating
✅ Pagination – Smooth, responsive pagination controls
✅ Debounced Filtering – Prevents unnecessary API calls
✅ Modern UI – Clean Material UI design with Framer Motion hover effects
✅ Dark/Light Mode – Auto theme support for both modes
✅ MongoDB Integration – Data fetched dynamically from database

🚀 Project Setup Guide
1️⃣ Clone the Project
git clone https://github.com/<your-username>/company-directory.git
cd company-directory

2️⃣ Backend Setup
cd backend
npm install

Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/company-directory

Seed MongoDB Data

Before running the backend, insert initial data:

node seed.js


You should see:

✅ Data Seeded Successfully

Run Backend Server
npm start


Backend will run at 👉 http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install

Run Frontend
npm run dev


Frontend will run at 👉 http://localhost:5173

