# TaskFlow: Full-Stack Kanban Task Management System

<div align="center">

**A modern, full-stack, and feature-rich task management application built to demonstrate professional web development practices, from a secure backend API to a fluid, animated user interface.**

</div>

<br />

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-brightgreen?style=for-the-badge&logo=vercel)](https://utkarshtaskflow.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

<br />

<div align="center">

![Project Demo](./assets/demo.gif)
*(A short demo showcasing the application's features, including drag-and-drop.)*

</div>

## ✨ Features

This project is a complete end-to-end product, featuring:

-   **Modern Authentication:** Seamless, modal-based user **Sign Up** and **Login** flow with secure, JWT-based authentication.
-   **Full User Management:** Users can **update their profile** information and securely **delete their account**, which also removes all associated data.
-   **Complete Task CRUD:** Full Create, Read, Update, and Delete functionality for tasks, managed through an intuitive UI.
-   **Interactive Kanban Board:** A three-column board ("Pending," "In Progress," "Completed") with fluid **drag-and-drop** for both reordering tasks and changing their status.
-   **Professional UI/UX:**
    -   **Fluid Animations:** Smooth, staggered animations on load and graceful transitions for all modals, built with `framer-motion`.
    -   **Toast Notifications:** Non-intrusive, real-time feedback for all user actions (e.g., "Task created," "Profile updated").
    -   **Skeleton Loaders:** An elegant loading state that improves perceived performance while data is being fetched.
    -   **Empty States:** Helpful placeholders for empty columns, enhancing the user experience.
-   **Robust Backend:** A secure RESTful API with input validation (using Zod), centralized error handling, and user-specific data protection.
-   **Fully Responsive Design:** A mobile-first approach ensures a seamless experience on any device, from desktop to smartphone.

## 🛠️ Tech Stack

This project leverages a modern, industry-standard tech stack chosen to build a scalable and maintainable application.

### Backend

| Tech         | Description                                   |
|--------------|-----------------------------------------------|
| **Node.js**  | JavaScript Runtime Environment                |
| **Express**  | Web framework for building the RESTful API    |
| **TypeScript** | Statically typed language for robust code     |
| **MongoDB**    | NoSQL database for flexible data storage      |
| **Mongoose**   | Object Data Modeling (ODM) for MongoDB        |
| **JWT**        | Secure, token-based user authentication       |
| **Zod**        | TypeScript-first schema validation          |
| **bcrypt**     | Library for securely hashing passwords        |

### Frontend

| Tech               | Description                                       |
|--------------------|---------------------------------------------------|
| **React**          | Library for building dynamic user interfaces      |
| **Vite**           | Next-generation frontend build tool               |
| **TypeScript**     | Statically typed language for component safety    |
| **Tailwind CSS**   | Utility-first CSS framework for rapid UI development |
| **Framer Motion**  | Production-ready library for fluid animations     |
| **dnd-kit**        | Modern, lightweight drag-and-drop toolkit         |
| **Axios**          | Promise-based HTTP client for API communication   |
| **React Hot Toast**| Library for elegant, non-intrusive notifications  |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm (or a compatible package manager)
-   A MongoDB database instance (you can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Backend Setup

First, set up and run the backend server.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create the environment file by copying the example
cp .env.example .env
```

Next, open the newly created `.env` file and fill in your environment variables. The `MONGO_URI` must be your actual database connection string.

```env
PORT=5000
MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key-goes-here"
```

Finally, run the backend development server:

```bash
# Run the server (it will auto-restart on changes)
npm run dev
```

The backend API will be running on `http://localhost:5000`.

### 2. Frontend Setup

In a **new terminal window**, set up and run the frontend application.

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Run the frontend development server
npm run dev
```

The frontend application will be running and accessible at `http://localhost:5173`.

## 📝 API Endpoints Overview

All routes under `/api/users` and `/api/tasks` are protected and require a valid JWT `Bearer` token in the `Authorization` header.

| Method   | Endpoint             | Description                                      |
|----------|----------------------|--------------------------------------------------|
| `POST`   | `/api/auth/register` | Register a new user.                             |
| `POST`   | `/api/auth/login`    | Log in a user and receive a JWT token.           |
| `GET`    | `/api/users/me`      | Get the current user's profile information.      |
| `PUT`    | `/api/users/me`      | Update the current user's name.                  |
| `DELETE` | `/api/users/me`      | Delete the current user and all their data.      |
| `POST`   | `/api/tasks`         | Create a new task.                               |
| `GET`    | `/api/tasks`         | Get all tasks for the logged-in user.            |
| `PUT`    | `/api/tasks/:id`     | Update a specific task (title, status, etc.).    |
| `DELETE` | `/api/tasks/:id`     | Delete a specific task.                          |
