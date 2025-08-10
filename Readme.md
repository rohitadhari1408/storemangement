
# 🛍 Store Rating Web Application

This is a MERN stack web application where users can browse stores, rate them, and view ratings.
It includes role-based dashboards for:
- **Admin** → Manage users and stores
- **User** → Browse stores and submit ratings
- **Store Owner** → View ratings for their store

---

## 🚀 Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed (v16 or above recommended)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) installed for database import
- [Git](https://git-scm.com/) installed
- A code editor like [VS Code](https://code.visualstudio.com/)

---

## 📥 Clone the Repository

```bash
git https://github.com/rohitadhari1408/storemangement
cd YOUR_REPO
````

---

## 📦 Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 🗄 Database Setup (MongoDB Compass)

1. **Open MongoDB Compass** and connect to your local or cloud MongoDB server.

   * Local: `mongodb://localhost:27017`
   * Cloud (Atlas): Get the connection string from your Atlas cluster.

2. **Create a new database**

   * Name: `store_rating_db` (or your preferred name)
   * You can create an empty collection like `users` to start.

3. **Import the provided database dump**

   * Open the created collection.
   * Click **"Import Data"** (top-right).
   * Choose **`JSON`** file format.
   * Select the file from `database/store_rating_collection.json` (included in repo).
   * Click **Import**.
   * Repeat for other collections (`stores.json`, `ratings.json`, etc.).

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/store_rating_db
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Run the Project

### Backend

```bash
cd backend
npm run dev
```

This starts the backend API on [http://localhost:5000](http://localhost:5000).

### Frontend

```bash
cd frontend
npm run dev
```

This starts the frontend React app (Vite) on [http://localhost:5173](http://localhost:5173).

---

## 🔑 Default Login Credentials

**Admin**

```
email: admin@example.com,
password: adminpass

```

**User**

```
email: john@example.com
password: rohit1234
```

**Store Owner**

```
email: priya.verma@example.com
password:Store@123
```

