// frontend/src/components/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="bg-white p-3 mb-2 rounded shadow-sm cursor-move group relative">
      <div className="font-semibold mb-1">{task.title}</div>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      {task.dueDate && (
        <p className="text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-blue-500">
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-500">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}