// frontend/src/components/Column.tsx
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

export default function Column({
  title,
  tasks,
  onEdit,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg w-full md:w-80 lg:w-96 flex-shrink-0">
      <h2 className="font-bold mb-4 text-lg">{title}</h2>
      <div className="space-y-3">
        <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
