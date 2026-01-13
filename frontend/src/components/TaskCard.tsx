// frontend/src/components/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Pencil, Trash2 } from "lucide-react"; // <-- Import Calendar icon
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card p-4 mb-2 cursor-move group relative border-l-4 border-transparent hover:border-primary transition-colors"
    >
      {/* Main Content */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-neutral-800">{task.title}</p>
        {task.description && (
          <p className="text-sm text-neutral-600">{task.description}</p>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-primary"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
          className="p-1.5 rounded-md text-neutral-500 hover:bg-red-100 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}