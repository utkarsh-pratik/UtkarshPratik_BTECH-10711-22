# Full-Stack Task Management System (Kanban Style)

This is a complete, full-stack task management application similar to Trello or Jira, built as a demonstration of modern web development practices. It features a secure RESTful API backend and a responsive, interactive Kanban board frontend.

![Project Screenshot](https://via.placeholder.com/800x450.png?text=Add+a+Screenshot+of+Your+App+Here)
*(Recommendation: Replace the placeholder above with an actual screenshot of your running application's dashboard.)*

## Features

- **User Authentication:** Secure user registration and login (JWT-based).
- **Kanban Board:** A three-column board (Pending, In Progress, Completed) for managing tasks.
- **Full CRUD for Tasks:** Users can create, read, update, and delete their own tasks.
- **Drag & Drop:** Intuitive drag-and-drop functionality to change a task's status.
- **Responsive Design:** A clean and modern UI that works seamlessly on desktop and mobile devices.
- **Backend Validation:** Robust input validation on the backend to ensure data integrity.

## Tech Stack

This project is built with an industry-standard, hire-ready tech stack.

### Backend

| Tech        | Description                               |
|-------------|-------------------------------------------|
| **Node.js** | JavaScript Runtime Environment            |
| **Express** | Fast, unopinionated web framework for Node.js |
| **TypeScript**| Statically typed superset of JavaScript   |
| **MongoDB**   | NoSQL database for flexible data storage  |
| **Mongoose**  | Elegant MongoDB object modeling for Node.js |
| **JWT**       | Secure token-based authentication       |
| **Zod**       | TypeScript-first schema validation      |
| **bcrypt**    | Library for hashing passwords           |

### Frontend

| Tech              | Description                               |
|-------------------|-------------------------------------------|
| **React**         | JavaScript library for building user interfaces |
| **Vite**          | Next-generation frontend tooling          |
| **TypeScript**    | Statically typed superset of JavaScript   |
| **Tailwind CSS**  | A utility-first CSS framework             |
| **dnd-kit**       | Modern, lightweight drag-and-drop toolkit |
| **Axios**         | Promise-based HTTP client for the browser |

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- A MongoDB database instance (local or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Backend Setup

First, set up and run the backend server.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create the environment file
# Copy the example file to create your own local environment file
cp .env.example .env
```

Next, open the newly created `.env` file and fill in your environment variables:

```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_SUPER_SECRET_JWT_KEY>
```
*You can generate a strong `JWT_SECRET` by running `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` in your terminal.*

Finally, run the backend development server:

```bash
# Run the server (it will auto-restart on changes)
npm run dev
```
The backend server should now be running on `http://localhost:5000`.

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
The frontend application should now be running and accessible at `http://localhost:5173`.

## API Endpoints Overview

All task-related routes are protected and require a valid JWT token.

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| `POST` | `/api/auth/register`    | Register a new user.            |
| `POST` | `/api/auth/login`       | Log in a user and get a token.  |
| `POST` | `/api/tasks`            | Create a new task.              |
| `GET`  | `/api/tasks`            | Get all tasks for the logged-in user. |
| `PUT`  | `/api/tasks/:id`        | Update a specific task.         |
| `DELETE`| `/api/tasks/:id`       | Delete a specific task.         |
