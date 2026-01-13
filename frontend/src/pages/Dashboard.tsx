// frontend/src/pages/Dashboard.tsx
import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../context/AuthContext";
import CreateTaskModal from "../components/CreateTaskModal";
import ProfileModal from "../components/ProfileModal"; // <-- Import ProfileModal
import type { Task } from "../types/task";

export default function Dashboard() {
  const { logout } = useAuth();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // <-- Add state for profile modal
  const [kanbanKey, setKanbanKey] = useState(Date.now());

  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created:", newTask);
    // Change the key of the KanbanBoard to force a re-fetch of tasks
    setKanbanKey(Date.now());
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 bg-white border-b shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">My Task Board</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            + New Task
          </button>
          <button
            onClick={() => setProfileModalOpen(true)}
            className="text-gray-600 font-semibold hover:text-black"
          >
            Profile
          </button>
          <button
            onClick={logout}
            className="text-gray-600 font-semibold hover:text-black"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-auto">
        <KanbanBoard key={kanbanKey} />
      </main>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}