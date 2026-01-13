// frontend/src/components/CreateTaskModal.tsx
import { useState } from "react";
import toast from "react-hot-toast"; // <-- Import toast
import { createTask } from "../api/task.api";
import type { Task } from "../types/task";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (newTask: Task) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required."); // <-- Use error toast
      return;
    }
    try {
      const res = await createTask({ title, description, dueDate });
      toast.success("Task created successfully!"); // <-- Add success toast
      onTaskCreated(res.data);
      onClose();
      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      toast.error("Failed to create task."); // <-- Use error toast
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              className="border p-2 w-full rounded-md"
              placeholder="e.g., Finalize project report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description (Optional)</label>
            <textarea
              className="border p-2 w-full rounded-md"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Due Date (Optional)</label>
            <input
              type="date"
              className="border p-2 w-full rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="text-gray-600 font-semibold">
              Cancel
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md font-semibold">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}