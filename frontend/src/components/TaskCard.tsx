// frontend/src/components/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { calculateTaskStatus } from "../utils/dueDateUtils";
import type { TaskStatus } from "../utils/dueDateUtils"; // <-- Explicitly import the type
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
    transition: transition || "transform 250ms ease",
  };

  // Calculate the task status
  const taskStatus: TaskStatus = calculateTaskStatus(task.dueDate || "");

  // Define badge styles based on the task status
  const statusStyles: Record<TaskStatus, string> = {
    "on-track": "bg-green-100 text-green-600",
    "due-soon": "bg-yellow-100 text-yellow-600",
    "overdue": "bg-red-100 text-red-600",
  };

  const statusText: Record<TaskStatus, string> = {
    "on-track": "On Track",
    "due-soon": "Due Soon",
    "overdue": "Overdue",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card p-4 cursor-grab group relative border-l-4 border-transparent hover:border-primary-500 hover:shadow-lg transition-all duration-300"
    >
      {/* Main Content */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-neutral-800 dark:text-neutral-100">{task.title}</p>
          {/* Status Badge */}
          {task.dueDate && (
            <span
              className={`px-2 py-1 text-xs font-bold rounded-full ${statusStyles[taskStatus]}`}
            >
              {statusText[taskStatus]}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{task.description}</p>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary-500"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}