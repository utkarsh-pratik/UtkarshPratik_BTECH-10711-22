// frontend/src/pages/Dashboard.tsx
import { useState } from "react";
import { LogOut, PlusCircle, User } from "lucide-react"; // <-- Import icons
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../context/AuthContext";
import CreateTaskModal from "../components/CreateTaskModal";
import ProfileModal from "../components/ProfileModal";
import type { Task } from "../types/task";

export default function Dashboard() {
  const { logout } = useAuth();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [kanbanKey, setKanbanKey] = useState(Date.now());

  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created:", newTask);
    setKanbanKey(Date.now());
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 bg-white border-b border-neutral-200 shadow-sm">
        <h1 className="text-xl font-bold text-neutral-800">My Task Board</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover shadow-sm"
          >
            <PlusCircle size={18} />
            New Task
          </button>
          <button
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-primary"
          >
            <User size={18} />
            Profile
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-primary"
          >
            <LogOut size={18} />
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