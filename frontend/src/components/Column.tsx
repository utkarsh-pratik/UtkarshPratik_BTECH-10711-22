// frontend/src/components/Column.tsx
import { motion, AnimatePresence } from "framer-motion";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Inbox } from "lucide-react";
import TaskCard from "./TaskCard";
import Badge from "./ui/Badge"; // <-- Import Badge
import type { Task } from "../types/task";

// Define animation variants for each task card
const taskCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
    <div className="bg-white/50 backdrop-blur-sm p-1 rounded-xl w-full flex-shrink-0 h-full">
      <div className="flex items-center justify-between p-3">
        <h2 className="font-semibold text-lg text-neutral-700">{title}</h2>
        <Badge>{tasks.length}</Badge>
      </div>
      <div className="space-y-2 h-full p-1">
        <AnimatePresence>
          {tasks.length > 0 ? (
            <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <motion.div key={task._id} variants={taskCardVariants}>
                  <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                </motion.div>
              ))}
            </SortableContext>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center h-full text-neutral-400"
            >
              <Inbox size={32} className="text-neutral-400" />
              <p className="mt-2 text-sm font-medium text-neutral-500">No tasks</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
