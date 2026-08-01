# 🌐 Spotlight - Full-Stack Social & Community Platform

![React](https://img.shields.io/badge/Frontend-React_19-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Build-Vite_8-646CFF?style=flat-square&logo=vite)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square&logo=nodedotjs)
![ExpressJS](https://img.shields.io/badge/Framework-Express_5-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=flat-square&logo=cloudinary)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)

**Spotlight** is a feature-rich, modern full-stack web application designed for interactive community sharing and social networking. Built with a **React (Vite)** frontend and a **Node.js (Express + MongoDB)** backend, Spotlight allows users to register accounts, authenticate securely, share posts with image uploads, interact with community posts, and manage content seamlessly.

---

## ✨ Features

- 🔑 **User Authentication & Authorization**: Secure User Registration and Login powered by JWT (JSON Web Tokens) and bcrypt password hashing.
- 📸 **Media Uploads**: Cloud-based image upload and management powered by Cloudinary and Multer.
- 📝 **Post Management (CRUD)**:
  - Create new posts with rich captions and image attachments.
  - View detailed post pages with dynamic content rendering.
  - Edit existing posts with real-time updates.
  - Delete posts securely.
- 💬 **Interactive Comments System**: Engage with posts by writing and viewing comments.
- 🎨 **Modern & Responsive UI**: Clean interface built with React 19, custom CSS design system, and toast notifications.
- ⚡ **Lightning Fast Performance**: Frontend bundled using Vite 8 for instant HMR and optimized production builds.

---

## 📂 Project Architecture & Directory Structure

CircleUp follows a decoupled **Monorepo Structure** with clean separation between client and server codebases:

```text
CircleUp/
├── 📁 frontend/               # React Client (Vite SPA)
│   ├── 📁 public/             # Static Assets & Icons
│   ├── 📁 src/
│   │   ├── 📁 assets/         # App Images & Logos
│   │   ├── 📁 components/     # Reusable & Page Components
│   │   │   ├── 📁 Create/     # Post Creation Views
│   │   │   ├── 📁 EditPost/   # Edit Post Views
│   │   │   ├── 📁 HomePage/   # Landing Page & Feed
│   │   │   ├── 📁 Login/      # Authentication Login
│   │   │   ├── 📁 Register/   # User Registration
│   │   │   ├── 📁 Posts/      # Post Cards & Feed List
│   │   │   ├── 📁 ShowPost/   # Detailed View & Comments
│   │   │   ├── Navbar.jsx    # Navigation Bar Component
│   │   │   └── Footer.jsx    # Footer Component
│   │   ├── App.jsx            # Application Routing & State
│   │   ├── App.css            # Component & Page Styles
│   │   ├── index.css          # Design Tokens & Utility Rules
│   │   └── main.jsx           # React Entrypoint
│   ├── index.html             # HTML Shell
│   ├── package.json           # Frontend Dependencies & Scripts
│   ├── vercel.json            # Vercel SPA Rewrite Rules
│   └── vite.config.js         # Vite Configuration
│
├── 📁 backend/                # Express REST API Server
│   ├── 📁 init/               # DB Initialization / Seed Data
│   ├── 📁 middleware/         # Auth & Route Middlewares
│   ├── 📁 models/             # Mongoose Schemas (User, Post, Comment)
│   ├── 📁 routes/             # Express API Endpoints
│   │   ├── auth.js            # User Login/Register Logic
│   │   └── post.js            # Post & Comment CRUD Endpoints
│   ├── 📁 uploads/            # Local Temporary Uploads Directory
│   ├── app.js                 # Express Application Entrypoint
│   ├── cloudConfig.js         # Cloudinary SDK Configuration
│   ├── package.json           # Backend Dependencies & Scripts
│   └── vercel.json            # Vercel Serverless Function Config
│
├── .gitignore                 # Monorepo Git Ignore Rules
├── DEPLOYMENT_GUIDE.md        # Step-by-step GitHub & Vercel Guide
└── README.md                  # Project Overview & Quickstart
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Styling**: Vanilla CSS (CSS3 Tokens & Glassmorphism Aesthetics)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: `jsonwebtoken` & `bcryptjs`
- **File Uploads**: `multer` & `multer-storage-cloudinary`
- **Cloud Storage**: [Cloudinary API](https://cloudinary.com/)

---

## 🚀 Quickstart - Local Development

Follow these steps to set up and run CircleUp on your local development machine:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB installed locally OR a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI.

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/CircleUp.git
cd CircleUp
```

---

### Step 2: Configure & Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` folder:
   ```env
   PORT=8000
   MONGO_URI=mongodb://127.0.0.1:27017/CircleUp
   JWT_SECRET=your_jwt_secret_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the Express backend server:
   ```bash
   node app.js
   ```
   > Server will run at `http://localhost:8000`

---

### Step 3: Configure & Run the Frontend

1. Open a new terminal window and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```text
   http://localhost:5173
   ```

---

## 🔑 Environment Variables Reference

| Variable Name | Required | Description | Example / Default |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | Port number for Express server | `8000` |
| `MONGO_URI` | Yes | MongoDB Connection String | `mongodb://127.0.0.1:27017/CircleUp` or Mongo Atlas URI |
| `JWT_SECRET` | Yes | Secret key for signing authentication tokens | `your_secret_key` |
| `CLOUD_NAME` | Yes | Cloudinary account name | `hskhf....` |
| `CLOUD_API_KEY` | Yes | Cloudinary API Key | `62688.....` |
| `CLOUD_API_SECRET` | Yes | Cloudinary API Secret | `fjsklf...` |

---

## 📡 API Endpoints Summary

### Authentication (`/auth`)
- `POST /auth/register` — Register a new user account.
- `POST /auth/login` — Authenticate user and issue JWT token.

### Posts (`/posts`)
- `GET /posts` — Retrieve all community posts.
- `POST /posts` — Create a new post (supports image upload via `multer`).
- `GET /posts/:id` — Get details of a single post.
- `PUT /posts/:id` — Update an existing post.
- `DELETE /posts/:id` — Delete a post.
- `POST /posts/:id/comments` — Add a comment to a post.

---

## 📘 GitHub & Vercel Deployment Guide

Looking to push this project to GitHub and host both frontend and backend live on Vercel?

👉 Check out the complete step-by-step [DEPLOYMENT_GUIDE.md](file:///d:/CollegeWebD/CircleUp/DEPLOYMENT_GUIDE.md) included in this repository!

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
