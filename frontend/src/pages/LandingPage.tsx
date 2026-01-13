// frontend/src/pages/LandingPage.tsx
import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-4 border-b bg-white">
        <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Login / Sign Up
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Organize Your Work and Life, Finally.
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Become focused, organized, and calm with a simple, Kanban-style task
          manager. The world’s #1 way to manage your tasks.
        </p>
      </main>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}