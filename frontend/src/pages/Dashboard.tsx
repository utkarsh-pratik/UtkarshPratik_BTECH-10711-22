// frontend/src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { LogOut, Plus, User as UserIcon } from "lucide-react";
import KanbanBoard from "../components/KanbanBoard";
import { useAuth } from "../context/AuthContext";
import CreateTaskModal from "../components/CreateTaskModal";
import ProfileModal from "../components/ProfileModal";
import type { Task } from "../types/task";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { getProfile } from "../api/user.api"; // <-- Import getProfile
import ThemeToggle from "../components/ui/ThemeToggle"; // <-- Import ThemeToggle

// This is now a real data-fetching hook
const useUser = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Fetch the user's profile when the component mounts
    getProfile()
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile", err);
        // Keep the default name "User" on failure
      });
  }, []); // The empty dependency array ensures this runs only once

  return { name: userName };
};

export default function Dashboard() {
  const { logout } = useAuth();
  const { name } = useUser();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [kanbanKey, setKanbanKey] = useState(Date.now());

  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created:", newTask);
    setKanbanKey(Date.now());
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors">
      {/* Top Navigation Bar */}
      <header className="flex-shrink-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">TaskFlow</h1>
          <div className="flex items-center gap-2 md:gap-4">
            <Button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-2">
              <Plus size={18} />
              New Task
            </Button>
            <div className="flex items-center gap-2">
              <ThemeToggle /> {/* <-- Add the toggle button */}
              <button
                onClick={() => setProfileModalOpen(true)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Profile"
              >
                <UserIcon size={20} className="text-neutral-600 dark:text-neutral-300" />
              </button>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} className="text-neutral-600 dark:text-neutral-300" />
              </button>
              <Avatar name={name} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Welcome back, {name}!
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              Here's your board for today. Let's make progress.
            </p>
          </div>

          {/* Kanban Board */}
          <KanbanBoard key={kanbanKey} />
        </div>
      </main>

      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentName={name} // <-- Pass the current name as a prop
      />
    </div>
  );
}
