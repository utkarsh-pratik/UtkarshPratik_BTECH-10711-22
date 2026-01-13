// frontend/src/components/EditTaskModal.tsx
import { useState, useEffect } from "react";
import { updateTask } from "../api/task.api";
import type { Task } from "../types/task";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onTaskUpdated: (updatedTask: Task) => void;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
  onTaskUpdated,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    try {
      const res = await updateTask(task._id, { title, description, dueDate });
      onTaskUpdated(res.data);
      onClose();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields are the same as CreateTaskModal, but pre-filled */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input className="border p-2 w-full rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea className="border p-2 w-full rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
            <input type="date" className="border p-2 w-full rounded-md" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-600 font-semibold">Cancel</button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md font-semibold">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}